import { MenuItem } from "@/types/menu";

/**
 * A short, curated preview of dishes worth ordering — not the full menu.
 * Add another object here to add another item; nothing else needs to change.
 * `price` is optional — omit it if you'd rather not display pricing yet.
 */
export const menuPreview: MenuItem[] = [
  {
    id: "dish-001",
    name: "Kebabs",
    description: "Smoky, sauce-glazed kebabs off the grill.",
    image: "/images/menu/dish-001.jpg",
    price: "₹---",
  },
  {
    id: "dish-002",
    name: "Juicy Chicken Lollipop",
    description: "Tandoori chicken lollipop, served fresh off the coal.",
    image: "/images/menu/dish-002.jpg",
    price: "₹---",
  },
  {
    id: "dish-003",
    name: "cheese pizza",
    description: "Stone-fired pizza, loaded and sliced tableside.",
    image: "/images/menu/dish-003.jpg",
    price: "₹---",
  },
  {
    id: "dish-004",
    name: "Berry Mocktail",
    description: "A house mocktail, layered and finished with berry.",
    image: "/images/menu/dish-004.jpg",
    price: "₹---",
  },
  {
    id: "dish-005",
    name: "Citrus Gin Berries",
    description: "A house cocktail, layered and finished with citrus.",
    image: "/images/menu/6.png",
    price: "₹---",
  },
  {
    id: "dish-006",
    name: "Merry Citrus Deck",
    description: "a refreshing citrus mocktail, layered and finished with mint.",
    image: "/images/menu/7.png",
    price: "₹---",
  },
];

/** Where "View Full Menu" points — swap in the real PDF when ready. */
export const fullMenuUrl = "/menu.pdf";
