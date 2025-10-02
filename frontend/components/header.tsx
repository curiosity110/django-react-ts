"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import styles from "./header.module.css";

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Limited Charm
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/#products" className={styles.navLink}>
            Collection
          </Link>
          <Link href="/#story" className={styles.navLink}>
            Story
          </Link>
          <Link href="/#contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
        <Link href="/cart" className={styles.cartButton}>
          Cart {itemCount > 0 ? `(${itemCount})` : ""}
        </Link>
      </div>
    </header>
  );
}
