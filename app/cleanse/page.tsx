import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "1 Day Cleanse" };

const steps = [
  { time: "On waking", item: "Warm Lemon Water" },
  { time: "+1 hr", item: "G3 — Golden Green" },
  { time: "+2 hrs", item: "G1 — Healthy Green" },
  { time: "Lunchtime", item: "R1 — Beet Energy" },
  { time: "+2 hrs", item: "G1 — Healthy Green" },
  { time: "5pm", item: "O1 — Daily Cleanse or O2 — Citrus Cooler" },
  { time: "7pm", item: "Juice of your choice" },
  { time: "Before bed", item: "Warm lemon water or herbal tea" },
];

export default function CleansePage() {
  return (
    <section className="section">
      <div className="container-narrow grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="section-heading">1-Day Juice Cleanse</h1>
          <p className="section-sub">$90. Option to add extra days. Delivered the day before you start.</p>
          <ol className="mt-6 space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="bg-white border border-ink-100 rounded-lg p-4 shadow-subtle">
                <div className="text-xs uppercase tracking-wide text-ink-600">{s.time}</div>
                <div className="font-medium mt-1">{s.item}</div>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-sm text-ink-700">
            Hydrate between juices. Light movement is fine. Pause caffeine and alcohol during the program.
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-subtle">
          <Image src="/images/cleanse.jpg" alt="Cleanse bottles arranged for the day" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
