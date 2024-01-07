import { useLocation } from "react-router-dom";
import cn from "classnames";

import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

import { ROUTES } from "../../constants";

import styles from "./Header.module.css";

const headerImage: Record<string, string> = {
  [ROUTES.HOME]: "/images/home/header-home-01.png",
  [ROUTES.FACILITIES]: "/images/facilities/header-facilities-01.png",
  [ROUTES.ROOMS]: "/images/rooms/header-rooms-01.png",
};

const isPathContact = (pathname: string): boolean => {
  return ROUTES.CONTACT === pathname;
};

const Header = (): JSX.Element => {
  const location = useLocation();

  return (
    <header
      className={cn(styles["header-wrapper"], {
        [styles["header-wrapper--no-bg"]]: isPathContact(location.pathname),
      })}
      {...(!isPathContact(location.pathname) && {
        style: {
          backgroundImage: `url(${headerImage[location.pathname]})`,
        },
      })}
    >
      <div className={styles["header"]}>
        <div className={styles["header-top"]}>
          <Logo />
          <Navigation />
        </div>

        <div
          className={cn(styles["header-middle"], {
            [styles["header-middle--contact"]]: isPathContact(
              location.pathname
            ),
          })}
        >
          {isPathContact(location.pathname) ? (
            <span className={styles["header-middle-contact"]}>CONTACT-US</span>
          ) : (
            <>
              <span className={styles["header-middle-welcome"]}>
                Welcome to
              </span>
              <h1 className={styles["header-middle-title"]}>Luxury</h1>
              <h2 className={styles["header-middle-subtitle"]}>Hotels</h2>
              <span className={styles["header-middle-text"]}>
                Book your stay and enjoy Luxury <br /> redefined at the most
                affordable rates.
              </span>
            </>
          )}
        </div>

        <div className={styles["header-bottom"]}>Bottom</div>
      </div>
    </header>
  );
};

export default Header;
