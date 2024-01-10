import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useKeyPress } from "ahooks";

import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./Subscription.module.css";

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

const Subscription = (): JSX.Element => {
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
      <div className={styles["subscription-wrapper"]}>
        <p className={styles["subscription-text"]}>
          Subscribe to our newsletter
        </p>
        <div className={styles["subscription-form"]}>
          <Input
            onChange={onInputChange}
            value={email}
            inputType="email"
            placeholder="Email address"
            classNameWrapper={styles["subscription-input-wrapper"]}
            classNameInput={styles["subscription-input"]}
          />

          <Button
            onClick={onSubscribeButtonClick}
            className={styles["subscription-button"]}
            hasIcon={false}
            disabled={email.length === 0}
          >
            OK
          </Button>
        </div>
      </div>
    </>
  );
};

export default Subscription;
