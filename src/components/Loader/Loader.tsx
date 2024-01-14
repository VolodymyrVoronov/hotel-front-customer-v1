import cn from "classnames";
import { ComponentProps } from "react";

import styles from "./Loader.module.css";

interface ILoaderProps extends ComponentProps<"div"> {
  type?: "vertical" | "horizontal";
  className?: string;
}

const Loader = ({
  type = "vertical",
  className,
  ...props
}: ILoaderProps): JSX.Element => {
  return (
    <div className={cn(styles["loader-wrapper"], className)} {...props}>
      <span className={`${styles[`loader-${type}`]}`} />
    </div>
  );
};

export default Loader;
