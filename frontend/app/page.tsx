import Link from "next/link";
import { Suspense } from "react";
import { ProductList } from "@/components/product-list";
import { ProductsFallback } from "@/components/products-fallback";
import styles from "./page.module.css";

const featureHighlights = [
  {
    title: "Handpicked Materials",
    description:
      "Each accessory is crafted from premium hypoallergenic metals and stones chosen for their radiance and durability."
  },
  {
    title: "Limited Edition Drops",
    description:
      "We design in micro collections so every piece feels exclusive. Once a style sells out, it is gone for good."
  },
  {
    title: "Wrapped With Care",
    description:
      "From our studio to your doorstep, every order arrives in sustainable packaging ready for gifting."
  }
];

const storyPoints = [
  {
    title: "Authentically Crafted",
    description:
      "Inspired by the glow of golden hour, Limited Charm celebrates the women who turn ordinary days into occasions."
  },
  {
    title: "Designed in Skopje",
    description:
      "Our atelier is rooted in the Balkans, blending contemporary silhouettes with timeless elegance."
  },
  {
    title: "Created to Layer",
    description:
      "Mix delicate chains with statement earrings and curated ring stacks to tell your own story."
  }
];

const testimonials = [
  {
    quote:
      "The quality is unreal. I have worn my Limited Charm hoops nonstop for months and they still sparkle like new!",
    name: "Ana, Ohrid"
  },
  {
    quote:
      "Fast delivery and such thoughtful packaging. It felt like opening a present from a best friend.",
    name: "Milena, Bitola"
  },
  {
    quote:
      "I ordered matching bracelets for my bridesmaids and everyone keeps asking where I found them.",
    name: "Elena, Skopje"
  }
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Limited Charm Boutique</p>
          <h1 className={styles.heroTitle}>Elegance for every unforgettable moment.</h1>
          <p className={styles.heroDescription}>
            Discover minimal, radiant jewelry that elevates your everyday look. Explore our curated edit of rings,
            necklaces and earrings made to be layered, loved and worn on repeat.
          </p>
          <div className={styles.heroActions}>
            <Link href="#products" className={styles.primaryAction}>
              Shop the collection
            </Link>
            <Link href="#contact" className={styles.secondaryAction}>
              Book a styling session
            </Link>
          </div>
          <ul className={styles.heroStats}>
            <li>
              <span>48h</span>
              Express delivery nationwide
            </li>
            <li>
              <span>15k+</span>
              Happy Limited Charm customers
            </li>
            <li>
              <span>925</span>
              Sterling silver base metals
            </li>
          </ul>
        </div>
        <div className={styles.heroPreview}>
          <div className={styles.previewCard}>
            <p className={styles.previewTitle}>Autumn Glow Capsule</p>
            <p className={styles.previewSubtitle}>Now available online</p>
            <p className={styles.previewCopy}>
              Shimmering textures, organic silhouettes and luminous pearls designed to capture the light and turn heads.
            </p>
            <Link href="#products" className={styles.previewLink}>
              View capsule →
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Why you will love Limited Charm</p>
          <h2>Designed to delight from the very first unboxing.</h2>
          <p>
            From premium materials to artfully considered packaging, every detail is intentional. We believe jewelry should
            feel as special as the person who wears it.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {featureHighlights.map((feature) => (
            <article key={feature.title} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className={styles.productsSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Signature pieces</p>
          <h2>Curated jewelry, released in limited quantities.</h2>
          <p>
            Browse the latest drop and secure your favorites before they sell out. Every piece is produced in small batches
            to keep your look as unique as you are.
          </p>
        </div>
        <Suspense fallback={<ProductsFallback message="Loading our newest arrivals…" />}> 
          <ProductList />
        </Suspense>
      </section>

      <section id="story" className={styles.story}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Our story</p>
          <h2>A modern jewelry house built on timeless values.</h2>
          <p>
            Limited Charm is a celebration of Macedonian craftsmanship. We reimagine heirloom silhouettes with a modern
            twist—sleek, versatile and effortlessly glamorous.
          </p>
        </div>
        <div className={styles.storyGrid}>
          {storyPoints.map((point) => (
            <article key={point.title} className={styles.storyCard}>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.promise}>
        <div className={styles.promiseContent}>
          <h2>Complimentary care &amp; lifetime sparkle.</h2>
          <p>
            Enjoy free cleanings, hassle-free exchanges within 30 days and styling support for every purchase. Our concierge
            team is here to make sure your jewelry looks flawless year after year.
          </p>
          <Link href="#contact" className={styles.promiseCta}>
            Speak with concierge
          </Link>
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Community love</p>
          <h2>Words from our Limited Charm muses.</h2>
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className={styles.testimonialCard}>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>— {testimonial.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.contactCard}>
          <h2>Visit the studio or get in touch.</h2>
          <p>
            DM us on Instagram @limitedcharm or write to hello@limitedcharm.com for bespoke styling, bridal inquiries or
            wholesale collaborations.
          </p>
          <div className={styles.contactDetails}>
            <p>
              <strong>Studio:</strong> Orce Nikolov 75, Skopje
            </p>
            <p>
              <strong>Hours:</strong> Tue – Sat, 11:00 – 18:30
            </p>
            <p>
              <strong>Phone:</strong> +389 70 123 456
            </p>
          </div>
          <Link href="tel:+38970123456" className={styles.contactButton}>
            Call us now
          </Link>
        </div>
      </section>
    </div>
  );
}
