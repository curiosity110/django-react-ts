import { Suspense } from "react";
import { ProductList } from "@/components/product-list";
import { ProductsFallback } from "@/components/products-fallback";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Products</h1>
      <Suspense fallback={<ProductsFallback message="Loading products…" /> }>
        <ProductList />
      </Suspense>
    </div>
  );
}
