"use client";

import { useBeverageRecommendation } from "@/components/BeverageRecommendationProvider";

export default function HomepageRecommendationLink() {
  const { openRecommendation } = useBeverageRecommendation();

  return (
    <p className="mt-4 text-sm text-ink-600">
      Not sure what to choose?{" "}
      <button
        type="button"
        onClick={openRecommendation}
        className="font-medium text-ink-900 underline decoration-ink-300 underline-offset-4 transition-colors hover:text-leaf-700 hover:decoration-leaf-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
      >
        Try Beverage Recommendation
      </button>
      .
    </p>
  );
}

