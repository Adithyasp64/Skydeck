import { SkydeckEvent } from "@/types/event";

/**
 * Derives upcoming/completed automatically from `date`, unless the
 * event explicitly sets `status`. An event is treated as completed
 * once its date has passed (end of that day, local time).
 */
export function resolveStatus(event: SkydeckEvent): "upcoming" | "completed" {
  if (event.status) return event.status;
  const eventEnd = new Date(event.date + "T23:59:59");
  return eventEnd.getTime() >= Date.now() ? "upcoming" : "completed";
}

export function sortEvents(events: SkydeckEvent[]) {
  const withStatus = events.map((e) => ({ ...e, resolvedStatus: resolveStatus(e) }));
  const upcoming = withStatus
    .filter((e) => e.resolvedStatus === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = withStatus
    .filter((e) => e.resolvedStatus === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { upcoming, past };
}

export function formatEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
