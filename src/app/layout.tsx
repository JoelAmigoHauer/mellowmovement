import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Headings — substitute for Squarespace "kings-caslon-display"
const caslonDisplay = localFont({
  src: "./fonts/LibreCaslonDisplay-400.woff2",
  variable: "--font-heading",
  weight: "400",
  display: "swap",
});

// Body — substitute for Squarespace "minion-pro"
const sourceSerif = localFont({
  src: [
    { path: "./fonts/SourceSerif4-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SourceSerif4-400italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/SourceSerif4-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mellow movement — Mobile Massage & Yoga in Sydney's Eastern Suburbs",
  description:
    "Find your calm with mobile yoga and massage. Relax and be comfortable in your own space. Mobile massage and yoga in the Eastern Suburbs, based in Bondi.",
  openGraph: {
    title: "mellow movement",
    description:
      "Mobile yoga and massage in Sydney's Eastern Suburbs. Relax and be comfortable in your own space.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caslonDisplay.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
