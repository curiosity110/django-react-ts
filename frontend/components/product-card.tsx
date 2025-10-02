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
      <div className={styles.heading}>
        <h2>{product.title}</h2>
        <p className={styles.price}>{formatCurrency(product.price_cents)}</p>
      </div>
      {product.description ? (
        <p className={styles.description}>{product.description}</p>
      ) : null}
      <div className={styles.actions}>
        <Link href={`/products/${product.slug}`} className={styles.link}>
          View details
        </Link>
        <button type="button" className={styles.button} onClick={handleAdd}>
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
