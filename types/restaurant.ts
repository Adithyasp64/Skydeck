export interface OpeningHours {
  days: string;       // e.g. "Mon – Thu"
  hours: string;       // e.g. "12:00 PM – 11:30 PM"
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  mapsUrl: string;
  openingHours: OpeningHours[];
}
