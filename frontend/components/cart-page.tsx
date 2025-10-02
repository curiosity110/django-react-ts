"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { createOrder } from "@/lib/api";
import { formatCurrency } from "@/lib/util";
import styles from "./cart-page.module.css";

export function CartPage() {
  const { items, hydrated, updateItem, removeItem, totalCents, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const hasItems = hydrated && items.length > 0;

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    note: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasItems || submitting) {
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload = {
      customer_name: form.customer_name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      note: form.note.trim(),
      items: items.map((item) => ({ product: item.id, quantity: item.quantity }))
    };

    if (!payload.customer_name || !payload.phone || !payload.address) {
      setError("Please fill in your name, phone and delivery address before submitting.");
      setSubmitting(false);
      return;
    }

    const response = await createOrder(payload);

    if (!response.ok) {
      setError(response.error ?? "We could not submit your order.");
      setSubmitting(false);
      return;
    }

    clear();
    setSuccess("Thank you! Your order has been submitted.");
    setForm({ customer_name: "", phone: "", address: "", note: "" });
    setSubmitting(false);
  };

  const cartTotal = useMemo(() => formatCurrency(totalCents), [totalCents]);

  return (
    <div className={styles.wrapper}>
      <h1>Your cart</h1>
      {!hydrated ? (
        <p>Loading cart…</p>
      ) : hasItems ? (
        <div className={styles.layout}>
          <section className={styles.items}>
            <ul>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>{formatCurrency(item.price_cents)}</p>
                  </div>
                  <div className={styles.itemActions}>
                    <label>
                      Qty
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(item.id, Number(event.target.value) || item.quantity)
                        }
                      />
                    </label>
                    <button type="button" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className={styles.total}>Total: {cartTotal}</p>
          </section>
          <section className={styles.formSection}>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Full name
                <input
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </label>
              <label>
                Delivery address
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </label>
              <label>
                Additional note
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows={3}
                  disabled={submitting}
                />
              </label>
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Place order"}
              </button>
            </form>
            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}
            {success ? <p className={styles.success}>{success}</p> : null}
          </section>
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link href="/">Browse products</Link>
        </div>
      )}
    </div>
  );
}
