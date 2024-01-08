import { ComponentProps, ReactNode, Ref, forwardRef } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

interface IButtonProps extends ComponentProps<"button"> {
  hasIcon?: boolean;
  iconSrc?: string;
  iconAlt?: string;

  className?: string;
  children?: ReactNode;
}

const Button = forwardRef(
  (
    {
      hasIcon = true,
      iconSrc = "/icons/hotel-icon.svg",
      iconAlt = "Hotel icon",
      className,
      children,
      ...props
    }: IButtonProps,
    ref?: Ref<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button ref={ref} className={cn(styles["button"], className)} {...props}>
        {hasIcon ? (
          <span className={styles["button-icon"]}>
            <img src={iconSrc} alt={iconAlt} />
          </span>
        ) : null}
        <span className={styles["button-children"]}>{children}</span>
      </button>
    );
  }
);

export default Button;
