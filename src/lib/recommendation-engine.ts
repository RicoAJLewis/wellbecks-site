import {
  getCategoryLabel,
  menu,
  type MenuItem,
  type RecommendationTag,
} from "@/data/menu";

type IntentProfile = {
  id: string;
  label: string;
  keywords: string[];
  preferredTags: RecommendationTag[];
  preferredIngredients: string[];
  preferredCategories?: MenuItem["category"][];
  description: string;
};

export type RecommendationResult = {
  code: string;
  name: string;
  category: string;
  ingredients: string;
  price: number;
  why: string;
};

export type RecommendationResponse = {
  query: string;
  primary: RecommendationResult | null;
  alternatives: RecommendationResult[];
  disclaimer: string;
};

const intentProfiles: IntentProfile[] = [
  {
    id: "comfort",
    label: "comfort",
    keywords: [
      "cold",
      "under the weather",
      "sore throat",
      "run down",
      "sniffly",
      "flu-ish",
      "warming",
    ],
    preferredTags: ["anti-inflammatory", "ginger", "citrus", "comforting", "warming"],
    preferredIngredients: ["ginger", "lemon", "turmeric", "lime", "honey"],
    preferredCategories: ["orange", "shots"],
    description: "a warming, bright profile",
  },
  {
    id: "hydration",
    label: "hydration",
    keywords: ["hydration", "hydrating", "hydrate", "refreshing", "heat", "hot", "thirsty", "cooling"],
    preferredTags: ["hydration", "refreshing", "light", "mint"],
    preferredIngredients: ["coconut water", "watermelon", "cucumber", "aloe vera gel", "mint", "lime"],
    preferredCategories: ["green", "orange", "red", "fresh"],
    description: "a cooling, easy-drinking option",
  },
  {
    id: "energy",
    label: "energy",
    keywords: ["energy", "energized", "boost", "tired", "pick me up", "morning"],
    preferredTags: ["energy", "ginger", "citrus"],
    preferredIngredients: ["beetroot", "carrot", "ginger", "orange", "lemon"],
    preferredCategories: ["red", "orange", "shots"],
    description: "a brighter, more vibrant pick",
  },
  {
    id: "digestion",
    label: "digestion",
    keywords: ["digestion", "digest", "digestive", "stomach", "bloating", "settled", "light on my stomach"],
    preferredTags: ["digestion", "mint", "ginger", "light"],
    preferredIngredients: ["mint", "ginger", "pineapple", "coconut water"],
    preferredCategories: ["shots", "green", "orange"],
    description: "a lighter option built around mint and ginger",
  },
  {
    id: "anti-inflammatory",
    label: "anti-inflammatory",
    keywords: ["anti inflammatory", "anti-inflammatory", "inflammation", "recovery", "turmeric shot"],
    preferredTags: ["anti-inflammatory", "ginger", "warming"],
    preferredIngredients: ["turmeric", "ginger", "black pepper", "lemon"],
    preferredCategories: ["shots", "orange", "green"],
    description: "ingredients commonly associated with a warming reset",
  },
  {
    id: "light",
    label: "light",
    keywords: ["light", "cleanse", "reset", "green", "simple", "lighter"],
    preferredTags: ["light", "cleanse", "refreshing", "vegetable-forward"],
    preferredIngredients: ["cucumber", "lemon", "green apple", "celery", "spinach"],
    preferredCategories: ["green", "cleanses", "orange"],
    description: "a cleaner, lighter profile",
  },
  {
    id: "citrus",
    label: "citrus",
    keywords: ["citrus", "citrusy", "orange", "lemon", "lime", "zesty"],
    preferredTags: ["citrus", "refreshing", "light"],
    preferredIngredients: ["orange", "lemon", "lime", "grapefruit"],
    preferredCategories: ["orange", "fresh", "green"],
    description: "a bright citrus-led profile",
  },
  {
    id: "ginger",
    label: "ginger",
    keywords: ["ginger", "spicy", "warming"],
    preferredTags: ["ginger", "warming", "comforting"],
    preferredIngredients: ["ginger"],
    preferredCategories: ["orange", "shots", "green", "red"],
    description: "a ginger-forward option",
  },
];

const fallbackCodes = ["G3", "O2", "G7"];
const disclaimer =
  "Recommendations are based on menu ingredients and general wellness preferences, not medical advice.";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function splitTokens(value: string) {
  return normalize(value).split(" ").filter(Boolean);
}

function getIngredientTokens(item: MenuItem) {
  return splitTokens(item.ingredients);
}

function getNameTokens(item: MenuItem) {
  return splitTokens(`${item.code} ${item.name}`);
}

function getMatchingProfiles(query: string) {
  const normalized = normalize(query);
  const directMatches = intentProfiles.filter((profile) =>
    profile.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (directMatches.length > 0) {
    return directMatches;
  }

  const tokenMatches = intentProfiles.filter((profile) =>
    profile.preferredIngredients.some((ingredient) => normalized.includes(ingredient)),
  );

  return tokenMatches.length > 0 ? tokenMatches : [intentProfiles.find((profile) => profile.id === "light")!];
}

function buildWhy(
  item: MenuItem,
  matchedProfiles: IntentProfile[],
  matchedTags: RecommendationTag[],
  matchedIngredients: string[],
) {
  const ingredientCopy = matchedIngredients.slice(0, 3).join(", ");

  if (ingredientCopy) {
    return `Includes ${ingredientCopy}, ingredients often chosen for ${matchedProfiles[0].description}.`;
  }

  if (matchedTags.length > 0) {
    return `A good menu option for ${matchedProfiles[0].label} because it leans ${matchedTags
      .slice(0, 2)
      .join(" and ")}.`;
  }

  return "A balanced menu option based on the ingredients in this blend.";
}

function scoreItem(item: MenuItem, query: string, profiles: IntentProfile[]) {
  const normalizedQuery = normalize(query);
  const queryTokens = splitTokens(query);
  const ingredientTokens = getIngredientTokens(item);
  const nameTokens = getNameTokens(item);
  let score = 0;
  const matchedTags: RecommendationTag[] = [];
  const matchedIngredients = new Set<string>();

  for (const profile of profiles) {
    for (const tag of profile.preferredTags) {
      if (item.recommendationTags.includes(tag)) {
        score += 4;
        matchedTags.push(tag);
      }
    }

    for (const ingredient of profile.preferredIngredients) {
      if (normalize(item.ingredients).includes(ingredient)) {
        score += 3;
        matchedIngredients.add(ingredient);
      }
    }

    if (profile.preferredCategories?.includes(item.category)) {
      score += 2;
    }
  }

  for (const token of queryTokens) {
    if (ingredientTokens.includes(token) || nameTokens.includes(token)) {
      score += 2;
      matchedIngredients.add(token);
    }
  }

  if (normalizedQuery.includes(normalize(item.name)) || normalizedQuery.includes(item.code.toLowerCase())) {
    score += 8;
  }

  return {
    item,
    score,
    matchedTags: [...new Set(matchedTags)],
    matchedIngredients: [...matchedIngredients],
  };
}

function toResult(
  item: MenuItem,
  matchedProfiles: IntentProfile[],
  matchedTags: RecommendationTag[],
  matchedIngredients: string[],
): RecommendationResult {
  return {
    code: item.code,
    name: item.name,
    category: getCategoryLabel(item.category),
    ingredients: item.ingredients,
    price: item.price,
    why: buildWhy(item, matchedProfiles, matchedTags, matchedIngredients),
  };
}

export function recommendBeverages(query: string, items: MenuItem[] = menu): RecommendationResponse {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return {
      query: "",
      primary: null,
      alternatives: [],
      disclaimer,
    };
  }

  const matchedProfiles = getMatchingProfiles(cleanedQuery);
  const ranked = items
    .map((item) => scoreItem(item, cleanedQuery, matchedProfiles))
    .sort((left, right) => right.score - left.score || left.item.price - right.item.price);

  const topMatches = ranked.filter((entry) => entry.score > 0).slice(0, 3);
  const fallbackMatches = fallbackCodes
    .map((code) => ranked.find((entry) => entry.item.code === code))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const selected = topMatches.length > 0 ? topMatches : fallbackMatches;

  const [primary, ...alternatives] = selected;

  return {
    query: cleanedQuery,
    primary: primary
      ? toResult(primary.item, matchedProfiles, primary.matchedTags, primary.matchedIngredients)
      : null,
    alternatives: alternatives
      .slice(0, 2)
      .map((entry) =>
        toResult(entry.item, matchedProfiles, entry.matchedTags, entry.matchedIngredients),
      ),
    disclaimer,
  };
}

