use notify_rust::Notification;

#[cfg(target_os = "linux")]
pub mod pc {
    use std::process::Command;

    pub fn sleep() -> Result<(), String> {
        let result = Command::new("systemctl")
            .arg("suspend")
            .output()
            .expect("Failed to execute command");
        if result.status.success() {
            Ok(())
        } else {
            Err("Failed to sleep".to_string())
        }
    }
}

#[cfg(target_os = "windows")]
pub mod pc {
    extern crate winapi;
    use winapi::um::winbase::SetSystemPowerState;

    pub fn sleep() -> Result<(), String> {
        unsafe {
            if SetSystemPowerState(1, 0) == 0 {
                return Err("Failed to set system power state".to_string());
            } else {
                return Ok(());
            }
        }
    }
}

pub fn send_notification(title: &str, body: &str) -> bool {
    let n = Notification::new().summary(title).body(body).show();
    n.is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[ignore]
    fn test_sleep() {
        assert!(pc::sleep().is_ok());
    }

    #[test]
    fn test_send_notification() {
        assert!(send_notification("title", "body"));
    }
}
