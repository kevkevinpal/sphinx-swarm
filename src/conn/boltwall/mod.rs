use crate::images::boltwall::BoltwallImage;
use crate::utils::docker_domain;
use anyhow::{anyhow, Context, Result};
use serde::{Deserialize, Serialize};
use std::time::Duration;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SetAdminPubkeyBody {
    pub pubkey: String,
}

pub async fn add_admin_pubkey(img: &BoltwallImage, pubkey: &str) -> Result<()> {
    let admin_token = img.admin_token.clone().context(anyhow!("No admin token"))?;

    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(20))
        .danger_accept_invalid_certs(true)
        .build()
        .expect("couldnt build boltwall reqwest client");
    let host = docker_domain(&img.name);

    let route = format!("http://{}/set_admin_pubkey", host);

    let body = SetAdminPubkeyBody {
        pubkey: pubkey.to_string(),
    };
    client
        .post(route.as_str())
        .header("x-admin-token", admin_token)
        .json(&body)
        .send()
        .await?;

    Ok(())
}