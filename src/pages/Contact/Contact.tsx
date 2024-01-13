import { useState, lazy, Suspense } from "react";
import { useTitle } from "ahooks";

import ContactForm from "../../components/ContactForm/ContactForm";
import Heading from "../../components/Heading/Heading";
import Modal from "../../components/Modal/Modal";
import ModalContent from "../../components/ModalContent/ModalContent";

const GoogleMap = lazy(() => import("../../components/GoogleMap/GoogleMap"));

import styles from "./Contact.module.css";

const Contact = (): JSX.Element => {
  useTitle("Luxury Hotels - Contact");

  const [toggleModal, setToggleModal] = useState(false);

  const onShowMapButtonClick = (): void => {
    setToggleModal(true);
  };

  const onCloseModal = (): void => {
    setToggleModal(false);
  };

  return (
    <>
      <div className={styles["contact"]}>
        <Heading tag="h3" className={styles["contact-title"]}>
          We are here for you
        </Heading>

        <span className={styles["contact-text"]}>
          At Luxury Hotels, we take our customers seriously. Do you have any
          enquiries, compaints or requests, please forward it to our support
          desk and we will get back to you as soon as possible.
        </span>

        <div className={styles["contact-info-wrapper"]}>
          <div className={styles["contact-info"]}>
            <span className={styles["contact-info-text"]}>
              497 Evergreen Rd. Roseville, <br /> CA 95673
            </span>
            <button
              onClick={onShowMapButtonClick}
              className={styles["contact-info-link"]}
              type="button"
            >
              View map{""}
              <img
                className={styles["contact-info-link-icon"]}
                src="/icons/arrow-right-icon.svg"
                alt="Arrow right icon"
              />
            </button>

            <span className={styles["contact-info-text"]}>
              Phone: <a href="tel:+11 222 333 333">+11 222 333 333</a> <br />
              Email: <a href="mailto:text@mail.com">text@mail.com</a>
            </span>
          </div>

          <ContactForm className={styles["form"]} />
        </div>
      </div>

      <Modal isOpen={toggleModal} onClose={onCloseModal}>
        <ModalContent>
          <Suspense fallback={<>Loading...</>}>
            <GoogleMap />
          </Suspense>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Contact;
