import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
  description:
    "Skydeck is a restaurant and lounge in RR Nagar, Bengaluru — dinner, drinks, live music and events under warm gold light and neon. Reserve a table for your next night out.",
  openGraph: {
    title: "Skydeck | Restaurant & Lounge in RR Nagar, Bengaluru",
    description:
      "Dinner, drinks, live music and events in RR Nagar, Bengaluru. Great food. Good music. Better nights.",
    url: "https://skydeck.example.com",
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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-void text-bone antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
