"use client";

import Link from "next/link";
import * as React from "react";
import type { RecommendationResponse } from "@/lib/recommendation-engine";

type BeverageRecommendationModalProps = {
  open: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (value?: string) => void;
  isLoading: boolean;
  result: RecommendationResponse | null;
  emptyMessage: string | null;
  suggestions: string[];
};

export default function BeverageRecommendationModal({
  open,
  query,
  onQueryChange,
  onClose,
  onSubmit,
  isLoading,
  result,
  emptyMessage,
  suggestions,
}: BeverageRecommendationModalProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink-900/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close recommendation modal"
      />
      <div className="flex min-h-full items-end justify-center p-4 md:items-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="beverage-recommendation-title"
          className={`relative w-full max-w-2xl rounded-2xl border border-ink-100 bg-sand-50 shadow-subtle transition-all duration-200 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="rounded-t-2xl border-b border-ink-100 bg-white px-5 py-4 md:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-600">
                  Beverage Recommendation
                </p>
                <h2
                  id="beverage-recommendation-title"
                  className="mt-2 font-display text-2xl tracking-tight"
                >
                  Find a WELLBECKS drink that suits the moment.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-ink-600">
                  Tell us how you want your drink to feel, taste or support your day.
                </p>
              </div>
              <button type="button" className="btn px-3 py-2" onClick={onClose}>
                Close
              </button>
            </div>
          </div>

          <div className="px-5 py-5 md:px-6">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
              }}
            >
              <div>
                <label htmlFor="beverage-recommendation-input" className="sr-only">
                  Describe what you are looking for
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="beverage-recommendation-input"
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="Example: I want something hydrating with ginger"
                    className="w-full rounded-md border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-leaf-400 focus:ring-2 focus:ring-leaf-200"
                  />
                  <button
                    type="submit"
                    className="btn btn-accent min-w-[9rem]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Finding..." : "Recommend"}
                  </button>
                </div>
                {emptyMessage ? (
                  <p className="mt-2 text-sm text-beet-700">{emptyMessage}</p>
                ) : null}
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.12em] text-ink-500">
                  Try a prompt
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-full border border-ink-100 bg-white px-3 py-1.5 text-xs text-ink-700 transition-colors hover:bg-sand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
                      onClick={() => onSubmit(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            <div className="mt-6 rounded-xl border border-ink-100 bg-white p-4 md:p-5">
              {!result?.primary && !isLoading ? (
                <div className="space-y-2">
                  <h3 className="font-medium text-ink-900">What to expect</h3>
                  <p className="text-sm text-ink-600">
                    You will get one primary recommendation and up to two thoughtful alternatives
                    from the current WELLBECKS menu.
                  </p>
                </div>
              ) : null}

              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 w-36 animate-pulse rounded bg-sand-200" />
                  <div className="h-16 animate-pulse rounded-lg bg-sand-100" />
                  <div className="h-16 animate-pulse rounded-lg bg-sand-100" />
                </div>
              ) : null}

              {result?.primary ? (
                <div className="space-y-5">
                  <div className="rounded-xl border border-ink-100 bg-sand-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-ink-600">
                      Primary recommendation
                    </p>
                    <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl tracking-tight text-ink-900">
                          {result.primary.name}
                        </h3>
                        <p className="mt-1 text-sm text-ink-600">
                          {result.primary.code} · {result.primary.category}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-ink-900">
                        ${result.primary.price.toFixed(0)}
                      </p>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-ink-700">
                      <div>
                        <p className="font-medium text-ink-900">Why this matches</p>
                        <p className="mt-1">{result.primary.why}</p>
                      </div>
                      <div>
                        <p className="font-medium text-ink-900">Ingredients</p>
                        <p className="mt-1">{result.primary.ingredients}</p>
                      </div>
                    </div>
                  </div>

                  {result.alternatives.length > 0 ? (
                    <div>
                      <p className="font-medium text-ink-900">You may also like</p>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        {result.alternatives.map((alternative) => (
                          <article
                            key={alternative.code}
                            className="rounded-lg border border-ink-100 p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="font-medium text-ink-900">
                                  {alternative.name}
                                </h4>
                                <p className="mt-1 text-xs uppercase tracking-wide text-ink-600">
                                  {alternative.code} · {alternative.category}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-ink-900">
                                ${alternative.price.toFixed(0)}
                              </p>
                            </div>
                            <p className="mt-3 text-sm text-ink-700">{alternative.why}</p>
                            <p className="mt-3 text-sm text-ink-600">
                              Ingredients: {alternative.ingredients}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-4">
                    <p className="max-w-xl text-xs text-ink-600">{result.disclaimer}</p>
                    <Link href="/menu" className="btn">
                      View full menu
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

