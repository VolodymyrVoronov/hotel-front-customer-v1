import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

import styles from "./Header.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles["header-wrapper"]}>
      <div className={styles["header"]}>
        <div className={styles["header-top"]}>
          <Logo />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
