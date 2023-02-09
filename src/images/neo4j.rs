use super::*;
use crate::utils::{domain, exposed_ports, host_config};
use bollard::container::Config;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq)]
pub struct Neo4jImage {
    pub name: String,
    pub version: String,
    pub port: String,
    pub port2: String,
    pub links: Links,
}

impl Neo4jImage {
    pub fn new(name: &str, version: &str, port: &str, port2: &str) -> Self {
        Self {
            name: name.to_string(),
            version: version.to_string(),
            port: port.to_string(),
            port2: port2.to_string(),
            links: vec![],
        }
    }
    pub fn links(&mut self, links: Vec<&str>) {
        self.links = strarr(links)
    }
}

impl DockerHubImage for Neo4jImage {
    fn repo(&self) -> Repository {
        Repository {
            org: "bitnami".to_string(),
            repo: "neo4j".to_string(),
        }
    }
}

pub fn neo4j(node: &Neo4jImage) -> Config<String> {
    let name = node.name.clone();
    let repo = node.repo();
    let img = format!("{}/{}", repo.org, repo.repo);
    let root_vol = "/neo4j/data:/data";
    let extra_vols = vec![
        "/neo4j/logs:/logs".to_string(),
        "/neo4j/plugins:/plugins".to_string(),
        "/neo4j/tmp/import:/var/lib/neo4j/import".to_string(),
    ];
    let ports = vec![node.port.clone(), node.port2.clone()];
    Config {
        image: Some(format!("{}:{}", img, node.version)),
        hostname: Some(domain(&name)),
        exposed_ports: exposed_ports(ports.clone()),
        host_config: host_config(&name, ports, root_vol, Some(extra_vols)),
        env: Some(vec![
            format!("NEO4J_AUTH=neo4j/test"),
            format!("NEO4J_apoc_export_file_enabled=true"),
            format!("NEO4J_apoc_import_file_enabled=true"),
            format!("NEO4J_dbms_security_procedures_unrestricted=apoc.*,algo.*"),
            format!("NEO4J_dbms_memory_heap_initial__size=512m"),
            format!("NEO4J_dbms_memory_heap_max__size=2G"),
            format!("NEO4J_apoc_uuid_enabled=true"),
            format!("NEO4J_dbms_default__listen__address=0.0.0.0"),
            format!(
                "NEO4J_dbms_connector_bolt_listen__address=0.0.0.0:{}",
                node.port2.clone()
            ),
            format!("NEO4J_dbms_allow__upgrade=true"),
            format!("NEO4J_dbms_default__database=neo4j"),
        ]),
        ..Default::default()
    }
}
