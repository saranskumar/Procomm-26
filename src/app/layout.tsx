import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://procomm.comsoc.ieeekerala.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PROCOMM '26 | IEEE Communications Project Competition",
    template: "%s | PROCOMM '26",
  },
  description:
    "Flagship 24-Hour Communications Project Competition organized by IEEE ComSoc Kerala Chapter and IEEE Kerala Section. Hosted at Saintgits College of Engineering, Kottayam, Kerala on September 5–6, 2026.",
  keywords: [
    "IEEE",
    "IEEE ComSoc",
    "IEEE ComSoc Kerala Chapter",
    "IEEE Kerala Section",
    "PROCOMM",
    "PROCOMM 2026",
    "Communications Project Competition",
    "Engineering Hackathon Kerala",
    "Hardware Prototype Competition",
    "Saintgits College of Engineering",
    "Saintgits Kottayam",
    "Smart Safety Helmet",
    "Structural Health Monitoring",
    "Machine Health Monitoring",
  ],
  authors: [{ name: "IEEE ComSoc Kerala Chapter", url: "https://comsoc.ieeekerala.org" }],
  creator: "IEEE ComSoc Kerala Chapter",
  publisher: "IEEE Kerala Section",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "PROCOMM '26 | IEEE Communications Project Competition",
    description:
      "24 Hours • Real Problems • Real Prototypes. The flagship communications engineering competition hosted at Saintgits College of Engineering, Kottayam, Kerala.",
    url: siteUrl,
    siteName: "PROCOMM '26",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo/procomm-logo.png",
        width: 1200,
        height: 630,
        alt: "PROCOMM '26 IEEE ComSoc Kerala Chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROCOMM '26 | IEEE ComSoc Kerala Chapter",
    description:
      "24 Hours • Real Problems • Real Prototypes. Hosted at Saintgits College of Engineering, Kottayam, Kerala.",
    images: ["/logo/procomm-logo.png"],
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Kottayam, Kerala, India",
    "geo.position": "9.5290;76.5511",
    ICBM: "9.5290, 76.5511",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hackathon",
    name: "PROCOMM '26 - IEEE Communications Project Competition",
    description:
      "Flagship 24-Hour Communications Project Competition organized by IEEE ComSoc Kerala Chapter and IEEE Kerala Section. Hosted at Saintgits College of Engineering, Kottayam.",
    startDate: "2026-09-05T09:00:00+05:30",
    endDate: "2026-09-06T09:00:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: siteUrl,
    location: {
      "@type": "Place",
      name: "Saintgits College of Engineering (Autonomous)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kottukulam Hills, Pathamuttam",
        addressLocality: "Kottayam",
        addressRegion: "Kerala",
        postalCode: "686532",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 9.529,
        longitude: 76.5511,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "IEEE Communications Society (ComSoc) Kerala Chapter",
      url: "https://comsoc.ieeekerala.org",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/register`,
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-08-01T00:00:00+05:30",
    },
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-outfit antialiased selection:bg-retro-brown selection:text-retro-cream">
        {children}
      </body>
    </html>
  );
}
