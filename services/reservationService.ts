import { ReservationInput, ReservationRecord, ReservationResult } from "@/types/reservation";

/**
 * Reservation service — swap the implementation of `createReservation`
 * to connect a real backend (Supabase, Firebase, Google Sheets, a
 * custom API) without touching any UI component. The form only ever
 * calls this function and reads `ReservationResult`.
 *
 * Current implementation: calls the local /api/reservations route,
 * which holds an in-memory mock store. Replace the body of the POST
 * handler in app/api/reservations/route.ts when a real backend is
 * ready — this function and its contract don't need to change.
 */
export async function createReservation(
  data: ReservationInput
): Promise<ReservationResult> {
  try {
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok) {
      return { success: false, error: body?.error ?? "Something went wrong. Please try again." };
    }

    return { success: true, reservation: body.reservation as ReservationRecord };
  } catch {
    return {
      success: false,
      error: "We couldn't reach the reservation desk. Check your connection and try again.",
    };
  }
}
