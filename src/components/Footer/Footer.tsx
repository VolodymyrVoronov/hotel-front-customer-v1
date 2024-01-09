import { ChangeEvent, useState } from "react";
import cn from "classnames";
import { z } from "zod";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useKeyPress } from "ahooks";

import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./Footer.module.css";

interface IFooterProps {
  className?: string;
}

const emailSchema = z.string().email();

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
} satisfies ToastOptions;

const toastSuccess = (): void => {
  toast.success("Thank you for subscribing!", {
    ...toastConfig,
  });
};

const toastError = (): void => {
  toast.error("Please enter a valid email", {
    ...toastConfig,
  });
};

const Footer = ({ className }: IFooterProps): JSX.Element => {
  const [email, setEmail] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onSubscribeButtonClick = (): void => {
    const checkEmailResult = emailSchema.safeParse(email);

    if (checkEmailResult.success) {
      toastSuccess();
      setEmail("");
    } else {
      toastError();
    }
  };

  useKeyPress("ESC", () => {
    if (email.length > 0) {
      setEmail("");
    }
  });

  return (
    <>
      <ToastContainer />
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
                <a href="tel:++44 345 678 903">+44 345 678 903</a>
                <a href="mailto:luxury_hotels@gmail.com">
                  luxury_hotels@gmail.com
                </a>
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
              <div className={styles["footer-newsletter-wrapper"]}>
                <p className={styles["footer-newsletter-text"]}>
                  Subscribe to our newsletter
                </p>
                <div className={styles["footer-newsletter-form"]}>
                  <Input
                    onChange={onInputChange}
                    value={email}
                    inputType="email"
                    placeholder="Email address"
                    classNameWrapper={styles["footer-newsletter-input-wrapper"]}
                    classNameInput={styles["footer-newsletter-input"]}
                  />

                  <Button
                    onClick={onSubscribeButtonClick}
                    className={styles["footer-newsletter-button"]}
                    hasIcon={false}
                    disabled={email.length === 0}
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
