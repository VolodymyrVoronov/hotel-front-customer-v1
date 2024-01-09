import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IconButton from "../IconButton/IconButton";
import Heading from "../Heading/Heading";

import styles from "./Testimonials.module.css";

const slides: { text: string; author: string }[] = [
  {
    text: '"Calm, Serene, Retro – What a way to relax and enjoy."',
    author: "Mr. and Mrs. Baxter, UK",
  },
  {
    text: '"The best hotel I\'ve ever stayed at. The staff are so welcoming and helpful."',
    author: "Mr. Scott, UK",
  },
  {
    text: '"The staff are so welcoming and helpful. I would definitely stay here again!"',
    author: "Mr. Anderson, UK",
  },
];

const Testimonials = (): JSX.Element => {
  const [index, setIndex] = useState(0);

  const onNextButtonClick = () => {
    setIndex((index + 1) % slides.length);
  };

  const onPrevButtonClick = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles["testimonials"]}>
      <Heading tag="h2" className={styles["testimonials-title"]}>
        Testimonials
      </Heading>

      <AnimatePresence mode="wait" custom={index}>
        <motion.div
          key={index}
          custom={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles["testimonials-text"]}>{slides[index].text}</p>
          <p className={styles["testimonials-author"]}>
            {slides[index].author}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className={styles["testimonials-buttons"]}>
        <IconButton
          onClick={onPrevButtonClick}
          iconSrc="/icons/chevron-left.svg"
          iconAlt="Chevron left icon"
        />
        <IconButton
          onClick={onNextButtonClick}
          iconSrc="/icons/chevron-right.svg"
          iconAlt="Chevron right icon"
        />
      </div>
    </div>
  );
};

export default Testimonials;
