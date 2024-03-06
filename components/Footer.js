import styles from "@/styles/footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <h1>Steve Demos</h1>
        <ul>
          <Link href="/#home">
            <li>Home</li>
          </Link>
          <Link href="/#about">
            <li>About</li>
          </Link>
          <Link href="/Properties">
            <li>Properties</li>
          </Link>
          <Link href="/#testimonals">
            <li>Testimonals</li>
          </Link>
          <Link href="/#contact">
            <li>Contact</li>
          </Link>
        </ul>
        <p>
          all rights reserved by the author <span>Steve Demos</span>
        </p>
      </footer>
    </>
  );
}

export default Footer;
