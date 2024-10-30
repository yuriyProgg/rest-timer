use serde::{Deserialize, Serialize};
use serde_json;
use std::env;
use std::fs;
use std::io::Write;
use std::path::PathBuf;

fn get_base_dir() -> Result<PathBuf, std::io::Error> {
    // Получаем текущий рабочий каталог
    let current_dir = env::current_dir();

    // Получаем родительский каталог
    if let Ok(dir) = current_dir {
        Ok(dir.to_path_buf())
    } else {
        Err(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "No parent directory",
        ))
    }
}

#[derive(Serialize, Deserialize)]
pub struct Timer {
    pub hours: u8,
    pub minutes: u8,
    pub seconds: u8,
    pub session: u8,
}

fn setup_assets() -> Result<(), String> {
    let base_dir = get_base_dir().unwrap();
    let assets_dir = base_dir.join("assets");
    if !assets_dir.exists() {
        fs::create_dir(assets_dir).unwrap();
    }
    Ok(())
}

fn setup() -> Result<(), String> {
    setup_assets()?;
    let base_dir = get_base_dir().unwrap();
    let file_path = base_dir.join("assets/settings.json");

    if !file_path.exists() {
        let mut file = fs::File::create(file_path).unwrap();
        let json = serde_json::to_string(&Timer {
            hours: 0,
            minutes: 0,
            seconds: 0,
            session: 0,
        });
        file.write_all(json.unwrap().as_bytes()).unwrap();
        return Ok(());
    } else if file_path.is_file() {
        return Ok(());
    } else {
        return Err(format!(
            "The file {} is not a file",
            file_path.to_str().unwrap()
        ));
    }
}

pub fn get_time() -> Timer {
    assert!(setup().is_ok());
    let json_file = std::fs::read_to_string("assets/settings.json").unwrap();
    let settings: Timer = serde_json::from_str(&json_file).unwrap();
    settings
}

pub fn set_time(time: Timer) -> bool {
    assert!(setup().is_ok());
    let json = serde_json::to_string(&time).unwrap();
    let settings_file = get_base_dir().unwrap().join("assets/settings.json");
    std::fs::write(settings_file, json).is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_setup_assets() {
        let setup_asset_result = setup_assets();
        assert!(setup_asset_result.is_ok());
        assert_eq!(setup_asset_result.unwrap(), ());
    }

    #[test]
    fn test_setup() {
        let setup_result = setup();
        assert!(setup_result.is_ok());
        assert_eq!(setup_result.unwrap(), ());
    }

    #[test]
    fn test_set_time() {
        assert_eq!(
            set_time(Timer {
                hours: 1,
                minutes: 2,
                seconds: 3,
                session: 4
            }),
            true
        );
    }
}
