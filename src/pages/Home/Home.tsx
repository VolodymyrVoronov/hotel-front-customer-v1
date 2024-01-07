import styles from "./Home.module.css";

const Home = (): JSX.Element => {
  return (
    <div className={styles["home"]}>
      <h2 className={styles["home-title"]}>
        All our room types are including complementary breakfast
      </h2>
    </div>
  );
};

export default Home;
