"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import styles from "./header.module.css";

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        Fresh Store
      </Link>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.navLink}>
          Products
        </Link>
        <Link href="/cart" className={styles.navLink}>
          Cart {itemCount > 0 ? `(${itemCount})` : ""}
        </Link>
      </nav>
    </header>
  );
}
