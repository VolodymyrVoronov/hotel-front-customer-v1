import { ReactNode } from "react";
import cn from "classnames";

import styles from "./ModalContent.module.css";

interface IModalContentProps {
  className?: string;

  children?: ReactNode;
}

const ModalContent = ({
  className,
  children,
}: IModalContentProps): JSX.Element => {
  return (
    <div className={cn(styles["modal-content"], className)}>{children}</div>
  );
};

export default ModalContent;
