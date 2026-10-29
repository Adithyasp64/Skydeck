
import { NextResponse } from "next/server";
import { getUpcomingEvents } from "@/lib/sanityEvents";

export async function GET() {
  try {
    const events = await getUpcomingEvents();

    return NextResponse.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("Sanity events fetch failed:", error);

    return NextResponse.json(
      { success: false, error: "Unable to fetch events" },
      { status: 500 }
    );
  }
}
