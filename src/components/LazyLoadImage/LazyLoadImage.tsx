import {
  LazyLoadImage as LazyLoadImg,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

const LazyLoadImage = ({ ...props }: LazyLoadImageProps): JSX.Element => {
  return <LazyLoadImg {...props} />;
};

export default LazyLoadImage;
