import { Cuisine } from "@/types/menu";

/**
 * Curated food categories for the Cuisine Showcase section.
 * Add or remove entries here — the UI renders automatically.
 * `image` is optional; leave it out to use the atmospheric placeholder.
 */
export const cuisines: Cuisine[] = [
  {
    id: "north-indian",
    name: "North Indian",
    description: "Rich flavours, hearty classics.",
    image: "/images/cuisine/north-indian.jpg",
  },
  {
    id: "signature-bites",
    name: "Signature Bites",
    description: "Small plates, made for sharing.",
    image: "/images/cuisine/signature-bites.jpg",
  },
  {
    id: "pizzas",
    name: "Pizzas",
    description: "Stone-fired, straight to the table.",
    image: "/images/cuisine/pizzas.jpg",
  },
  {
    id: "chinese",
    name: "Chinese",
    description: "Wok-fired, bold and quick.",
    // No photo supplied yet — add /images/cuisine/chinese.jpg to activate.
  },
  {
    id: "continental",
    name: "Continental",
    description: "Comfort plates, done properly.",
    // No photo supplied yet — add /images/cuisine/continental.jpg to activate.
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "A sweet way to end the night.",
    // No photo supplied yet — add /images/cuisine/desserts.jpg to activate.
  },
];
