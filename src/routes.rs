use crate::auth;
use crate::logs::{get_log_tx, LogChans, LOGS};
use crate::rocket_utils::{Error, Result, *};
use response::stream::{Event, EventStream};
use rocket::serde::{
    json::{json, Json},
    Deserialize, Serialize,
};
use rocket::*;
use std::sync::Arc;
use tokio::sync::{broadcast::error::RecvError, mpsc, Mutex};

#[get("/cmd?<tag>&<txt>")]
pub async fn cmd(sender: &State<mpsc::Sender<CmdRequest>>, tag: &str, txt: &str) -> Result<String> {
    let (request, reply_rx) = CmdRequest::new(tag, txt);
    let _ = sender.send(request).await.map_err(|_| Error::Fail)?;
    let reply = reply_rx.await.map_err(|_| Error::Fail)?;
    Ok(reply)
}

#[get("/logs?<tag>")]
pub async fn logs(tag: &str) -> Result<String> {
    let lgs = LOGS.lock().await;
    let ret = lgs.get(tag).unwrap_or(&Vec::new()).clone();
    Ok(json!(ret).to_string())
}

#[get("/logstream?<tag>")]
pub async fn logstream(
    log_txs: &State<Arc<Mutex<LogChans>>>,
    mut end: Shutdown,
    tag: &str,
) -> EventStream![] {
    let log_tx = get_log_tx(tag, log_txs).await;
    let mut rx = log_tx.subscribe();
    EventStream! {
        loop {
            let msg = tokio::select! {
                msg = rx.recv() => match msg {
                    Ok(lo) => lo,
                    Err(RecvError::Closed) => break,
                    Err(RecvError::Lagged(_)) => continue,
                },
                _ = &mut end => break,
            };

            yield Event::json(&msg);
        }
    }
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct LoginData {
    pub username: String,
    pub password: String,
}
#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct LoginResult {
    pub token: String,
}

#[rocket::post("/login", data = "<body>")]
pub async fn login(body: Json<LoginData>) -> Result<Json<LoginResult>> {
    let pass_hash = "";
    let valid = bcrypt::verify(&body.password, pass_hash)?;
    if !valid {
        return Err(Error::Unauthorized);
    }
    Ok(Json(LoginResult {
        token: auth::make_jwt(1)?,
    }))
}

#[rocket::get("/refresh_jwt")]
pub async fn refresh_jwt(claims: auth::AdminJwtClaims) -> Result<Json<LoginResult>> {
    Ok(Json(LoginResult {
        token: auth::make_jwt(claims.user)?,
    }))
}
