import cn from "classnames";

import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

import styles from "./Image.module.css";

interface IImageProps extends LazyLoadImageProps {
  src: string;
  alt: string;
  captionText?: string;
  classNameWrapper?: string;
  className?: string;
}

const Image = ({
  src,
  alt,
  captionText,
  classNameWrapper,
  className,
  ...props
}: IImageProps): JSX.Element => {
  return (
    <div className={cn(styles["image-wrapper"], classNameWrapper)}>
      <LazyLoadImage
        className={cn(styles["image"], className)}
        src={src}
        alt={alt}
        threshold={300}
        effect="opacity"
        {...props}
      />
      <span className={styles["image-caption"]}>{captionText}</span>
    </div>
  );
};

export default Image;
