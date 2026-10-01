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

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
  description:
    "Skydeck is a restaurant and lounge in RR Nagar, Bengaluru — dinner, drinks, live music and events under warm gold light and neon. Reserve a table for your next night out.",
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
    description:
      "Dinner, drinks, live music and events in RR Nagar, Bengaluru. Great food. Good music. Better nights.",
    url: "/",
    siteName: "Skydeck",
    images: ["/images/ambience/hero-main.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
    description:
      "Dinner, drinks, live music and events in RR Nagar, Bengaluru.",
    images: ["/images/ambience/hero-main.jpg"],
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurantInfo.name,
  description: metadata.description,
  url: siteUrl.toString(),
  image: new URL("/images/ambience/hero-main.jpg", siteUrl).toString(),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: "RR Nagar, Bengaluru",
  sameAs: ["https://www.instagram.com/skydeck__rrnagar/"],
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
