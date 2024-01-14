import { Suspense, lazy, useState } from "react";
import { useTitle } from "ahooks";
import { ReactImageGalleryItem } from "react-image-gallery";

import Heading from "../../components/Heading/Heading";
import Room from "../../components/Room/Room";
import Modal from "../../components/Modal/Modal";
import ModalContent from "../../components/ModalContent/ModalContent";
import Loader from "../../components/Loader/Loader";

const BookingForm = lazy(
  () => import("../../components/BookingForm/BookingForm")
);

import styles from "./Rooms.module.css";

const rooms = [
  {
    id: "1",
    roomId: "single",
    roomPrice: 147,
    title: "Single room",
    photos: [
      {
        original: "/images/rooms/single/single-room-01.jpg",
        thumbnail: "/images/rooms/single/single-room-01.jpg",
      },
      {
        original: "/images/rooms/single/single-room-02.jpg",
        thumbnail: "/images/rooms/single/single-room-02.jpg",
      },
    ],
    accordionTitle: "View room details",
    accordionContentText:
      "Our rooms are designed to transport you into an environment made for leisure. Take your mind off the day-to-day of home life and find a private paradise for yourself.",
    buttonPriceText: "$147  Avg/night",
    buttonBookText: "Book Now",
  },
  {
    id: "2",
    roomId: "double",
    roomPrice: 190,
    title: "Double room",
    photos: [
      {
        original: "/images/rooms/double/double-room-01.jpg",
        thumbnail: "/images/rooms/double/double-room-01.jpg",
      },
      {
        original: "/images/rooms/double/double-room-02.jpg",
        thumbnail: "/images/rooms/double/double-room-02.jpg",
      },
    ],
    accordionTitle: "View room details",
    accordionContentText:
      "Our rooms are designed to transport you into an environment made for leisure. Take your mind off the day-to-day of home life and find a private paradise for yourself.",
    buttonPriceText: "$190  Avg/night",
    buttonBookText: "Book Now",
  },
  {
    id: "3",
    roomId: "twin",
    roomPrice: 255,
    title: "Twin room",
    photos: [
      {
        original: "/images/rooms/twin/twin-room-01.jpg",
        thumbnail: "/images/rooms/twin/twin-room-01.jpg",
      },
      {
        original: "/images/rooms/twin/twin-room-02.jpg",
        thumbnail: "/images/rooms/twin/twin-room-02.jpg",
      },
    ],
    accordionTitle: "View room details",
    accordionContentText:
      "Our rooms are designed to transport you into an environment made for leisure. Take your mind off the day-to-day of home life and find a private paradise for yourself.",
    buttonPriceText: "$255  Avg/night",
    buttonBookText: "Book Now",
  },
];

interface IRoom {
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
}

const testExcludeDates: [string, string][] = [
  ["2024-01-21T10:45:17.000Z", "2024-01-26T10:45:17.000Z"],
  ["2024-01-31T10:45:17.000Z", "2024-02-03T10:45:17.000Z"],
  ["2024-02-07T10:45:17.000Z", "2024-02-10T10:45:17.000Z"],
];

const Rooms = (): JSX.Element => {
  useTitle("Luxury Hotels - Rooms");

  const [toggleModal, setToggleModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom>();

  const onRoomBookButtonClick = (roomId: string): void => {
    setToggleModal(true);

    const selectedRoom = rooms.find((room) => room.roomId === roomId);
    console.log("RoomId %s", roomId, selectedRoom);

    setSelectedRoom(selectedRoom);
  };

  const onCloseModal = (): void => {
    setToggleModal(false);
  };

  return (
    <>
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

        <div className={styles["rooms-items"]}>
          {rooms.map((room) => (
            <Room
              className={styles["rooms-item"]}
              key={room.id}
              id={room.id}
              roomId={room.roomId}
              title={room.title}
              photos={room.photos}
              accordionTitle={room.accordionTitle}
              accordionContentText={room.accordionContentText}
              buttonPriceText={room.buttonPriceText}
              buttonBookText={room.buttonBookText}
              onBookButtonHandle={onRoomBookButtonClick}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={toggleModal} onClose={onCloseModal}>
        <ModalContent className={styles["room-booking-details-modal"]}>
          <Suspense fallback={<Loader />}>
            <Heading
              tag="h3"
              className={styles["room-booking-details-modal-title"]}
            >
              Booking Details
            </Heading>

            <BookingForm
              className={styles["room-booking-details-modal-booking-form"]}
              roomId={selectedRoom?.roomId}
              roomTitle={selectedRoom?.title}
              roomPrice={selectedRoom?.roomPrice}
              excludeDates={testExcludeDates}
            />
          </Suspense>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Rooms;
