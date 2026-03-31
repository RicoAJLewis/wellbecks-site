import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import HomepageRecommendationLink from "@/components/HomepageRecommendationLink";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-narrow grid md:grid-cols-2 gap-10 items-center py-16 md:py-20">
          <div>
            <h1 className="font-display text-3xl md:text-5xl tracking-tight">Cold-pressed juice, made in Barbados.</h1>
            <p className="mt-4 text-ink-700 max-w-prose">
              Raw, unprocessed and delivered to your door. Balanced recipes crafted from real produce—pressed gently to
              preserve nutrients and natural flavour.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/menu" className="btn btn-accent">View Menu</Link>
              <a href={`tel:${site.phoneHref}`} className="btn" aria-label="Call to order">Order by Phone</a>
              <a href={site.whatsappHref} className="btn" aria-label="WhatsApp to order">Order on WhatsApp</a>
            </div>
            <div className="mt-6 text-sm text-ink-600">Cold-pressed • Raw & unprocessed • Next-day delivery</div>
            <HomepageRecommendationLink />
          </div>
          <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-xl overflow-hidden shadow-subtle">
            <Image src="/images/hero.jpg" alt="Bottles of WELLBECKS cold-pressed juice" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-100">
        <div className="container-narrow">
          <div className="section-heading">Featured</div>
          <p className="section-sub">Customer favourites pressed fresh each morning.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { code: "G1", name: "Healthy Green", img: "/images/green.jpg" },
              { code: "O2", name: "Citrus Cooler", img: "/images/citrus.jpg" },
              { code: "R1", name: "Beet Energy", img: "/images/red.jpg" },
            ].map((p) => (
              <Link key={p.code} href="/menu" className="group block">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-subtle">
                  <Image src={p.img} alt="" fill className="object-cover transition-transform group-hover:scale-[1.02]" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="font-medium">{p.name}</div>
                  <span className="badge">{p.code}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-100">
        <div className="container-narrow grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="section-heading">Why cold‑pressed</div>
            <p className="section-sub">
              We use a hydraulic press instead of high-speed blades. It extracts more juice at a lower temperature for a
              cleaner taste and less oxidation—so your juice stays fresh longer.
            </p>
            <ul className="mt-6 space-y-3 text-ink-700">
              <li>• Minimal heat, maximum flavour</li>
              <li>• No additives, syrups or concentrates</li>
              <li>• Pressed to order, delivered chilled</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-subtle">
            <Image src="/images/press.jpg" alt="Fresh produce prepared for pressing" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-100">
        <div className="container-narrow grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="section-heading">1‑Day Juice Cleanse</div>
            <p className="section-sub">A simple, guided reset—seven juices across your day with hydrating support.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/cleanse" className="btn">View Program</Link>
              <Link href="/menu" className="btn btn-accent">Order Cleanse</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-subtle">
            <Image src="/images/cleanse.jpg" alt="Cleanse lineup on a table" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section border-t border-ink-100">
        <div className="container-narrow">
          <div className="section-heading">Ordering is simple</div>
          <p className="section-sub">{site.delivery.orderCutoff}. {site.delivery.fee}.</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-3 text-sm">
            <li className="bg-white p-5 rounded-lg shadow-subtle border border-ink-100">
              <div className="font-medium">1. Choose your juices</div>
              <p className="mt-2 text-ink-700">Browse the menu and note the codes and bottle size you prefer.</p>
            </li>
            <li className="bg-white p-5 rounded-lg shadow-subtle border border-ink-100">
              <div className="font-medium">2. Send your order</div>
              <p className="mt-2 text-ink-700">Call, WhatsApp or email your list. We confirm delivery time.</p>
            </li>
            <li className="bg-white p-5 rounded-lg shadow-subtle border border-ink-100">
              <div className="font-medium">3. Delivered chilled</div>
              <p className="mt-2 text-ink-700">We press fresh and deliver the next day. Keep refrigerated.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
