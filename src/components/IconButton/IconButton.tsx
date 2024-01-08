import { ComponentProps, Ref, forwardRef } from "react";
import cn from "classnames";

import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

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
        <LazyLoadImage src={iconSrc} alt={iconAlt} threshold={200} />
      </button>
    );
  }
);

export default IconButton;
