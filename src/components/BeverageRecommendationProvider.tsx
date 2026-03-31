"use client";

import * as React from "react";
import BeverageRecommendationModal from "@/components/BeverageRecommendationModal";
import BeverageRecommendationTrigger from "@/components/BeverageRecommendationTrigger";
import type { RecommendationResponse } from "@/lib/recommendation-engine";
import { getBeverageRecommendations } from "@/lib/recommendation-service";

const suggestionExamples = [
  "I need hydration",
  "I want energy",
  "I want something soothing",
  "I want something refreshing",
];

const HELPER_SESSION_KEY = "wellbecksRecommendationHelperSeen";

type BeverageRecommendationContextValue = {
  openRecommendation: () => void;
};

const BeverageRecommendationContext =
  React.createContext<BeverageRecommendationContextValue | null>(null);

export function useBeverageRecommendation() {
  const context = React.useContext(BeverageRecommendationContext);

  if (!context) {
    throw new Error(
      "useBeverageRecommendation must be used within BeverageRecommendationProvider",
    );
  }

  return context;
}

export default function BeverageRecommendationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<RecommendationResponse | null>(null);
  const [emptyMessage, setEmptyMessage] = React.useState<string | null>(null);
  const [helperVisible, setHelperVisible] = React.useState(false);
  const [animateTrigger, setAnimateTrigger] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const helperSeen = window.sessionStorage.getItem(HELPER_SESSION_KEY) === "true";

    if (helperSeen) {
      return;
    }

    setAnimateTrigger(true);

    const showTimer = window.setTimeout(() => {
      setHelperVisible(true);
    }, 1600);

    const hideTimer = window.setTimeout(() => {
      setHelperVisible(false);
      window.sessionStorage.setItem(HELPER_SESSION_KEY, "true");
    }, 7600);

    const animationTimer = window.setTimeout(() => {
      setAnimateTrigger(false);
    }, 1400);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(animationTimer);
    };
  }, []);

  const openRecommendation = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const dismissHelper = React.useCallback(() => {
    setHelperVisible(false);

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(HELPER_SESSION_KEY, "true");
    }
  }, []);

  const handleSubmit = React.useCallback(async (nextQuery?: string) => {
    const value = (nextQuery ?? query).trim();
    setQuery(nextQuery ?? query);

    if (!value) {
      setEmptyMessage("Tell us what you are in the mood for and we will suggest a good fit.");
      setResult(null);
      return;
    }

    setEmptyMessage(null);
    setIsLoading(true);

    try {
      const response = await getBeverageRecommendations(value);
      setResult(response);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <BeverageRecommendationContext.Provider value={{ openRecommendation }}>
      {children}
      <BeverageRecommendationTrigger
        onOpen={openRecommendation}
        helperVisible={helperVisible}
        onDismissHelper={dismissHelper}
        animateIn={animateTrigger}
      />
      <BeverageRecommendationModal
        open={isOpen}
        query={query}
        onQueryChange={setQuery}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        result={result}
        emptyMessage={emptyMessage}
        suggestions={suggestionExamples}
      />
    </BeverageRecommendationContext.Provider>
  );
}

