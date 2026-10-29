  export interface UpcomingEvent {
    id: string;
    title: string;
    dateLabel: string;
    timeLabel: string;
    image: string;
    tone: "gold" | "violet" | "blue" | "ember";
    isPlaceholder: boolean;
    bookingMessage?: string;
  }

  /**
   * CMS-ready event slots. Replace these clearly marked placeholders with
   * confirmed event details when the upcoming calendar is published.
   */
  export const upcomingEvents: UpcomingEvent[] = [
    {
      id: "upcoming-live-music",
      title: "Live music night",
      dateLabel: "Date to be announced",
      timeLabel: "Time to be announced",
      image: "/images/events/raghu-dixit-crowd.jpg",
      tone: "violet",
      isPlaceholder: true,
    },
    {
      id: "upcoming-weekend-dj",
      title: "Weekend DJ night",
      dateLabel: "Date to be announced",
      timeLabel: "Time to be announced",
      image: "/images/events/d major.jpg",
      tone: "ember",
      isPlaceholder: true,
    },
    {
      id: "upcoming-special-event",
      title: "A special night at Skydeck",
      dateLabel: "Date to be announced",
      timeLabel: "Time to be announced",
      image: "/images/events/h20 band.jpg",
      tone: "blue",
      isPlaceholder: true,
    },
  ];
