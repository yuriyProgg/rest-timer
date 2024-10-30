import { SaveIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getTime, setTime } from "../api/timer";

export const SettingsPage = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    getTime().then((time) => {
      setHours(time.hours);
      setMinutes(time.minutes);
      setSeconds(time.seconds);
      setSessions(time.session);
    });
  }, []);
  async function save() {
    await setTime({
      hours,
      minutes,
      seconds,
      session: sessions,
    });
  }
  return (
    <form onSubmit={() => save()} className="container px-4">
      <div className="my-3">
        <label htmlFor="hours" className="form-label fs-3">
          {hours} ч
        </label>
        <div className="d-flex align-items-center justify-content-between">
          <input
            className="form-range"
            type="range"
            id="hours"
            min="0"
            max="24"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="hours" className="form-label fs-3">
          {minutes} мин
        </label>
        <div className="d-flex align-items-center justify-content-between">
          <input
            className="form-range"
            type="range"
            id="minutes"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="seconds" className="form-label fs-3">
          {seconds} сек
        </label>
        <div className="d-flex align-items-center justify-content-between">
          <input
            className="form-range"
            type="range"
            id="seconds"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="sessions" className="form-label fs-3">
          {sessions} {sessions > 1 ? "сессии" : "сессия"}
        </label>
        <div className="d-flex align-items-center justify-content-between">
          <input
            className="form-range"
            type="range"
            id="sessions"
            min="1"
            max="10"
            value={sessions}
            onChange={(e) => setSessions(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-success d-flex align-items-center gap-2 mb-3"
      >
        <SaveIcon />
        Сохранить
      </button>
    </form>
  );
};
