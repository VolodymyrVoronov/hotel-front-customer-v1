import {
  ChangeEvent,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useState,
} from "react";
import cn from "classnames";
import { z } from "zod";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useKeyPress } from "ahooks";

import { checkEmptyFields } from "../../helpers";

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

const ContactForm = forwardRef(
  (
    { className, ...props }: IContactFormProps,
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    const [formData, setFormData] = useState<IFormData>(initialFormData);

    const onInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const onFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const checkEmailResult = emailSchema.safeParse(formData.email);

      if (checkEmailResult.success) {
        toastSuccess();
        setFormData(initialFormData);
      } else {
        toastError();
      }
    };

    useKeyPress("ESC", () => {
      if (checkEmptyFields(formData, "some")) {
        setFormData(initialFormData);
      }
    });

    return (
      <>
        <ToastContainer />
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
            disabled={!checkEmptyFields(formData, "every")}
            className={styles["contact-form-button"]}
            hasIcon={false}
          >
            Submit
          </Button>
        </form>
      </>
    );
  }
);

export default ContactForm;
