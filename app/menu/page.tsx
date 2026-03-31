import { categories, menu } from "@/data/menu";
import MenuClient from "./menu-client";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="section-heading">Menu</h1>
        <p className="section-sub">Cold-pressed, raw & unprocessed. Choose by category and note the code to order.</p>
        <MenuClient categories={categories} items={menu} />
      </div>
    </section>
  );
}
