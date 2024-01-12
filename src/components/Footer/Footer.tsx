import cn from "classnames";

import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
import Subscription from "../Subscription/Subscription";

import styles from "./Footer.module.css";

interface IFooterProps {
  className?: string;
}

const Footer = ({ className }: IFooterProps): JSX.Element => {
  return (
    <div className={cn(styles["footer-wrapper"], className)}>
      <LazyLoadImage
        className={styles["footer-figure"]}
        src="/icons/figure-triangle.svg"
      />
      <footer className={styles["footer"]}>
        <div className={styles["footer-grid"]}>
          <div className={styles["footer-address"]}>
            <div className={styles["footer-address-logo"]}>
              <h3 className={styles["footer-address-logo-title"]}>Luxury</h3>
              <span className={styles["footer-address-logo-subtitle"]}>
                Hotels
              </span>
            </div>

            <div className={styles["footer-address-info"]}>
              <span>497 Evergreen Rd. Roseville, CA 95673</span>
              <a href="tel:+11 222 333 333">+11 222 333 333</a>
              <a href="mailto:text@mail.com">text@mail.com</a>
            </div>
          </div>

          <div className={styles["footer-info"]}>
            <ul className={styles["footer-info-list"]}>
              <li className={styles["footer-info-item"]}>
                <a href="#">About Us</a>
              </li>
              <li className={styles["footer-info-item"]}>
                <a href="#">Contact</a>
              </li>
              <li className={styles["footer-info-item"]}>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className={styles["footer-social"]}>
            <ul className={styles["footer-social-list"]}>
              <li className={styles["footer-social-item"]}>
                <LazyLoadImage src="/icons/fb-icon.svg" alt="Facebook" />
                <a href="#">Facebook</a>
              </li>
              <li className={styles["footer-social-item"]}>
                <LazyLoadImage src="/icons/tw-icon.svg" alt="Twitter" />
                <a href="#">Twitter</a>
              </li>
              <li className={styles["footer-social-item"]}>
                <LazyLoadImage src="/icons/inst-icon.svg" alt="Instagram" />
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>

          <div className={styles["footer-newsletter"]}>
            <Subscription />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
