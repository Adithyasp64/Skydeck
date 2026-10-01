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
    price: "Starts From ₹429",
  },
  {
    id: "dish-002",
    name: "Juicy Chicken Lollipop",
    description: "Tandoori chicken lollipop, served fresh off the coal.",
    image: "/images/menu/dish-002.jpg",
    price: "Starts From ₹369",
  },
  {
    id: "dish-003",
    name: "cheese pizza",
    description: "Stone-fired pizza, loaded and sliced tableside.",
    image: "/images/menu/dish-003.jpg",
    price: "Starts From ₹529",
  },
  {
    id: "dish-004",
    name: "Mocktail",
    description: "A house mocktail, layered and finished with berry.",
    image: "/images/menu/dish-004.jpg",
    price: "Starts From ₹249",
  },
  {
    id: "dish-005",
    name: "Citrus Gin Berries",
    description: "A house cocktail, layered and finished with citrus.",
    image: "/images/menu/6.png",
    price: "Starts From ₹499",
  },
  {
    id: "dish-006",
    name: "Merry Citrus Deck",
    description: "a refreshing citrus mocktail, layered and finished with mint.",
    image: "/images/menu/7.png",
    price: "Starts From ₹449",
  },
];

/** Where "View Full Menu" points — swap in the real PDF when ready. */
export const fullMenuUrl = "https://dinein-2.lucidpos.com/v2/v2/639263108217673127?ukey=wfPrpzD0wnQJHRyvQ1qXdZpImxU8GzygL9CsB00URxHCG8m2h2fwiCBo%20h%202UOPQjT0I6TjIsXriMrF2KF6iXvHvf%205mG%205/2XlUQJUmtZS9Tuixeq408utC8MRppoAk%205JiWvvPVnRJAAFcHNNCm7LCqnnCWANQfWcS0ewKx4ogaPoftlDj0N/AeFUVr0iv";
