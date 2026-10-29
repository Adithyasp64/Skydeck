
import { sanityClient } from "@/lib/sanity";

export interface UpcomingEvent {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  image: string;
  tone: "gold" | "violet" | "blue" | "ember";
  isPlaceholder: boolean;
  bookingMessage: string;
}

const eventsQuery = `
  *[
    _type == "event" &&
    !(_id in path("drafts.**")) &&
    cancelled != true &&
    startDateTime > now() &&
    defined(poster.asset)
  ] | order(startDateTime asc) {
    _id,
    title,
    startDateTime,
    description,
    bookingMessage,
    "imageUrl": poster.asset->url
  }
`;

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

function formatTime(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const documents = await sanityClient.fetch(eventsQuery, {}, {
    next: { revalidate: 60 },
  });

  const tones: UpcomingEvent["tone"][] = [
    "gold",
    "violet",
    "blue",
    "ember",
  ];

  return documents.map(
    (
      event: {
        _id: string;
        title: string;
        startDateTime: string;
        imageUrl: string;
        bookingMessage?: string;
      },
      index: number,
    ) => ({
      id: event._id,
      title: event.title,
      dateLabel: formatDate(event.startDateTime),
      timeLabel: formatTime(event.startDateTime),
      image: event.imageUrl,
      tone: tones[index % tones.length],
      isPlaceholder: false,
      bookingMessage:
        event.bookingMessage ||
        `Hi Skydeck, I would like to book for ${event.title}.`,
    }),
  );
}
