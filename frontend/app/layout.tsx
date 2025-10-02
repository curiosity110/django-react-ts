import type { Metadata } from "next";
import "@/styles/globals.css";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Limited Charm Boutique",
  description:
    "Limited edition jewelry boutique crafted in Skopje. Discover radiant earrings, rings and necklaces made to shine on repeat."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
