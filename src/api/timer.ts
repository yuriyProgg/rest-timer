import { invoke } from "@tauri-apps/api/core";
import { ITimer } from "../interfaces/timer.interface";

export async function getTime(): Promise<ITimer> {
  return await invoke("get_time");
}

export async function setTime(time: ITimer) {
  return await invoke("set_time", time as any);
}

export async function sleepPc() {
  return await invoke("sleep_pc");
}

export async function sendNotify(title: string, body: string) {
  return await invoke("send_notify", { title, body });
}

export async function isPaused(cookie: any): Promise<boolean> {
  return (await getTime()) !== cookie;
}

export function warnTime(minutes: number) {
  if (minutes > 5) return;
  sendNotify(
    "Таймер",
    `Осталось ${minutes} минут${minutes === 1 ? "а" : minutes < 5 ? "ы" : ""}`,
  );
}
