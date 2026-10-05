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
  instagramUrl: "https://www.instagram.com/skydeck__rrnagar?stkn=ZDNlZDc0MzIxNw%3D%3D",
  mapsUrl: "https://www.google.com/maps/place/skydeck+rr+nagar/data=!4m2!3m1!1s0x3bae3f61cf1b851b:0x1a90962c08949642?sa=X&ved=1t:242&ictx=111",
  openingHours: [{ days: "All Days", hours: "11:00 am – 11:30 pm" }],
};
