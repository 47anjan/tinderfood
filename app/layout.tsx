import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-provider";
import QueryClientProvider from "@/contexts/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tinderfood - Discover Your Next Favorite Recipe",
    template: "%s | Tinderfood",
  },
  description:
    "Swipe through delicious recipes and discover your next favorite meal. Find cooking inspiration with Tinderfood's personalized recipe recommendations.",
  keywords: [
    "recipes",
    "cooking",
    "food discovery",
    "meal planning",
    "recipe finder",
    "cooking inspiration",
    "food app",
    "recipe recommendations",
  ],
  authors: [{ name: "Tinderfood Team" }],
  creator: "Tinderfood",
  publisher: "Tinderfood",
  metadataBase: new URL("https://tinderfood-app.vercel.app"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tinderfood - Discover Your Next Favorite Recipe",
    description:
      "Swipe through delicious recipes and discover your next favorite meal. Find cooking inspiration with personalized recipe recommendations.",
    url: "https://tinderfood-app.vercel.app", // Replace with your actual domain
    siteName: "Tinderfood",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Tinderfood - Recipe Discovery App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinderfood - Discover Your Next Favorite Recipe",
    description:
      "Swipe through delicious recipes and discover your next favorite meal.",
    images: ["/twitter-image.jpg"], // Add your Twitter card image
    creator: "@tinderfood", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Food & Cooking",
  classification: "Recipe Discovery Application",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Tinderfood",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
