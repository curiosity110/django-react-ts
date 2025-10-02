import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { ProductDetail } from "@/components/product-detail";
import { ProductsFallback } from "@/components/products-fallback";

interface ProductPageProps {
  params: { slug: string };
}

export const revalidate = 0;

export default async function ProductPage({ params }: ProductPageProps) {
  const result = await getProduct(params.slug);

  if (result.status === 404) {
    notFound();
  }

  if (result.error || !result.data) {
    return (
      <div style={{ padding: "2rem" }}>
        <ProductsFallback message={result.error ?? "Product unavailable."} isError />
        <p style={{ marginTop: "1rem" }}>
          <Link href="/">Back to products</Link>
        </p>
      </div>
    );
  }

  return <ProductDetail product={result.data} />;
}
