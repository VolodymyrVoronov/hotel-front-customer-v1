import { memo } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import cn from "classnames";

import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  photos: {
    original: string;
    thumbnail: string;
  } extends ReactImageGalleryItem
    ? Array<ReactImageGalleryItem>
    : never;

  className?: string;
}

const ImageGalleryComponent = memo(
  ({
    photos,
    className,

    ...props
  }: ImageGalleryProps): JSX.Element => {
    return (
      <ImageGallery
        additionalClass={cn(styles["image-gallery"], className)}
        items={photos}
        showBullets
        lazyLoad
        showThumbnails={false}
        showPlayButton={false}
        showFullscreenButton={false}
        disableKeyDown
        {...props}
      />
    );
  }
);

export default ImageGalleryComponent;
