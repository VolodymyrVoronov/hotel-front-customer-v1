import Heading from "../../components/Heading/Heading";

import styles from "./Facilities.module.css";

const Facilities = (): JSX.Element => {
  return (
    <div className={styles["facilities"]}>
      <Heading tag="h3" className={styles["facilities-title"]}>
        Facilities
      </Heading>
    </div>
  );
};

export default Facilities;
