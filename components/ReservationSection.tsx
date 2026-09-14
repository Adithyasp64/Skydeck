"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Minus, Plus } from "lucide-react";
import { createReservation } from "@/services/reservationService";
import { ReservationInput, ReservationRecord } from "@/types/reservation";

type FormState = ReservationInput;
type Status = "idle" | "loading" | "success" | "error";

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  guests: 2,
  date: "",
  time: "",
  requests: "",
};

const TIMES = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

function todayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function ReservationSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<ReservationRecord | null>(null);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!form.date) {
      next.date = "Choose a date.";
    } else if (form.date < todayISO()) {
      next.date = "Date can't be in the past.";
    }
    if (!form.time) {
      next.time = "Choose a time.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setStatus("loading");
    const result = await createReservation(form);
    if (result.success && result.reservation) {
      setConfirmed(result.reservation);
      setStatus("success");
    } else {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function reset() {
    setForm(EMPTY);
    setErrors({});
    setServerError(null);
    setStatus("idle");
    setConfirmed(null);
  }

  const field =
    "w-full rounded-sm border bg-char2 px-4 py-3.5 text-sm text-bone placeholder:text-smoke/60 transition-colors duration-200 focus:outline-none focus:border-gold";

  return (
    <section id="reservation" className="relative bg-char py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl">
            Save your table.
          </h2>
          <p className="mt-4 text-base text-smoke">
            Tell us the essentials — we&apos;ll take care of the rest.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-sm border border-line bg-char2/60 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" && confirmed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center py-8 text-center"
              >
                <CheckCircle2 className="mb-5 text-gold" size={44} />
                <h3 className="font-display text-2xl font-bold text-bone">
                  Your table request is in.
                </h3>
                <div className="mt-5 grid grid-cols-3 gap-6 rounded-sm border border-line px-6 py-4 text-sm">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest2 text-smoke">Date</div>
                    <div className="mt-1 font-semibold text-bone">{confirmed.date}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest2 text-smoke">Time</div>
                    <div className="mt-1 font-semibold text-bone">{confirmed.time}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest2 text-smoke">Guests</div>
                    <div className="mt-1 font-semibold text-bone">{confirmed.guests}</div>
                  </div>
                </div>
                <p className="mt-6 max-w-sm text-sm text-smoke">
                  We&apos;ll contact you shortly to confirm your reservation.
                </p>
                <button
                  onClick={reset}
                  className="mt-8 rounded-sm border border-bone/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-bone transition-colors hover:border-gold hover:text-gold"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Name
                  </label>
                  <input
                    id="name"
                    className={field}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <FieldError id="name-error" msg={errors.name} />}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={field}
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && <FieldError id="phone-error" msg={errors.phone} />}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={field}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <FieldError id="email-error" msg={errors.email} />}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-4 rounded-sm border border-line bg-char2 px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                      className="text-smoke transition-colors hover:text-gold"
                      aria-label="Decrease guests"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[2ch] flex-1 text-center text-sm font-semibold text-bone">
                      {form.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, guests: Math.min(20, f.guests + 1) }))}
                      className="text-smoke transition-colors hover:text-gold"
                      aria-label="Increase guests"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="date" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={todayISO()}
                    className={field}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "date-error" : undefined}
                  />
                  {errors.date && <FieldError id="date-error" msg={errors.date} />}
                </div>

                <div>
                  <label htmlFor="time" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    className={field}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    aria-invalid={!!errors.time}
                    aria-describedby={errors.time ? "time-error" : undefined}
                  >
                    <option value="">Select a time</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time && <FieldError id="time-error" msg={errors.time} />}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="requests" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-smoke">
                    Special Requests
                  </label>
                  <textarea
                    id="requests"
                    rows={3}
                    className={field}
                    placeholder="Birthday, seating preference, allergies — anything we should know."
                    value={form.requests}
                    onChange={(e) => setForm({ ...form, requests: e.target.value })}
                  />
                </div>

                {status === "error" && serverError && (
                  <div className="sm:col-span-2 flex items-start gap-2 rounded-sm border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-gold py-4 text-sm font-semibold uppercase tracking-widest2 text-void transition-all duration-300 hover:bg-goldSoft disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Reserve Your Table"
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FieldError({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} className="mt-1.5 text-xs text-ember">
      {msg}
    </p>
  );
}
