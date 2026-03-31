"use client";

import * as React from "react";
import type { MenuItem } from "@/data/menu";

type Props = {
  categories: { id: string; label: string }[];
  items: MenuItem[];
};

export default function MenuClient({ categories, items }: Props) {
  const [active, setActive] = React.useState<string | "all">("all");

  const filtered =
    active === "all" ? items : items.filter((item) => item.category === active);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`btn ${active === "all" ? "btn-primary" : ""}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActive(category.id)}
            className={`btn ${active === category.id ? "btn-primary" : ""}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {filtered.map((item) => (
          <article
            key={item.code}
            className="rounded-lg border border-ink-100 bg-white p-4 shadow-subtle"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-ink-600">{item.code}</div>
                <h3 className="font-medium">{item.name}</h3>
              </div>
              <div className="text-sm font-medium">${item.price.toFixed(0)}</div>
            </div>
            <p className="mt-2 text-sm text-ink-700">Ingredients: {item.ingredients}</p>
            {item.sizeNote ? (
              <p className="mt-1 text-xs text-ink-600">{item.sizeNote}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
