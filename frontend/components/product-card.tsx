"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart-context";
import styles from "./product-card.module.css";
import { formatCurrency } from "@/lib/util";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className={styles.card}>
      <div className={styles.ribbon}>Limited</div>
      <header className={styles.header}>
        <h3>{product.title}</h3>
        <p className={styles.price}>{formatCurrency(product.price_cents)}</p>
      </header>
      {product.description ? (
        <p className={styles.description}>{product.description}</p>
      ) : (
        <p className={styles.description}>
          Delicate, versatile and made to shine on repeat. Crafted in micro batches for the Limited Charm collection.
        </p>
      )}
      <div className={styles.actions}>
        <Link href={`/products/${product.slug}`} className={styles.secondaryAction}>
          View details
        </Link>
        <button type="button" className={styles.primaryAction} onClick={handleAdd}>
          {added ? "Added" : "Add to bag"}
        </button>
      </div>
    </article>
  );
}
