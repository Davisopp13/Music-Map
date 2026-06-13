import type { Metadata, Viewport } from "next";
import { Geist, Fraunces, Lora, Oswald } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/RegisterSW";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Wood type for the poster lockups — the same voice as the map's own
// letterpress labels (self-hosted Oswald glyph PBFs).
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Music History Map",
  description:
    "An interactive map of American music history — story-rich pins and curated trails, starting with Bristol, TN/VA.",
  appleWebApp: {
    capable: true,
    title: "Music Map",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  // standalone status-bar area blends with the paper, not browser white
  themeColor: "#efe7d6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} ${lora.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
