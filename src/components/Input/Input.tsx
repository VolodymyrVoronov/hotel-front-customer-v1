import {
  ComponentProps,
  HTMLInputTypeAttribute,
  Ref,
  forwardRef,
  useId,
} from "react";
import cn from "classnames";

import styles from "./Input.module.css";

interface IInputProps extends ComponentProps<"input"> {
  inputType: HTMLInputTypeAttribute;
  labelText?: string;
  showLabel?: boolean;
  classNameWrapper?: string;
  classNameInput?: string;
}

const Input = forwardRef(
  (
    {
      inputType,
      labelText,
      showLabel = false,
      classNameWrapper,
      classNameInput = "",
      ...props
    }: IInputProps,
    ref?: Ref<HTMLInputElement>
  ): JSX.Element => {
    const id = useId();

    return (
      <div className={cn(styles["input-wrapper"], classNameWrapper)}>
        {showLabel && (
          <label className={styles["input-label"]} htmlFor={id}>
            {labelText}
          </label>
        )}

        <input
          ref={ref}
          className={cn(styles["input"], classNameInput)}
          type={inputType}
          id={id}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
