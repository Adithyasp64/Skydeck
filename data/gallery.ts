export interface GalleryImage {
  id: string;
  src?: string;
  caption: string;
  category: "interior" | "food" | "bar" | "event";
  /** Controls the card's footprint in the editorial grid. */
  size: "sm" | "md" | "lg";
}

/**
 * Add or remove images here — the gallery grid re-lays itself out.
 * `src` is optional; leave it out to use the atmospheric placeholder
 * until real photography is available.
 */
export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/hall.jpg", caption: "The main floor", category: "interior", size: "lg" },
  { id: "g2", src: "/images/gallery/bar-seats.jpg", caption: "Bar lights", category: "bar", size: "md" },
  { id: "g3", src: "/images/gallery/food-1.jpg", caption: "Off the grill", category: "food", size: "sm" },
  { id: "g4", src: "/images/gallery/florals.jpg", caption: "Hanging greens", category: "interior", size: "md" },
  { id: "g5", src: "/images/gallery/event.jpg", caption: "Live at Skydeck", category: "event", size: "sm" },
  { id: "g6", src: "/images/gallery/drink.jpg", caption: "Cocktail hour", category: "bar", size: "md" },
  { id: "g7", src: "/images/gallery/mural.jpg", caption: "Down the stairs", category: "interior", size: "sm" },
  { id: "g8", src: "/images/gallery/food-2.jpg", caption: "Straight off the stone", category: "food", size: "md" },
  { id: "g9", src: "/images/gallery/bar.jpg", caption: "The bar", category: "bar", size: "lg" },
];
