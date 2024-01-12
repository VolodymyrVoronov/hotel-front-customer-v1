import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants";

import Button from "../../components/Button/Button";
import SplitViewContent from "../../components/SplitViewContent/SplitViewContent";
import Heading from "../../components/Heading/Heading";

import styles from "./Home.module.css";

const Home = (): JSX.Element => {
  const navigate = useNavigate();

  const onExploreRoomsButtonClick = (): void => {
    navigate(ROUTES.ROOMS);
  };

  const onExploreFacilitiesButtonClick = (): void => {
    navigate(ROUTES.FACILITIES);
  };

  return (
    <div className={styles["home"]}>
      <h2 className={styles["home-title"]}>
        All our room types are including complementary breakfast
      </h2>

      <div className={styles["home-split-view"]}>
        <SplitViewContent
          className={styles["home-split-view-rooms"]}
          imageSrc="/images/home/room-photo-home-01.png"
          imageAlt="Room photo"
        >
          <Heading tag="h3" className={styles["home-split-view-title"]}>
            Luxury redefined
          </Heading>
          <p className={styles["home-split-view-text"]}>
            Our rooms are designed to transport you into an environment made for
            leisure. Take your mind off the day-to-day of home life and find a
            private paradise for yourself.
          </p>

          <Button
            onClick={onExploreRoomsButtonClick}
            className={styles["home-split-view-button"]}
            hasIcon={false}
          >
            EXPLORE
          </Button>
        </SplitViewContent>

        <SplitViewContent
          imageSrc="/images/home/room-photo-home-02.png"
          imageAlt="Beach photo"
        >
          <Heading tag="h3" className={styles["home-split-view-title"]}>
            Leave your worries in the sand
          </Heading>
          <p className={styles["home-split-view-text"]}>
            We love life at the beach. Being close to the ocean with access to
            endless sandy beach ensures a relaxed state of mind. It seems like
            time stands still watching the ocean.
          </p>

          <Button
            onClick={onExploreFacilitiesButtonClick}
            className={styles["home-split-view-button"]}
            hasIcon={false}
          >
            EXPLORE
          </Button>
        </SplitViewContent>
      </div>
    </div>
  );
};

export default Home;
