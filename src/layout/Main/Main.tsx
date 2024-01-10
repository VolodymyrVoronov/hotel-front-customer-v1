import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./Main.module.css";

const Main = (): JSX.Element => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

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
