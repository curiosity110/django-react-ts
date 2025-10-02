import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Fresh Store. All rights reserved.</p>
    </footer>
  );
}
