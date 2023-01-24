use anyhow::{anyhow, Result};
use rocket::tokio;
use serde::{Deserialize, Serialize};
use std::time::Duration;

use crate::images::relay::RelayImage;

pub struct RelayAPI {
    pub client: reqwest::Client,
    pub url: String,
    pub token: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RelayRes<T> {
    pub success: bool,
    pub response: T,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Users {
    pub users: Vec<User>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
    pub alias: String,
    pub public_key: String,
    pub route_hint: String,
    pub photo_url: String,
    pub contact_key: String,
    pub person_uuid: Option<String>,
    pub is_admin: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ClaimBody {
    pub pubkey: String,
    pub token: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ClaimRes {
    pub id: u32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Chat {
    id: u16,
    uuid: String,
    name: String,
    photo_url: String,
    r#type: u16,
    group_key: String,
    host: String,
    price_to_join: u64,
    price_per_message: u64,
    escrow_amount: u64,
    escrow_millis: u64,
    private: bool,
    app_url: String,
    feed_url: String,
    tenant: u16,
    pin: String,
    default_join: bool,
}
pub type ChatsRes = Vec<Chat>;

impl RelayAPI {
    pub async fn new(relay: &RelayImage, token: &str, check_is_setup: bool) -> Result<Self> {
        let client = reqwest::Client::builder()
            .timeout(Duration::from_secs(20))
            .danger_accept_invalid_certs(true)
            .build()
            .expect("couldnt build proxy reqwest client");
        let api = Self {
            url: format!("localhost:{}", relay.port),
            client,
            token: token.to_string(),
        };
        if !check_is_setup {
            return Ok(api);
        }
        for i in 0..15 {
            if let Ok(_) = api.is_setup().await {
                return Ok(api);
            }
            log::info!("checking for relay setup... {}", i);
            sleep_ms(2000).await;
        }
        Err(anyhow::anyhow!("relay api could not set up!"))
    }

    pub async fn is_setup(&self) -> Result<RelayRes<bool>> {
        let route = format!("http://{}/is_setup", self.url);
        let res = self.client.get(route.as_str()).send().await?;
        Ok(res.json().await?)
    }

    pub async fn try_has_admin(&self) -> Result<RelayRes<bool>> {
        let mut err = anyhow!("try_has_admin never started");
        for _ in 0..60 {
            match self.has_admin().await {
                Ok(b) => return Ok(b),
                Err(e) => err = e,
            }
            sleep_ms(500).await;
        }
        Err(anyhow!(format!("try_has_admin ERROR: {}", err)))
    }

    pub async fn has_admin(&self) -> Result<RelayRes<bool>> {
        let route = format!("http://{}/has_admin", self.url);
        let res = self.client.get(route.as_str()).send().await?;
        Ok(res.json().await?)
    }

    pub async fn initial_admin_pubkey(&self) -> Result<String> {
        #[derive(Deserialize)]
        struct InitialPubkeyResult {
            pubkey: String,
        }
        let route = format!("http://{}/initial_admin_pubkey", self.url);
        let res = self.client.get(route.as_str()).send().await?;
        let ipr: RelayRes<InitialPubkeyResult> = res.json().await?;
        Ok(ipr.response.pubkey)
    }

    pub async fn claim_user(&self, pubkey: &str, token: &str) -> Result<RelayRes<ClaimRes>> {
        let route = format!("http://{}/contacts/tokens", self.url);
        let body = ClaimBody {
            pubkey: pubkey.to_string(),
            token: token.to_string(),
        };
        let res = self.client.post(route.as_str()).json(&body).send().await?;
        Ok(res.json().await?)
    }

    pub async fn add_default_tribe(&self, id: u16) -> Result<RelayRes<bool>> {
        let route = format!("http://{}/default_tribe/{}", self.url, id);
        let res = self
            .client
            .post(route.as_str())
            .header("x-admin-token", self.token.clone())
            .send()
            .await?;
        Ok(res.json().await?)
    }

    pub async fn remove_default_tribe(&self, id: u16) -> Result<RelayRes<bool>> {
        let route = format!("http://{}/default_tribe/{}", self.url, id);
        let res = self
            .client
            .delete(route.as_str())
            .header("x-admin-token", self.token.clone())
            .send()
            .await?;
        Ok(res.json().await?)
    }

    pub async fn add_user(&self, initial_sats: Option<u64>) -> Result<RelayRes<User>> {
        let mut sats = "".to_string();
        if let Some(s) = initial_sats {
            sats = format!("?sats={}", s);
        }
        let route = format!("http://{}/add_user{}", self.url, sats);
        let res = self
            .client
            .get(route.as_str())
            .header("x-admin-token", self.token.clone())
            .send()
            .await?;
        Ok(res.json().await?)
    }

    pub async fn list_users(&self) -> Result<RelayRes<Users>> {
        let route = format!("http://{}/list_users", self.url);
        let res = self
            .client
            .get(route.as_str())
            .header("x-admin-token", self.token.clone())
            .send()
            .await?;
        Ok(res.json().await?)
    }

    pub async fn get_chats(&self) -> Result<RelayRes<ChatsRes>> {
        let route = format!("http://{}/chats", self.url);
        let res = self
            .client
            .get(route.as_str())
            .header("x-admin-token", self.token.clone())
            .send()
            .await?;
        Ok(res.json().await?)
    }
}

pub async fn sleep_ms(n: u64) {
    tokio::time::sleep(std::time::Duration::from_millis(n)).await;
}
