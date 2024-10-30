import { Link, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { isPaused, sendNotify } from "../api/timer";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export const Layout = () => {
  const location = useLocation();
  const cookies = useCookies(["currentTime"])[0];
  const [isP, setIsP] = useState(false);
  useEffect(() => {
    isPaused(cookies.currentTime).then((value) => setIsP(value));
    if (location.pathname !== "/" && isP)
      sendNotify(
        "Предупреждение!",
        "Таймер приостановлен. Вернитесь на главную страницу чтобы работал таймер!",
      );
  }, [isP]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main style={{ minHeight: 300 }}>
        <Outlet />
      </main>
      <footer className="text-center p-3 bg-dark">
        <Link to="/donate#qrcode" className="link fw-bold link-success">
          Отправить донат разработчику
        </Link>
      </footer>
    </>
  );
};
