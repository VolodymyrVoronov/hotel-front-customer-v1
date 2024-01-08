import { Outlet } from "react-router";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./Main.module.css";

const Main = (): JSX.Element => {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer className={styles["main-footer"]} />
    </div>
  );
};

export default Main;
