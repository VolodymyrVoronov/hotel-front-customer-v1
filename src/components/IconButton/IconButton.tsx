import { ComponentProps, Ref, forwardRef } from "react";
import cn from "classnames";

import styles from "./IconButton.module.css";

interface IIconButtonProps extends ComponentProps<"button"> {
  iconSrc: string;
  iconAlt: string;

  className?: string;
}

const IconButton = forwardRef(
  (
    { iconSrc = "", iconAlt = "", className, ...props }: IIconButtonProps,
    ref?: Ref<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        className={cn(styles["icon-button"], className)}
        {...props}
      >
        <img src={iconSrc} alt={iconAlt} />
      </button>
    );
  }
);

export default IconButton;
