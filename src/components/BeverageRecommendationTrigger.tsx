"use client";

type BeverageRecommendationTriggerProps = {
  onOpen: () => void;
  helperVisible: boolean;
  onDismissHelper: () => void;
  animateIn: boolean;
};

export default function BeverageRecommendationTrigger({
  onOpen,
  helperVisible,
  onDismissHelper,
  animateIn,
}: BeverageRecommendationTriggerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      <div
        className={`transition-all duration-500 ${
          helperVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div className="flex max-w-[15rem] items-start gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-700 shadow-subtle">
          <p>Need help choosing?</p>
          <button
            type="button"
            onClick={onDismissHelper}
            className="text-ink-500 transition-colors hover:text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
            aria-label="Dismiss recommendation helper"
          >
            x
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className={`inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-3 text-sm font-medium text-ink-900 shadow-subtle transition-colors hover:bg-sand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 ${
          animateIn ? "animate-recommendation-enter" : ""
        }`}
        aria-haspopup="dialog"
        aria-label="Open beverage recommendation"
      >
        <span className="h-2 w-2 rounded-full bg-leaf-700" aria-hidden="true" />
        Find your drink
      </button>
    </div>
  );
}

