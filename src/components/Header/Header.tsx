import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";

import { checkPath } from "../../helpers";
import { ROUTES } from "../../constants";

import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

import styles from "./Header.module.css";
import { useMemo } from "react";

const headerImage: Record<string, string> = {
  [ROUTES.HOME]: "/images/home/header-home-01.png",
  [ROUTES.FACILITIES]: "/images/facilities/header-facilities-01.png",
  [ROUTES.ROOMS]: "/images/rooms/header-rooms-01.png",
};

const Header = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const onBookNowButtonClick = (): void => {
    navigate(ROUTES.ROOMS);
  };

  const isPathContent = useMemo(
    () => checkPath(ROUTES.CONTACT, location.pathname),
    [location.pathname]
  );

  return (
    <header
      className={cn(styles["header-wrapper"], {
        [styles["header-wrapper--no-bg"]]: isPathContent,
      })}
      {...(!isPathContent && {
        style: {
          backgroundImage: `url(${headerImage[location.pathname]})`,
          transition: "background-image 0.5s ease",
        },
      })}
    >
      <div
        className={cn(styles["header"], {
          [styles["header--no-bg"]]: isPathContent,
        })}
      >
        <div className={styles["header-top"]}>
          <Logo />
          <Navigation />
        </div>

        <div
          className={cn(styles["header-middle"], {
            [styles["header-middle--contact"]]: isPathContent,
          })}
        >
          {isPathContent ? (
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

        {!isPathContent ? (
          <div className={styles["header-bottom"]}>
            <Button
              onClick={onBookNowButtonClick}
              className={styles["header-bottom-button"]}
            >
              BOOK NOW
            </Button>

            <ScrollIndicator className={styles["header-bottom-indicator"]} />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
