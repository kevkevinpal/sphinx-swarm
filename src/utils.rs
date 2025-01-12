use bollard::container::NetworkingConfig;
use bollard::network::CreateNetworkOptions;
use bollard_stubs::models::{HostConfig, Ipam, IpamConfig, PortBinding, PortMap};
use std::collections::HashMap;

pub fn host_config(
    project: &str,
    name: &str,
    ports: Vec<&str>,
    vols: Vec<&str>,
    extra_vols: Option<Vec<String>>,
    links: Option<Vec<&str>>,
) -> Option<HostConfig> {
    let mut dvols = default_volumes(project, name, vols);
    if let Some(evs) = extra_vols {
        dvols.extend(evs);
    }
    let mut c = HostConfig {
        binds: Some(dvols),
        port_bindings: host_port(ports),
        extra_hosts: Some(vec!["host.docker.internal:host-gateway".to_string()]),
        ..Default::default()
    };
    if let Some(ls) = links {
        c.links = Some(ls.iter().map(|l| l.to_string()).collect());
    }
    Some(c)
}

pub fn exposed_ports(ports: Vec<&str>) -> Option<HashMap<String, HashMap<(), ()>>> {
    let mut ps = HashMap::new();
    for port in ports {
        ps.insert(tcp_port(port), HashMap::new());
    }
    Some(ps)
}

fn tcp_port(p: &str) -> String {
    format!("{}/tcp", p).to_string()
}

pub fn expose(ports: Vec<&str>) -> Option<HashMap<String, HashMap<(), ()>>> {
    let mut h = HashMap::new();
    for p in ports {
        h.insert(tcp_port(p), HashMap::<(), ()>::new());
    }
    Some(h)
}

// DIR/vol/{project}/{container_name}:{dir}
pub fn default_volumes(project: &str, name: &str, dirs: Vec<&str>) -> Vec<String> {
    let pwd = std::env::current_dir().unwrap_or_default();
    let mut fulls: Vec<String> = Vec::new();
    for i in dirs {
        let path = format!("{}/vol/{}/{}:{}", pwd.to_string_lossy(), project, name, i);
        fulls.push(path);
    }
    fulls
}

pub fn files_volume() -> String {
    let pwd = std::env::current_dir().unwrap_or_default();
    format!("{}/files:/files", pwd.to_string_lossy())
}

fn host_port(ports_in: Vec<&str>) -> Option<PortMap> {
    let mut ports = PortMap::new();
    for port in ports_in {
        ports.insert(
            tcp_port(port),
            Some(vec![PortBinding {
                host_port: Some(port.to_string()),
                host_ip: Some("0.0.0.0".to_string()),
                // host_ip: None,
            }]),
        );
    }
    Some(ports)
}

pub fn _custom_network() -> CreateNetworkOptions<String> {
    CreateNetworkOptions {
        name: _NET.to_string(),
        driver: "default".to_string(),
        attachable: true,
        ipam: Ipam {
            driver: Some("default".to_string()),
            config: Some(vec![IpamConfig {
                subnet: Some("172.18.0.0/16".to_string()),
                gateway: Some("172.18.0.1".to_string()),
                ip_range: Some("172.18.5.0/24".to_string()),
                ..Default::default()
            }]),
            ..Default::default()
        },
        ..Default::default()
    }
}

pub const _NET: &str = "network1";

pub fn _net_config() -> Option<NetworkingConfig<String>> {
    let mut endpoints_config = HashMap::new();
    endpoints_config.insert(_NET.to_string(), Default::default());
    Some(NetworkingConfig { endpoints_config })
}
