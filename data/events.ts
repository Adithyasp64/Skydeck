import { SkydeckEvent } from "@/types/event";

/**
 * Add a new event by adding a new object below — nothing else needs
 * to change. Status (upcoming / completed) is derived automatically
 * from `date` unless you explicitly set `status`.
 *
 * Only real, confirmed event details should go here — no invented
 * artists, dates, or ticket information.
 */
export const events: SkydeckEvent[] = [
  {
    id: "raghu-dixit-project",
    title: "Live at Skydeck",
    artist: "Raghu Dixit Project",
    date: "2026-03-14",
    time: "8:00 PM",
    description: "An evening of live music with the Raghu Dixit Project.",
    image: "/images/events/raghu-dixit-project.jpg",
  },
  // Add the next confirmed event here, e.g.:
  // {
  //   id: "your-event-slug",
  //   title: "Live at Skydeck",
  //   artist: "Artist / Act Name",
  //   date: "2026-12-01",
  //   time: "8:00 PM",
  //   description: "One line on the night.",
  //   image: "/images/events/your-event.jpg",
  // },
];
