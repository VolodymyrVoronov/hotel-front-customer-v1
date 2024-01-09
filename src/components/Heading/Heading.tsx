import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import styles from "./Heading.module.css";

interface IHeadingProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: ReactNode;
}

const Heading = ({
  tag = "h2",
  className,
  children,

  ...props
}: IHeadingProps): JSX.Element => {
  const HeadingTag = tag;

  return (
    <HeadingTag className={cn(styles["heading"], className)} {...props}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
