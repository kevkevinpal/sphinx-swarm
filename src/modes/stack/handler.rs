use crate::cmd::{Cmd, RelayCmd, SwarmCmd};
use crate::config::{Stack, STACK};
use anyhow::Result;
use bollard::Docker;

// tag is the service name
pub async fn handle(cmd: Cmd, tag: &str, docker: &Docker) -> Result<String> {
    // conf can be mutated in place
    let mut stack = STACK.lock().await;
    // println!("CONF {:?}", conf);

    let ret: Option<String> = match cmd {
        Cmd::Swarm(c) => match c {
            SwarmCmd::GetConfig => Some(serde_json::to_string(&*stack)?),
            SwarmCmd::AddNode(node) => {
                // add a node via docker
                None
            }
        },
        Cmd::Relay(c) => match c {
            RelayCmd::AddUser => {
                // hit new relay add user in proxy route
                None
            }
            RelayCmd::ListUsers => None,
        },
    };
    match ret {
        Some(r) => Ok(r),
        None => Err(anyhow::anyhow!("no return value".to_string())),
    }
}
