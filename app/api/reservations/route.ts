import { NextRequest, NextResponse } from "next/server";
import { ReservationInput, ReservationRecord } from "@/types/reservation";

/**
 * Mock reservation store. This is intentionally in-memory and will
 * reset on every server restart / redeploy — it exists so the UI has
 * a real request/response cycle to talk to during development.
 *
 * To connect a real backend: replace the body of POST below with a
 * call to Supabase / Firebase / Google Sheets / a custom API, and
 * return the same ReservationRecord shape. Nothing upstream (the
 * form, reservationService.ts) needs to change.
 */
const mockStore: ReservationRecord[] = [];

const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input: Partial<ReservationInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your full name.";
  if (!input.phone || !PHONE_RE.test(input.phone)) return "Please enter a valid phone number.";
  if (!input.email || !EMAIL_RE.test(input.email)) return "Please enter a valid email address.";
  if (!input.guests || input.guests < 1 || input.guests > 20) return "Guests must be between 1 and 20.";
  if (!input.date) return "Please choose a date.";
  const chosen = new Date(input.date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen < today) return "The date can't be in the past.";
  if (!input.time) return "Please choose a time.";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<ReservationInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const reservation: ReservationRecord = {
    id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    email: body.email!.trim(),
    guests: body.guests!,
    date: body.date!,
    time: body.time!,
    requests: body.requests?.trim() || undefined,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  mockStore.push(reservation);

  return NextResponse.json({ reservation }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ reservations: mockStore });
}
