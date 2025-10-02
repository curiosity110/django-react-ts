import Link from "next/link";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>Limited Charm</p>
          <p className={styles.tagline}>Curated jewelry crafted in small batches for luminous everyday moments.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link href="/#products">Shop collection</Link>
            </li>
            <li>
              <Link href="/#story">Our story</Link>
            </li>
            <li>
              <Link href="/cart">Your cart</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Visit us</h3>
          <ul>
            <li>Orce Nikolov 75, Skopje</li>
            <li>Tue – Sat · 11:00 – 18:30</li>
            <li>
              <a href="tel:+38970123456">+389 70 123 456</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Stay in touch</h3>
          <ul>
            <li>
              <a href="mailto:hello@limitedcharm.com">hello@limitedcharm.com</a>
            </li>
            <li>@limitedcharm on Instagram</li>
          </ul>
        </div>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} Limited Charm. All rights reserved.</p>
    </footer>
  );
}
