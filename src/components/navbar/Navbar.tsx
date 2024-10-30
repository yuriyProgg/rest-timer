import { HouseIcon, BoltIcon, RussianRubleIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="d-flex justify-content-center p-1">
      <ul className="list-group list-group-horizontal shadow">
        <li className="list-group-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `d-flex gap-1 text-decoration-none align-items-center ${isActive ? "link-light" : "link-success"}`
            }
          >
            <HouseIcon />
            Главная
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `d-flex gap-1 text-decoration-none align-items-center ${isActive ? "link-light" : "link-success"}`
            }
          >
            <BoltIcon />
            Настойки
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              `d-flex gap-1 text-decoration-none align-items-center ${isActive ? "link-light" : "link-success"}`
            }
          >
            <RussianRubleIcon />
            Донат
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
