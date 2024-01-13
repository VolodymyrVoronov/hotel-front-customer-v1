import { useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useKeyPress } from "ahooks";

import IconButton from "../IconButton/IconButton";

import styles from "./Modal.module.css";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;

  children: JSX.Element;
}

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  exit: { top: "-50%" },
};

const Modal = ({ onClose, isOpen, children }: IModalProps): JSX.Element => {
  useKeyPress("ESC", () => {
    if (isOpen) {
      onClose();
    }
  });

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onOverlayClick}
          className={styles["overlay"]}
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <motion.div
            className={styles["container"]}
            variants={containerVariant}
          >
            <IconButton
              iconSrc="/icons/plus-icon.svg"
              iconAlt="Close icon"
              className={styles["close-button"]}
              onClick={onClose}
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
