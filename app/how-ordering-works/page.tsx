import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "How Ordering Works" };

export default function HowOrderingWorksPage() {
  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="section-heading">How Ordering Works</h1>
        <p className="section-sub">{site.delivery.orderCutoff}. {site.delivery.fee}.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <h2 className="font-display text-xl">Placing an order</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-800 list-disc pl-5">
              <li>Use the juice code and quantity (e.g. G1 x2).</li>
              <li>Include bottle size: 118ml, 355ml, 475ml, 950ml.</li>
              <li>Send by 8PM for next‑day delivery.</li>
              <li>Call: <a className="hover:underline" href="tel:+12462599636">{site.phone}</a></li>
              <li>WhatsApp: <a className="hover:underline" href={site.whatsappHref}>Message us</a></li>
              <li>Email: <a className="hover:underline" href="mailto:peterarthur@live.com">{site.email}</a></li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <h2 className="font-display text-xl">Delivery & packaging</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-800 list-disc pl-5">
              <li>{site.delivery.fee}.</li>
              <li>Most juices delivered in 355ml. Other sizes on request.</li>
              <li>Choose Plastic (standard) or Glass bottles. Refundable deposit of $2/$3 per bottle on glass.</li>
              <li>All juices are best within 4 days. Keep refrigerated.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <h2 className="font-display text-xl">Bespoke & dietary</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-800 list-disc pl-5">
              <li>Bespoke orders available on request.</li>
              <li>We do our best to accommodate allergies and intolerances.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <h2 className="font-display text-xl">Payment options</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-800 list-disc pl-5">
              <li>Cash</li>
              <li>Bank Transfer</li>
              <li>Credit Card</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
