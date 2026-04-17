import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AmalGus | World's First B2B2C Glass Marketplace",
  description: "India's smartest marketplace for glass and allied products. Find the best glass types, compare real-time vendor rates, and get instant technical matches.",
  keywords: ["glass marketplace", "toughened glass", "DGU glass", "architectural glass", "AmalGus", "India glass rates"],
  authors: [{ name: "AmalGus Team" }],
  openGraph: {
    title: "AmalGus | Smart Glass Marketplace",
    description: "The niche marketplace connecting designers, architects, and builders with verified glass manufacturers.",
    type: "website",
    locale: "en_IN",
    siteName: "AmalGus",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmalGus | Smart Glass Marketplace",
    description: "India's niche B2B2C glass marketplace.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy selection:bg-glass-blue selection:text-navy">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
