import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="section-heading">Contact & Order</h1>
        <p className="section-sub">We press fresh daily and deliver across Barbados.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
          <a href={`tel:${site.phoneHref}`} className="block bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <div className="font-medium">Call</div>
            <div className="mt-2 text-ink-700">{site.phone}</div>
          </a>
          <a href={site.whatsappHref} className="block bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <div className="font-medium">WhatsApp</div>
            <div className="mt-2 text-ink-700">Message us to order</div>
          </a>
          <a href={`mailto:${site.email}`} className="block bg-white p-6 rounded-lg border border-ink-100 shadow-subtle">
            <div className="font-medium">Email</div>
            <div className="mt-2 text-ink-700">{site.email}</div>
          </a>
        </div>
      </div>
    </section>
  );
}
