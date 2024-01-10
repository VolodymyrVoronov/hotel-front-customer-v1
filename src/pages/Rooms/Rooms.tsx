import Heading from "../../components/Heading/Heading";

import styles from "./Rooms.module.css";

const Rooms = (): JSX.Element => {
  return (
    <div className={styles["rooms"]}>
      <Heading tag="h3" className={styles["rooms-title"]}>
        Rooms and Rates
      </Heading>

      <span className={styles["rooms-text"]}>
        Each of our bright, light-flooded rooms come with everything you could
        possibly need for a comfortable stay. And yes, comfort isn’t our only
        objective, we also value good design, sleek contemporary furnishing
        complemented by the rich tones of nature’s palette as visible from our
        rooms’ sea-view windows and terraces.
      </span>
    </div>
  );
};

export default Rooms;
