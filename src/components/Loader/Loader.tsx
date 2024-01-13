import cn from "classnames";

import styles from "./Loader.module.css";

interface ILoaderProps {
  className?: string;
}

const Loader = ({ className }: ILoaderProps): JSX.Element => {
  return (
    <div className={cn(styles["loader-wrapper"], className)}>
      <span className={styles["loader"]} />
    </div>
  );
};

export default Loader;
