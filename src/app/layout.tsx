import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROCOMM '26 | IEEE Communications Project Competition",
  description: "Saintgits College of Engineering (Autonomous), Kottayam is the official host venue for PROCOMM '26, the premier communications project competition organized by IEEE ComSoc Kerala Chapter and IEEE Kerala Section.",
  keywords: [
    "IEEE",
    "IEEE ComSoc",
    "ComSoc Kerala",
    "IEEE Kerala Section",
    "PROCOMM",
    "PROCOMM 2026",
    "Communications Project Competition",
    "Engineering Student Competition",
    "Saintgits College of Engineering",
    "Saintgits Kottayam"
  ],
  authors: [{ name: "IEEE ComSoc Kerala Chapter" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-outfit antialiased selection:bg-retro-brown selection:text-retro-cream">
        {children}
      </body>
    </html>
  );
}
