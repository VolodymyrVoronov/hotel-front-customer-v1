import styles from "./Logo.module.css";

const Logo = (): JSX.Element => {
  return (
    <div className={styles["logo"]}>
      <span className={styles["logo-title"]}>Luxury</span>
      <span className={styles["logo-subtitle"]}>Hotels </span>
    </div>
  );
};

export default Logo;
