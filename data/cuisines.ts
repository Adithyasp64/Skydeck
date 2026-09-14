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
    name: "Sushi",
    description: "Straight From Japan.",
    image: "/images/menu/5.png",
  },
  {
    id: "continental",
    name: "Continental",
    description: "Premium plates, done properly.",
    image: "/images/menu/4.jpg",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "A sweet way to end the night.",
    image: "/images/menu/2.png",
  },
];
