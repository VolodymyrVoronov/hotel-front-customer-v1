import cn from "classnames";

import styles from "./ScrollIndicator.module.css";

interface IScrollIndicatorProps {
  className?: string;
}

const ScrollIndicator = ({ className }: IScrollIndicatorProps): JSX.Element => {
  return (
    <div className={cn(styles["indicator"], className)}>
      <span className={styles["indicator-text"]}>Scroll</span>
      <img
        className={styles["indicator-icon"]}
        src="/icons/scroll-icon.svg"
        alt="Scroll icon"
      />
    </div>
  );
};

export default ScrollIndicator;
