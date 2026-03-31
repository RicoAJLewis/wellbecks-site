export type CategoryId =
  | "green"
  | "orange"
  | "red"
  | "shots"
  | "cleanses"
  | "fresh";

export type RecommendationTag =
  | "anti-inflammatory"
  | "citrus"
  | "cleanse"
  | "comforting"
  | "digestion"
  | "energy"
  | "ginger"
  | "hydration"
  | "light"
  | "mint"
  | "refreshing"
  | "shot"
  | "vegetable-forward"
  | "warming";

export type MenuItem = {
  code: string;
  name: string;
  price: number;
  ingredients: string;
  category: CategoryId;
  sizeNote?: string;
  recommendationTags: RecommendationTag[];
};

export const categoryLabels: Record<CategoryId, string> = {
  green: "Green Juices",
  orange: "Orange / Yellow Juices",
  red: "Red / Pink Juices",
  shots: "Shots",
  cleanses: "Cleanses",
  fresh: "Freshly Squeezed Fruit",
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: "green", label: categoryLabels.green },
  { id: "orange", label: categoryLabels.orange },
  { id: "red", label: categoryLabels.red },
  { id: "shots", label: categoryLabels.shots },
  { id: "cleanses", label: categoryLabels.cleanses },
  { id: "fresh", label: categoryLabels.fresh },
];

export const menu: MenuItem[] = [
  {
    code: "G1",
    name: "Healthy Green",
    price: 15,
    ingredients: "Green Apple, Kale, Cucumber, Ginger, Celery, Lemon, Dandelion",
    category: "green",
    recommendationTags: ["ginger", "light", "cleanse", "refreshing"],
  },
  {
    code: "G2",
    name: "Anti-Inflam Green",
    price: 15,
    ingredients: "Pineapple, Green Apple, Spinach, Cucumber, Ginger, Celery, Lemon",
    category: "green",
    recommendationTags: ["anti-inflammatory", "ginger", "light", "refreshing"],
  },
  {
    code: "G3",
    name: "Golden Green",
    price: 15,
    ingredients: "Pineapple, Cucumber, Green Apple, Mint",
    category: "green",
    recommendationTags: ["light", "mint", "refreshing", "hydration"],
  },
  {
    code: "G4",
    name: "Very Veggie Green",
    price: 18,
    ingredients: "Cucumber, Romaine, Spinach, Zucchini, Celery, Lemon, Watercress",
    category: "green",
    recommendationTags: ["light", "cleanse", "vegetable-forward"],
  },
  {
    code: "G5",
    name: "Zesty Green",
    price: 15,
    ingredients: "Celery, Lime, Ginger",
    category: "green",
    recommendationTags: ["ginger", "citrus", "light", "refreshing"],
  },
  {
    code: "G6",
    name: "Slim Green",
    price: 15,
    ingredients: "Parsley, Lemon, Cucumber, Spinach",
    category: "green",
    recommendationTags: ["light", "cleanse", "refreshing", "vegetable-forward"],
  },
  {
    code: "G7",
    name: "Rehydrate Green",
    price: 15,
    ingredients: "Aloe Vera Gel, Honeydew, Lime, Coconut Water",
    category: "green",
    recommendationTags: ["hydration", "refreshing", "light", "citrus"],
  },
  {
    code: "O1",
    name: "Daily Cleanse",
    price: 15,
    ingredients: "Apple, Lemon, Ginger, Cayenne Pepper",
    category: "orange",
    recommendationTags: ["cleanse", "light", "ginger", "citrus", "warming"],
  },
  {
    code: "O2",
    name: "Citrus Cooler",
    price: 15,
    ingredients: "Orange, Pineapple, Lime, Ginger, Carrot, Turmeric, Black Pepper",
    category: "orange",
    recommendationTags: ["citrus", "ginger", "anti-inflammatory", "energy", "refreshing"],
  },
  {
    code: "O3",
    name: "Freshly Squeezed",
    price: 18,
    ingredients: "Carrot, Oranges",
    category: "orange",
    recommendationTags: ["citrus", "energy", "refreshing"],
  },
  {
    code: "O4",
    name: "Turmeric Tonic",
    price: 15,
    ingredients: "Coconut Water, Turmeric, Ginger, Lime, Honey",
    category: "orange",
    recommendationTags: ["anti-inflammatory", "ginger", "hydration", "comforting", "warming"],
  },
  {
    code: "O5",
    name: "Cranberry Crush",
    price: 16,
    ingredients: "Orange, Cranberry, Red Apple, Pear, Fennel, Lemon",
    category: "orange",
    recommendationTags: ["citrus", "refreshing", "light"],
  },
  {
    code: "O6",
    name: "Lemonade Refresher",
    price: 15,
    ingredients: "Mint, Lemon, Pear, Green Apple, Ginger, Cucumber, Masala Spice",
    category: "orange",
    recommendationTags: ["refreshing", "mint", "ginger", "citrus", "light"],
  },
  {
    code: "O7",
    name: "Coconut Pine",
    price: 15,
    ingredients: "Bajan coconut water, coconut, pineapple",
    category: "orange",
    recommendationTags: ["hydration", "refreshing", "light"],
  },
  {
    code: "R1",
    name: "Beet Energy",
    price: 15,
    ingredients: "Beetroot, Carrot, Ginger, Red Apple, Lemon, Cucumber",
    category: "red",
    recommendationTags: ["energy", "ginger", "refreshing"],
  },
  {
    code: "R2",
    name: "Watermelon Hydrate",
    price: 15,
    ingredients: "Watermelon, Green Apple, Beetroot, Lime, Fresh Mint, Chili",
    category: "red",
    recommendationTags: ["hydration", "refreshing", "mint", "light"],
  },
  {
    code: "R3",
    name: "VEG8",
    price: 15,
    ingredients:
      "Tomato, Carrot, Celery, Romaine Lettuce, Spinach, Parsley, Watercress, Beetroot, Garlic",
    category: "red",
    recommendationTags: ["vegetable-forward", "cleanse", "light"],
  },
  {
    code: "R4",
    name: "Power & Vitality",
    price: 15,
    ingredients:
      "Hibiscus Flower (Sorrel), Wildcrafted Sea Moss Gel, Pineapple, Ginger, Cloves, Soursop leaves, Cinnamon",
    category: "red",
    recommendationTags: ["energy", "comforting", "ginger", "warming"],
  },
  {
    code: "S1",
    name: "Anti-Inflammatory Shot",
    price: 12,
    ingredients: "Turmeric, Ginger, Lemon, Black Pepper",
    category: "shots",
    sizeNote: "120ml",
    recommendationTags: ["anti-inflammatory", "ginger", "citrus", "warming", "shot"],
  },
  {
    code: "S2",
    name: "Digestion Shot",
    price: 12,
    ingredients: "Pineapple, Mint, Ginger, Coconut Water",
    category: "shots",
    sizeNote: "120ml",
    recommendationTags: ["digestion", "ginger", "mint", "refreshing", "shot"],
  },
  {
    code: "S3",
    name: "Energy Shot",
    price: 12,
    ingredients: "Carrot, Ginger, Lemon, Beetroot, Coconut Water, Apple Cider Vinegar",
    category: "shots",
    sizeNote: "120ml",
    recommendationTags: ["energy", "ginger", "citrus", "shot"],
  },
  {
    code: "C1",
    name: "1 Day Juice Cleanse",
    price: 90,
    ingredients: "Seven juices plus hydration guidance. Option to add extra days.",
    category: "cleanses",
    recommendationTags: ["cleanse", "light"],
  },
  {
    code: "F1",
    name: "Coconut Water (1.9L)",
    price: 15,
    ingredients: "Fresh coconut water",
    category: "fresh",
    recommendationTags: ["hydration", "refreshing", "light"],
  },
  {
    code: "F2",
    name: "Orange Juice (950ml)",
    price: 37,
    ingredients: "Florida/California oranges",
    category: "fresh",
    recommendationTags: ["citrus", "refreshing", "energy"],
  },
  {
    code: "F3",
    name: "Lemon Juice (475ml)",
    price: 19,
    ingredients: "Lemons",
    category: "fresh",
    recommendationTags: ["citrus", "light"],
  },
  {
    code: "F4",
    name: "Lime Juice (475ml)",
    price: 20,
    ingredients: "Limes",
    category: "fresh",
    recommendationTags: ["citrus", "light", "refreshing"],
  },
  {
    code: "F5",
    name: "Grapefruit Juice (475ml)",
    price: 19,
    ingredients: "Grapefruit",
    category: "fresh",
    recommendationTags: ["citrus", "refreshing", "light"],
  },
];

export function getCategoryLabel(category: CategoryId) {
  return categoryLabels[category];
}

