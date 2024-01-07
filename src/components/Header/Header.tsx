import Logo from "../Logo/Logo";

import styles from "./Header.module.css";

const Header = (): JSX.Element => {
  return (
    <header className={styles["header"]}>
      <div className={styles["container"]}>
        <div className={styles["top-section"]}>
          <Logo />
          <nav>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
