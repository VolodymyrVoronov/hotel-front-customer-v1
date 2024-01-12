import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { ROUTES } from "../../constants";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../../components/Testimonials/Testimonials";

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

      {pathname !== ROUTES.CONTACT ? (
        <div className={styles["main-testimonials"]}>
          <Testimonials />
        </div>
      ) : null}

      <Footer className={styles["main-footer"]} />
    </div>
  );
};

export default Main;
