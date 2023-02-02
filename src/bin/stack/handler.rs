use std::collections::HashMap;

use anyhow::{Context, Result};
use bollard::Docker;
use serde::{Deserialize, Serialize};
use sphinx_swarm::auth;
use sphinx_swarm::cmd::*;
use sphinx_swarm::config::{put_config_file, Node, Stack, STATE};
use sphinx_swarm::dock::container_logs;
use sphinx_swarm::images::{DockerHubImage, Image};
use sphinx_swarm::secrets;

// tag is the service name
pub async fn handle(proj: &str, cmd: Cmd, tag: &str, docker: &Docker) -> Result<String> {
    // conf can be mutated in place
    let mut state = STATE.lock().await;
    // println!("STACK {:?}", stack);

    let mut must_save_stack = false;

    let ret: Option<String> = match cmd {
        Cmd::Swarm(c) => match c {
            SwarmCmd::GetConfig => {
                let res = remove_tokens(&state.stack);
                Some(serde_json::to_string(&res)?)
            }
            SwarmCmd::AddNode(_node) => {
                // add a node via docker
                None
            }
            SwarmCmd::GetContainerLogs(container_name) => {
                let logs = container_logs(docker, &container_name).await;
                Some(serde_json::to_string(&logs)?)
            }
            SwarmCmd::ListVersions(req) => {
                #[derive(Serialize, Deserialize, Debug, Clone)]
                struct ListVersionsResult {
                    org: String,
                    repo: String,
                    images: String,
                }
                let img = &state
                    .stack
                    .nodes
                    .iter()
                    .find(|n| n.name() == req.name)
                    .context(format!("cant find node {}", &req.name))?
                    .as_internal()?
                    .repo();
                let url = format!(
                    "https://hub.docker.com/v2/namespaces/{}/repositories/{}/tags?page={}",
                    img.org, img.repo, req.page
                );
                let body = reqwest::get(url).await?.text().await?;
                Some(serde_json::to_string(&ListVersionsResult {
                    org: img.org.clone(),
                    repo: img.repo.clone(),
                    images: body,
                })?)
            }
            SwarmCmd::Login(ld) => {
                match state.stack.users.iter().find(|u| u.username == ld.username) {
                    Some(user) => {
                        if !bcrypt::verify(&ld.password, &user.pass_hash)? {
                            Some("".to_string())
                        } else {
                            let mut hm = HashMap::new();
                            hm.insert("token", auth::make_jwt(user.id)?);
                            Some(serde_json::to_string(&hm)?)
                        }
                    }
                    None => Some("".to_string()),
                }
            }
            SwarmCmd::ChangePassword(cp) => {
                match state.stack.users.iter().position(|u| u.id == cp.user_id) {
                    Some(ui) => {
                        state.stack.users[ui].pass_hash =
                            bcrypt::hash(cp.password, bcrypt::DEFAULT_COST)?;
                        must_save_stack = true;
                        let mut hm = HashMap::new();
                        hm.insert("success", true);
                        Some(serde_json::to_string(&hm)?)
                    }
                    None => Some("".to_string()),
                }
            }
        },
        Cmd::Relay(c) => {
            let client = state.clients.relay.get(tag).context("no relay client")?;
            match c {
                RelayCmd::AddUser(u) => {
                    let res = client.add_user(u.initial_sats).await?;
                    Some(serde_json::to_string(&res.response)?)
                }
                RelayCmd::ListUsers => {
                    let res = client.list_users().await?;
                    Some(serde_json::to_string(&res.response)?)
                }
                RelayCmd::GetChats => {
                    let res = client.get_chats().await?;
                    Some(serde_json::to_string(&res.response)?)
                }
                RelayCmd::AddDefaultTribe(t) => {
                    let res = client.add_default_tribe(t.id).await?;
                    Some(serde_json::to_string(&res.response)?)
                }
                RelayCmd::RemoveDefaultTribe(t) => {
                    let res = client.remove_default_tribe(t.id).await?;
                    Some(serde_json::to_string(&res.response)?)
                }
                RelayCmd::CreateTribe(t) => {
                    let res = client.create_tribe(&t.name).await?;
                    Some(serde_json::to_string(&res.response)?)
                }
                RelayCmd::GetToken => {
                    let secs = secrets::load_secrets(proj).await;
                    let token = secs.get(tag).context("no relay token")?;
                    let mut hm = HashMap::new();
                    hm.insert("token", base64::encode(token));
                    Some(serde_json::to_string(&hm)?)
                }
            }
        }
        Cmd::Bitcoind(c) => {
            let client = state
                .clients
                .bitcoind
                .get(tag)
                .context("no bitcoind client")?;
            match c {
                BitcoindCmd::GetInfo => {
                    let info = client.get_info()?;
                    Some(serde_json::to_string(&info)?)
                }
                BitcoindCmd::TestMine(tm) => {
                    let res = client.test_mine(tm.blocks, tm.address)?;
                    Some(serde_json::to_string(&res)?)
                }
                BitcoindCmd::GetBalance => {
                    let res = client.get_wallet_balance()?;
                    Some(serde_json::to_string(&res)?)
                }
            }
        }
        Cmd::Lnd(c) => {
            let client = state.clients.lnd.get_mut(tag).context("no lnd client")?;
            match c {
                LndCmd::GetInfo => {
                    let info = client.get_info().await?;
                    Some(serde_json::to_string(&info)?)
                }
                LndCmd::ListChannels => {
                    let channel_list = client.list_channels().await?;
                    Some(serde_json::to_string(&channel_list.channels)?)
                }
                LndCmd::AddPeer(peer) => {
                    let result = client.add_peer(peer).await?;
                    Some(serde_json::to_string(&result)?)
                }
                LndCmd::ListPeers => {
                    let result = client.list_peers().await?;
                    Some(serde_json::to_string(&result)?)
                }
                LndCmd::AddChannel(channel) => {
                    let channel = client.create_channel(channel).await?;
                    Some(serde_json::to_string(&channel)?)
                }
                LndCmd::NewAddress => {
                    let address = client.new_address().await?;
                    Some(serde_json::to_string(&address.address)?)
                }
                LndCmd::GetBalance => {
                    let bal = client.get_balance().await?;
                    Some(serde_json::to_string(&bal.confirmed_balance)?)
                }
                LndCmd::AddInvoice(invoice) => {
                    let invoice = client.add_invoice(invoice).await?;
                    Some(serde_json::to_string(&invoice)?)
                }
                LndCmd::PayInvoice(invoice) => {
                    let invoice = client.pay_invoice(invoice).await?;
                    Some(serde_json::to_string(&invoice)?)
                }
                LndCmd::PayKeysend(keysend) => {
                    let invoice = client.pay_keysend(keysend).await?;
                    Some(serde_json::to_string(&invoice)?)
                }
            }
        }
        Cmd::Proxy(c) => {
            let client = state.clients.proxy.get(tag).context("no proxy client")?;
            match c {
                ProxyCmd::GetBalance => {
                    let balance = client.get_balance().await?;
                    Some(serde_json::to_string(&balance)?)
                }
            }
        }
    };

    if must_save_stack {
        put_config_file(proj, &state.stack).await;
    }
    Ok(ret.context("internal error")?)
}

// remove sensitive data from Stack when sending over wire
fn remove_tokens(s: &Stack) -> Stack {
    let nodes = s.nodes.iter().map(|n| match n {
        Node::External(e) => Node::External(e.clone()),
        Node::Internal(i) => match i.clone() {
            Image::Btc(mut b) => {
                b.pass = "".to_string();
                Node::Internal(Image::Btc(b))
            }
            Image::Lnd(mut l) => {
                l.unlock_password = "".to_string();
                Node::Internal(Image::Lnd(l))
            }
            Image::Proxy(mut p) => {
                p.store_key = None;
                p.admin_token = None;
                Node::Internal(Image::Proxy(p))
            }
            Image::Relay(r) => Node::Internal(Image::Relay(r)),
            Image::Cache(c) => Node::Internal(Image::Cache(c)),
            Image::Traefik(t) => Node::Internal(Image::Traefik(t)),
        },
    });
    Stack {
        network: s.network.clone(),
        nodes: nodes.collect(),
        host: s.host.clone(),
        users: vec![],
    }
}
