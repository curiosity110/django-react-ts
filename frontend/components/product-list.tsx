import { getProducts } from "@/lib/api";
import { ProductsFallback } from "@/components/products-fallback";
import { ProductCard } from "@/components/product-card";

export async function ProductList() {
  const { data, error } = await getProducts();

  if (error) {
    return <ProductsFallback message={error} isError />;
  }

  if (!data.length) {
    return <ProductsFallback message="No products have been published yet." />;
  }

  return (
    <div className="product-grid">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </div>
  );
}
