import Heading from "../../components/Heading/Heading";
import Image from "../../components/Image/Image";
import Testimonials from "../../components/Testimonials/Testimonials";

import styles from "./Facilities.module.css";

const facilitiesImages: Array<{
  id: string;
  src: string;
  alt: string;
  captionText: string;
}> = [
  {
    id: "1",
    src: "/images/facilities/gym-facilities.png",
    alt: "Gym",
    captionText: "The gym",
  },
  {
    id: "2",
    src: "/images/facilities/bar-facilities.png",
    alt: "Poolside bar",
    captionText: "Poolside bar",
  },
  {
    id: "3",
    src: "/images/facilities/spa-facilities.png",
    alt: "Spa",
    captionText: "The spa",
  },
  {
    id: "4",
    src: "/images/facilities/pool-facilities.png",
    alt: "Swimming pool",
    captionText: "Swimming pool",
  },
  {
    id: "5",
    src: "/images/facilities/restaurant-facilities.png",
    alt: "Restaurant",
    captionText: "Restaurant",
  },
  {
    id: "6",
    src: "/images/facilities/laundry-facilities.png",
    alt: "Laundry",
    captionText: "Laundry",
  },
];

const Facilities = (): JSX.Element => {
  return (
    <div className={styles["facilities"]}>
      <Heading tag="h3" className={styles["facilities-title"]}>
        Facilities
      </Heading>

      <span className={styles["facilities-text"]}>
        We want your stay at our lush hotel to be truly unforgettable. That is
        why we give special attention to all of your needs so that we can ensure
        an experience quite unique. Luxury hotels offers the perfect setting
        with stunning views for leisure and our modern luxury resort facilities
        will help you enjoy the best of all.
      </span>

      <div className={styles["facilities-images"]}>
        {facilitiesImages.map(({ id, src, alt, captionText }) => (
          <Image
            key={id}
            src={src}
            alt={alt}
            captionText={captionText}
            classNameWrapper={styles["facilities-image"]}
          />
        ))}
      </div>

      <div className={styles["facilities-testimonials"]}>
        <Testimonials />
      </div>
    </div>
  );
};

export default Facilities;
