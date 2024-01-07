import { NavLink } from "react-router-dom";
import cn from "classnames";

import { ROUTES } from "../../constants";

import styles from "./Navigation.module.css";

const Navigation = (): JSX.Element => {
  return (
    <nav className={styles["navigation-wrapper"]}>
      <ul className={styles["navigation"]}>
        <li className={styles["navigation-item"]}>
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              cn(styles["navigation-item-link"], {
                [styles["navigation-item-link--active"]]: isActive,
              })
            }
          >
            Home
          </NavLink>
        </li>
        <li className={styles["navigation-item"]}>
          <NavLink
            to={ROUTES.FACILITIES}
            className={({ isActive }) =>
              cn(styles["navigation-item-link"], {
                [styles["navigation-item-link--active"]]: isActive,
              })
            }
          >
            Facilities
          </NavLink>
        </li>
        <li className={styles["navigation-item"]}>
          <NavLink
            to={ROUTES.ROOMS}
            className={({ isActive }) =>
              cn(styles["navigation-item-link"], {
                [styles["navigation-item-link--active"]]: isActive,
              })
            }
          >
            Rooms
          </NavLink>
        </li>
        <li className={styles["navigation-item"]}>
          <NavLink
            to={ROUTES.CONTACT}
            className={({ isActive }) =>
              cn(styles["navigation-item-link"], {
                [styles["navigation-item-link--active"]]: isActive,
              })
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
