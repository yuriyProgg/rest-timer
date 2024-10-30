use serde::{Deserialize, Serialize};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod control;
mod settings;

#[derive(Serialize, Deserialize)]
struct ResponseIsOk {
    is_ok: bool,
}

#[tauri::command]
fn send_notify(title: &str, body: &str) -> ResponseIsOk {
    let is_ok = control::send_notification(title, body);
    ResponseIsOk { is_ok }
}

#[tauri::command]
fn sleep_pc() -> ResponseIsOk {
    let is_ok = control::pc::sleep().is_ok();
    ResponseIsOk { is_ok }
}

#[tauri::command]
fn get_time() -> settings::Timer {
    settings::get_time()
}

#[tauri::command]
fn set_time(hours: u8, minutes: u8, seconds: u8, session: u8) -> ResponseIsOk {
    let time = settings::Timer {
        hours,
        minutes,
        seconds,
        session,
    };
    let is_ok = settings::set_time(time);
    ResponseIsOk { is_ok }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_time,
            set_time,
            sleep_pc,
            send_notify
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
