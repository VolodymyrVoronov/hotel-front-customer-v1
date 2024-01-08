import { ReactNode } from "react";

import cn from "classnames";

import styles from "./SplitViewContent.module.css";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

interface ISplitViewContentProps {
  imageSrc: string;
  imageAlt: string;

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
      <div className={styles["split-view-content"]}>{children}</div>

      <div className={styles["split-view-image-wrapper"]}>
        <LazyLoadImage
          src={imageSrc}
          alt={imageAlt}
          className={styles["split-view-image"]}
          threshold={200}
        />
      </div>
    </div>
  );
};

export default SplitViewContent;
