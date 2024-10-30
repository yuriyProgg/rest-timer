import { useEffect, useState } from "react";
import { PlayIcon, RotateCcwIcon, PauseIcon } from "lucide-react";
import { getTime, sleepPc, warnTime } from "../api/timer";
import { useCookies } from "react-cookie";
import { ITimer } from "../interfaces/timer.interface";

export const MainPage = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [session, setSession] = useState(-1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const [cookies, setCookie] = useCookies(["currentTime"]);

  async function saveCurrentTime() {
    const time: ITimer = {
      hours,
      minutes,
      seconds,
      session,
    };
    const data = JSON.stringify(time);
    setCookie("currentTime", data);
  }

  async function getCurrentTime(): Promise<ITimer> {
    if (!cookies.currentTime) return await getTime();
    return cookies.currentTime;
  }

  function start() {
    setIsPlaying(true);
    setIsPaused(false);
  }
  function pause() {
    setIsPlaying(false);
    setIsPaused(true);
  }

  function reset() {
    getTime().then((time) => {
      setHours(time.hours);
      setMinutes(time.minutes);
      setSeconds(time.seconds);
      setSession(time.session);
    });
  }

  useEffect(() => {
    if (isPaused && session === -1) {
      getCurrentTime().then((time) => {
        setHours(time.hours);
        setMinutes(time.minutes);
        setSeconds(time.seconds);
        setSession(time.session);
      });
    }
    const interval = setInterval(() => {
      if (isPlaying && session > 0) {
        if (seconds > 0) setSeconds(seconds - 1);
        else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          warnTime(minutes);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setSession(session - 1);
          sleepPc();
        }
      }
      saveCurrentTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isPaused, session, seconds]);

  return (
    <div className="pt-5">
      <h1 className="text-center" style={{ fontSize: 70 }}>
        {hours}ч {minutes}м {seconds}с
      </h1>
      <h1 className="text-center">Сессия: {session}</h1>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-success gap-2 aling-items-center d-flex"
          disabled={isPlaying}
          onClick={start}
        >
          <PlayIcon />
          Старт
        </button>
        <button
          className="btn btn-danger gap-2 aling-items-center d-flex"
          disabled={isPaused}
          onClick={pause}
        >
          <PauseIcon />
          Стоп
        </button>
        <button
          className="btn btn-warning gap-2 aling-items-center d-flex"
          disabled={isPlaying}
          onClick={reset}
        >
          <RotateCcwIcon />
          Перезагрузить
        </button>
      </div>
    </div>
  );
};
