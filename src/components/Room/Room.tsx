import { ComponentProps, useState } from "react";
import cn from "classnames";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

import styles from "./Room.module.css";
import "react-image-gallery/styles/css/image-gallery.css";

interface IRoomProps extends ComponentProps<"div"> {
  id: string;
  roomId: string;
  roomPrice: number;
  title: string;
  photos: {
    original: string;
    thumbnail: string;
  } extends ReactImageGalleryItem
    ? Array<ReactImageGalleryItem>
    : never;
  accordionTitle: string;
  accordionContentText: string;

  buttonPriceText: string;
  buttonBookText: string;

  className?: string;
}

const Room = ({
  roomId,
  roomPrice,
  title,
  photos,
  accordionTitle,
  accordionContentText,
  buttonPriceText,
  buttonBookText,

  className,

  ...props
}: IRoomProps): JSX.Element => {
  const [toggleBookButton, setToggleBookButton] = useState(false);
  const [toggleAccordion, setToggleAccordion] = useState(false);

  const onBookButtonClick = (): void => {
    console.log(`Book room ${roomId}, price ${roomPrice}`);
  };

  const onBookButtonHover = (): void => {
    setToggleBookButton(true);
  };

  const onBookButtonLeave = (): void => {
    setToggleBookButton(false);
  };

  const onAccordionButtonClick = (): void => {
    setToggleAccordion(!toggleAccordion);
  };

  return (
    <div className={cn(styles["room"], className)} {...props}>
      <div className={styles["room-photos"]}>
        <ImageGallery
          additionalClass={styles["room-photos-gallery"]}
          items={photos}
          showBullets
          lazyLoad
          showThumbnails={false}
          showPlayButton={false}
          showFullscreenButton={false}
        />
      </div>
      <h2 className={styles["room-title"]}>{title}</h2>

      <div className={styles["room-footer"]}>
        <div className={styles["room-footer-control"]}>
          <div className={styles["room-accordion-button-wrapper"]}>
            <IconButton
              onClick={onAccordionButtonClick}
              className={styles["room-accordion-button"]}
              iconSrc="/icons/plus-icon.svg"
              iconAlt="Plus icon"
            />
            <span className={styles["room-accordion-button-text"]}>
              {accordionTitle}
            </span>
          </div>

          <Button
            className={styles["room-book-button"]}
            onClick={onBookButtonClick}
            onMouseEnter={onBookButtonHover}
            onMouseLeave={onBookButtonLeave}
            hasIcon={false}
          >
            <AnimatePresence mode="wait" initial>
              {toggleBookButton ? (
                <motion.div
                  key="book"
                  className={styles["room-book-text"]}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {buttonBookText}
                </motion.div>
              ) : (
                <motion.div
                  key="price"
                  className={styles["room-book-price"]}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {buttonPriceText}
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        <div className={styles["room-accordion-content"]}>
          <AnimatePresence mode="wait">
            {toggleAccordion ? (
              <motion.div
                key="content"
                className={styles["room-accordion-content-text"]}
                initial={{ y: -25, height: 0, opacity: 0 }}
                animate={{ y: 0, height: "auto", opacity: 1 }}
                exit={{ y: -25, height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span />
                {accordionContentText}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Room;
