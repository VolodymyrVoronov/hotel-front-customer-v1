import {
  ChangeEvent,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useState,
} from "react";
import cn from "classnames";
import { z } from "zod";
import { ToastOptions, toast } from "react-toastify";
import { useKeyPress } from "ahooks";
import useSWRMutation from "swr/mutation";

import { API_URL } from "../../constants";
import { checkEmptyFields, postRequest } from "../../helpers";

import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./ContactForm.module.css";

interface IContactFormProps extends ComponentProps<"form"> {
  className?: string;
}

interface IFormData {
  name: string;
  email: string;
  message: string;
}

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

interface IContactUsRequest {
  Name: string;
  Email: string;
  Message: string;
}

interface IContactUsResponse {
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

const ContactForm = forwardRef(
  (
    { className, ...props }: IContactFormProps,
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    const { trigger: contactUs, isMutating: isLoadingContactUs } =
      useSWRMutation(
        `${API_URL}/contact-us`,
        postRequest<IContactUsRequest, IContactUsResponse>
      );

    const [formData, setFormData] = useState<IFormData>(initialFormData);

    const onInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      setFormData({ ...formData, [name]: value });
    };

    const onFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const checkEmailResult = emailSchema.safeParse(formData.email);

      if (checkEmailResult.success) {
        try {
          const newMessage = {
            Name: formData.name,
            Email: formData.email,
            Message: formData.message,
          };

          const res = await contactUs(newMessage);

          if (!res) {
            toastError("Something went wrong. Please try again later.");
            return;
          }

          toastSuccess(res.message);
          setFormData(initialFormData);
        } catch (error) {
          if (error instanceof Error) {
            toastError(error.message);
          }
        }
      } else {
        toastError("Please enter a valid email");
      }
    };

    useKeyPress("ESC", () => {
      if (checkEmptyFields(formData, "some")) {
        setFormData(initialFormData);
      }
    });

    return (
      <form
        ref={ref}
        className={cn(styles["contact-form"], className)}
        onSubmit={onFormSubmit}
        {...props}
      >
        <label className={styles["contact-form-label"]}>
          Name{" "}
          <Input
            inputType="text"
            name="name"
            classNameWrapper={styles["contact-form-wrapper"]}
            classNameInput={styles["contact-form-input"]}
            required
            value={formData.name}
            onChange={onInputChange}
          />
        </label>

        <label className={styles["contact-form-label"]}>
          Email{" "}
          <Input
            inputType="email"
            name="email"
            classNameWrapper={styles["contact-form-wrapper"]}
            classNameInput={styles["contact-form-input"]}
            required
            value={formData.email}
            onChange={onInputChange}
          />
        </label>

        <label className={styles["contact-form-label"]}>
          Message{" "}
          <textarea
            name="message"
            className={styles["contact-form-area"]}
            rows={15}
            required
            value={formData.message}
            onChange={onInputChange}
          />
        </label>

        <Button
          disabled={!checkEmptyFields(formData, "every") || isLoadingContactUs}
          className={styles["contact-form-button"]}
          hasIcon={false}
        >
          Submit
        </Button>
      </form>
    );
  }
);

export default ContactForm;
