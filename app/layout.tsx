import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
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

const siteTitle = "Skydeck RR Nagar | Pub, Restaurant & Live Events in Bengaluru";
const siteDescription =
  "Discover Skydeck RR Nagar, Bengaluru, for great food, drinks, vibrant ambience and upcoming events. Explore event posters and contact Skydeck for bookings.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  applicationName: "Skydeck",
  authors: [{ name: "Skydeck" }],
  creator: "Skydeck",
  publisher: "Skydeck",
  category: "restaurant",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: [
    "Skydeck RR Nagar",
    "restaurant in RR Nagar",
    "pub in RR Nagar Bengaluru",
    "restaurant and lounge Bengaluru",
  ],
  alternates: { canonical: siteUrl.toString() },
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
    title: siteTitle,
    description: siteDescription,
    url: siteUrl.toString(),
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
    title: siteTitle,
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
  name: "Skydeck RR Nagar",
  description: siteDescription,
  url: siteUrl.toString(),
  image: new URL("/images/ambience/hero-main.jpg", siteUrl).toString(),
  areaServed: {
    "@type": "City",
    name: "Bengaluru",
  },
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
