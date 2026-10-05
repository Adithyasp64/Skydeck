import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { restaurantInfo } from "@/data/restaurant";
import { siteUrl } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-body",
  display: "swap",
});

const siteDescription =
  "Skydeck is a restaurant and lounge in RR Nagar, Bengaluru for dinner, drinks, live music and events. Reserve a table for your next night out.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
  description: siteDescription,
  applicationName: "Skydeck",
  authors: [{ name: "Skydeck" }],
  creator: "Skydeck",
  publisher: "Skydeck",
  category: "restaurant",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "Skydeck RR Nagar",
    "restaurant in RR Nagar",
    "pub in RR Nagar Bengaluru",
    "restaurant and lounge Bengaluru",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
    description: siteDescription,
    url: "/",
    siteName: "Skydeck",
    images: [
      {
        url: "/images/ambience/hero-main.jpg",
        alt: "Skydeck restaurant and lounge in RR Nagar, Bengaluru",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
    description: siteDescription,
    images: [
      {
        url: "/images/ambience/hero-main.jpg",
        alt: "Skydeck restaurant and lounge in RR Nagar, Bengaluru",
      },
    ],
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl.toString()}#restaurant`,
  name: restaurantInfo.name,
  description: siteDescription,
  url: siteUrl.toString(),
  image: new URL("/images/ambience/hero-main.jpg", siteUrl).toString(),
  telephone: `+91${restaurantInfo.phone}`,
  email: restaurantInfo.email,
  hasMap: restaurantInfo.mapsUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "RR Nagar",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "City",
    name: "Bengaluru",
  },
  openingHoursSpecification: restaurantInfo.openingHours.map((hours) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "23:30",
    description: `${hours.days}: ${hours.hours}`,
  })),
  sameAs: [restaurantInfo.instagramUrl],
  acceptsReservations: true,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-void text-bone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c"),
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
