export type EventStatus = "upcoming" | "completed";

export interface SkydeckEvent {
  id: string;
  title: string;
  artist?: string;
  date: string;        // ISO format: "2026-10-10"
  time?: string;        // e.g. "7:30 PM"
  description: string;
  image?: string;
  ctaLabel?: string;    // e.g. "View Event" — omit to default to "Learn More"
  ctaHref?: string;
  /**
   * Optional manual override. If not provided, status is derived
   * automatically by comparing `date` against the current date.
   */
  status?: EventStatus;
}
