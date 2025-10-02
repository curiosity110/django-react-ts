"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart-context";
import { formatCurrency } from "@/lib/util";
import styles from "./product-detail.module.css";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItem(product, quantity);
    setConfirmation("Added to cart!");
    setTimeout(() => setConfirmation(""), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.backLink}>
        ← Back to products
      </Link>
      <article className={styles.card}>
        <header className={styles.header}>
          <h1>{product.title}</h1>
          <p className={styles.price}>{formatCurrency(product.price_cents)}</p>
        </header>
        {product.description ? (
          <p className={styles.description}>{product.description}</p>
        ) : (
          <p className={styles.description}>
            This product does not have a detailed description yet, but it is available for
            purchase.
          </p>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Quantity
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value) || 1)}
            />
          </label>
          <button type="submit">Add to cart</button>
        </form>
        {confirmation ? <p className={styles.confirmation}>{confirmation}</p> : null}
      </article>
    </div>
  );
}
