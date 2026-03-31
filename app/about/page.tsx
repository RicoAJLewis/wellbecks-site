import type { Metadata } from "next";

export const metadata: Metadata = { title: "About WELLBECKS" };

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container-narrow prose-compact">
        <h1 className="section-heading">About WELLBECKS</h1>
        <p className="section-sub">Cold-pressed in Barbados. Straightforward recipes. No pasteurisation, preservatives or added sugar.</p>
        <div className="mt-6 space-y-5 text-ink-800">
          <p>
            WELLBECKS makes premium cold‑pressed juice using fresh produce sourced in Barbados and beyond. We press gently with a
            hydraulic press—no high‑speed blades or heat—so your juice tastes clean and stays fresher for longer.
          </p>
          <h2 className="font-display text-xl">What is cold‑pressed juice?</h2>
          <p>
            A hydraulic press extracts juice at very high pressure between stainless steel plates. This breaks down plant cell
            walls, releasing maximum liquid with minimal heat and oxidation. The result: more flavour and a vibrant, natural
            colour profile.
          </p>
          <h2 className="font-display text-xl">Why it matters</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Minimises heat exposure and oxidation</li>
            <li>Delivers a clean, bright taste</li>
            <li>Lets you enjoy a wider variety of produce, conveniently</li>
          </ul>
          <h2 className="font-display text-xl">What makes WELLBECKS different</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Raw and unprocessed—never pasteurised</li>
            <li>Balanced recipes designed for everyday drinking</li>
            <li>Pressed fresh to order with next‑day delivery across the island</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
