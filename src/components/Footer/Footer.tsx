import cn from "classnames";

import styles from "./Footer.module.css";

interface IFooterProps {
  className?: string;
}

const Footer = ({ className }: IFooterProps): JSX.Element => {
  return (
    <footer className={cn(styles["footer"], className)}>
      test
    </footer>
  );
};

export default Footer;
