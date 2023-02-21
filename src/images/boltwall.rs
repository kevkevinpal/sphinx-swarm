use super::traefik::traefik_labels;
use super::*;
use crate::config::Node;
use crate::conn::lnd::utils::{dl_cert, dl_macaroon, strip_pem_prefix_suffix};
use crate::images::lnd::to_lnd_network;
use crate::secrets;
use crate::utils::{domain, exposed_ports, host_config};
use anyhow::{Context, Result};
use async_trait::async_trait;
use bollard::container::Config;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq)]
pub struct BoltwallImage {
    pub name: String,
    pub version: String,
    pub port: String,
    pub host: Option<String>,
    pub session_secret: String,
    pub links: Links,
}

impl BoltwallImage {
    pub fn new(name: &str, version: &str, port: &str) -> Self {
        Self {
            name: name.to_string(),
            version: version.to_string(),
            port: port.to_string(),
            host: None,
            session_secret: secrets::random_word(32),
            links: vec![],
        }
    }
    pub fn links(&mut self, links: Vec<&str>) {
        self.links = strarr(links)
    }
    pub fn host(&mut self, eh: Option<String>) {
        if let Some(h) = eh {
            self.host = Some(format!("boltwall.{}", h));
        }
    }
}

#[async_trait]
impl DockerConfig for BoltwallImage {
    async fn make_config(&self, nodes: &Vec<Node>, docker: &Docker) -> Result<Config<String>> {
        let lnd_node = nodes
            .iter()
            .find(|n| n.name() == "lnd")
            .context("No LND")?
            .as_internal()?
            .as_lnd()?;

        let cert_path = "/home/.lnd/tls.cert";
        let cert_full = dl_cert(docker, &lnd_node.name, cert_path).await?;
        let cert64 = strip_pem_prefix_suffix(&cert_full);
        let netwk = to_lnd_network(lnd_node.network.as_str());
        let macpath = format!("/home/.lnd/data/chain/bitcoin/{}/admin.macaroon", netwk);
        let mac = dl_macaroon(docker, &lnd_node.name, &macpath).await?;

        let jarvis_node = nodes
            .iter()
            .find(|n| n.name() == "jarvis")
            .context("No Jarvis")?
            .as_internal()?
            .as_jarvis()?;

        Ok(boltwall(&self, &mac, &cert64, &lnd_node, &jarvis_node))
    }
}

impl DockerHubImage for BoltwallImage {
    fn repo(&self) -> Repository {
        Repository {
            org: "sphinxlightning".to_string(),
            repo: "sphinx-boltwall".to_string(),
        }
    }
}

pub fn boltwall(
    node: &BoltwallImage,
    macaroon: &str,
    cert: &str,
    lnd_node: &lnd::LndImage,
    jarvis: &jarvis::JarvisImage,
) -> Config<String> {
    let name = node.name.clone();
    let repo = node.repo();
    let img = format!("{}/{}", repo.org, repo.repo);
    let ports = vec![node.port.clone()];
    let root_vol = "/boltwall";

    let lnd_socket = format!("{}:{}", lnd_node.name, lnd_node.rpc_port);
    let mut env = vec![
        format!("PORT={}", node.port),
        format!("LND_TLS_CERT={}", cert),
        format!("LND_MACAROON={}", macaroon),
        format!("LND_SOCKET={}", lnd_socket),
        format!("BOLTWALL_MIN_AMOUNT=2"),
        format!("LIQUID_SERVER=https://liquid.sphinx.chat/"),
        format!(
            "JARVIS_BACKEND_URL=http://{}.sphinx:{}",
            jarvis.name, jarvis.port
        ),
        format!("SESSION_SECRET={}", node.session_secret),
    ];
    // the webhook url "callback"
    if let Some(h) = &node.host {
        env.push(format!("HOST_URL=https://{}", h));
    }
    let mut c = Config {
        image: Some(format!("{}:{}", img, node.version)),
        hostname: Some(domain(&name)),
        exposed_ports: exposed_ports(ports.clone()),
        host_config: host_config(&name, ports, root_vol, None),
        env: Some(env),
        ..Default::default()
    };
    if let Some(host) = node.host.clone() {
        // production tls extra domain
        c.labels = Some(traefik_labels(&node.name, &host, &node.port, false));
    }
    c
}
