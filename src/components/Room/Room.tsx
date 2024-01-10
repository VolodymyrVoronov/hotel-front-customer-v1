import { ComponentProps } from "react";
import cn from "classnames";

import styles from "./Room.module.css";

interface IRoomProps extends ComponentProps<"div"> {
  className?: string;
}

const Room = ({ className, ...props }: IRoomProps): JSX.Element => {
  return (
    <div className={cn(styles["room"], className)} {...props}>
      Room
    </div>
  );
};

export default Room;
