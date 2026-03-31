import { menu } from "@/data/menu";
import {
  recommendBeverages,
  type RecommendationResponse,
} from "@/lib/recommendation-engine";

export async function getBeverageRecommendations(
  query: string,
): Promise<RecommendationResponse> {
  // This wrapper is the handoff point for a future API integration.
  // Replace the local engine call below with a fetch to `/api/recommend`
  // or an external endpoint and keep the modal UI unchanged.
  return Promise.resolve(recommendBeverages(query, menu));
}

