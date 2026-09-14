# Skydeck — Restaurant & Lounge Website

A production-quality Next.js site for Skydeck (RR Nagar, Bengaluru), built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## What's real vs. placeholder

The interior, bar, floral installation, food, and Raghu Dixit Project event
photography in `public/images/` are the real photos you supplied — they're
already wired into the site. A few slots still use a bespoke placeholder
(a dark gradient + glow, matching the brand palette) instead of a photo:

- Three cuisine categories — Chinese, Continental, Desserts (`data/cuisines.ts`)
- Two menu preview items (`data/menuPreview.ts`)

Add a photo to the matching `image` field in those data files and the
placeholder is replaced automatically — no component code changes needed.

**Nothing else was invented.** Address, phone number, email, opening hours,
Instagram handle, Maps link, menu prices, and dish names are placeholders in
`data/restaurant.ts` and `data/menuPreview.ts` — fill in the real details
there. Only the one confirmed event (Raghu Dixit Project) is listed in
`data/events.ts`.

## Editing content — no component code required

| What you want to change      | File                        |
|-------------------------------|------------------------------|
| Address, phone, hours, Instagram, Maps link | `data/restaurant.ts` |
| Cuisine categories             | `data/cuisines.ts`          |
| "Worth ordering" menu preview  | `data/menuPreview.ts`       |
| Events (upcoming/past)         | `data/events.ts`             |
| Gallery photos                 | `data/gallery.ts`            |

### Adding an event

Add an object to the array in `data/events.ts`:

```ts
{
  id: "your-event-slug",
  title: "Live at Skydeck",
  artist: "Artist / Act Name",
  date: "2026-12-01",       // ISO date — status is derived from this
  time: "8:00 PM",
  description: "One line about the night.",
  image: "/images/events/your-event.jpg",
}
```

Status (`upcoming` vs `completed`) is calculated automatically by comparing
`date` to today (see `lib/events.ts`). The nearest upcoming event becomes the
large "poster" card automatically; anything past its date drops into
**Past Events** with an "Event Ended" label. You never need to set `status`
by hand unless you want to override the automatic behavior.

### Full menu PDF

"View Full Menu" links to `/menu.pdf`. Add your real menu at
`public/menu.pdf` and it works immediately — remove
`public/menu.pdf.README.txt` once you do.

## Reservation system

The reservation form (`components/ReservationSection.tsx`) calls
`services/reservationService.ts → createReservation()`, which posts to
`app/api/reservations/route.ts`. That route currently validates the request
and stores it in an in-memory array (a mock — it resets on every server
restart).

To connect a real backend (Supabase, Firebase, Google Sheets, a custom API):
replace the body of the `POST` handler in `app/api/reservations/route.ts`
with your real integration, returning the same `ReservationRecord` shape.
**Nothing in the UI needs to change** — the form only ever talks to
`reservationService.ts`, and that contract stays the same.

## Custom cursor

`components/CustomCursor.tsx` only activates on devices with a fine pointer
(`hover: hover` and `pointer: fine`), so touch devices automatically keep
their native cursor — no separate mobile logic needed.

## Architecture

```
app/
  layout.tsx            Root layout, fonts, metadata
  page.tsx               Assembles all sections
  globals.css
  api/reservations/route.ts

components/               One component per section (see SITE STRUCTURE)
data/                     Editable content — see table above
services/                 reservationService.ts (swap backend here)
types/                    Shared TypeScript types
lib/events.ts              Upcoming/completed date logic
public/images/             ambience/ gallery/ cuisine/ menu/ events/
```

## Notes

- Respects `prefers-reduced-motion` (see `globals.css` and Framer Motion's
  viewport-triggered animations).
- Images use `next/image` with responsive `sizes` for performance.
- Focus states are visible (`:focus-visible` outline) even with the custom
  cursor active.
