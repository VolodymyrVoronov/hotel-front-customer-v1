import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { ToastOptions, toast } from "react-toastify";
import { useKeyPress } from "ahooks";
import useSWRMutation from "swr/mutation";

import { API_URL } from "../../constants";
import { postRequest } from "../../helpers";

import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./Subscription.module.css";

interface ISubscriptionRequest {
  Email: string;
}

interface ISubscriptionResponse {
  message: string;
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

const toastSuccess = (message: string): void => {
  toast.success(message, {
    ...toastConfig,
  });
};

const toastError = (message: string): void => {
  toast.error(message, {
    ...toastConfig,
  });
};

const Subscription = (): JSX.Element => {
  const { trigger: subscribe, isMutating: isLoadingSubscribe } = useSWRMutation(
    `${API_URL}/subscription`,
    postRequest<ISubscriptionRequest, ISubscriptionResponse>
  );

  const [email, setEmail] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onSubscribeButtonClick = async (): Promise<void> => {
    const checkEmailResult = emailSchema.safeParse(email);

    if (checkEmailResult.success) {
      try {
        const res = await subscribe({
          Email: email,
        });

        if (!res) {
          toastError("Something went wrong. Please try again later.");
          return;
        }

        toastSuccess(res.message);
        setEmail("");
      } catch (error) {
        if (error instanceof Error) {
          toastError(error.message);
          setEmail("");
        }
      }
    } else {
      toastError("Invalid email address");
    }
  };

  useKeyPress("ESC", () => {
    if (email.length > 0) {
      setEmail("");
    }
  });

  return (
    <div className={styles["subscription-wrapper"]}>
      <p className={styles["subscription-text"]}>Subscribe to our newsletter</p>
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
          disabled={email.length === 0 || isLoadingSubscribe}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default Subscription;
