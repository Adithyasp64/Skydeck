import { RestaurantInfo } from "@/types/restaurant";

/**
 * Single source of truth for all restaurant contact & business info.
 * Replace the placeholder values below with real Skydeck details —
 * nothing here is invented, and nothing else in the codebase should
 * hardcode this information.
 */
export const restaurantInfo: RestaurantInfo = {
  name: "Skydeck",
  tagline: "Resto Pub & Kitchen",
  location: "RR Nagar, Bengaluru",
  address: "Add address — RR Nagar, Bengaluru",
  phone: "9845556080",
  email: "skydec@gmail.com",
  instagram: "@skydeck__rrnagar",
  mapsUrl: "Add Google Maps link",
  openingHours: [
    { days: "Add days", hours: "Add hours" },
    { days: "Add days", hours: "Add hours" },
  ],
};
