export interface ReservationInput {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:MM"
  requests?: string;
}

export interface ReservationRecord extends ReservationInput {
  id: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
}

export interface ReservationResult {
  success: boolean;
  reservation?: ReservationRecord;
  error?: string;
}
