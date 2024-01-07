import { ReactNode } from "react";
import cn from "classnames";

import styles from "./SplitViewContent.module.css";

interface ISplitViewContentProps {
  imageSrc?: string;
  imageAlt?: string;

  className?: string;
  children: ReactNode;
}

const SplitViewContent = ({
  imageSrc,
  imageAlt,

  className,
  children,
}: ISplitViewContentProps): JSX.Element => {
  return (
    <div className={cn(styles["split-view"], className)}>
      <div className={styles["split-view-body"]}>{children}</div>

      <div className={styles["split-view-image-wrapper"]}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={styles["split-view-image"]}
        />
      </div>
    </div>
  );
};

export default SplitViewContent;
