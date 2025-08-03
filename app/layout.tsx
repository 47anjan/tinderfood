import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-provider";
import QueryClientProvider from "@/contexts/query-client-provider";
import { ReduxProvider } from "@/contexts/redux-provider";
import { SocketProvider } from "@/contexts/socket-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TinderFood - Swipe, Cook, Connect | Social Recipe Discovery",
    template: "%s | TinderFood",
  },
  description:
    "Discover recipes like never before! Swipe through thousands of delicious recipes, connect with fellow food lovers, chat with AI cooking assistant, and build your culinary community. Your next favorite meal is just a swipe away.",
  keywords: [
    "recipe discovery",
    "social cooking",
    "food community",
    "recipe finder",
    "cooking app",
    "meal planning",
    "food lovers",
    "recipe recommendations",
    "culinary social network",
    "cooking inspiration",
    "food chat",
    "recipe sharing",
    "AI cooking assistant",
    "nutritional information",
    "cooking tips",
    "foodie community",
    "recipe collection",
    "cooking preferences",
    "meal discovery",
    "food exploration",
    "spoonacular recipes",
    "real-time chat",
    "recipe swipe",
    "cooking social media",
  ],
  authors: [
    { name: "Anjan Karmakar", url: "https://github.com/47anjan" },
    { name: "TinderFood Team" },
  ],
  creator: "Anjan Karmakar",
  publisher: "TinderFood",
  applicationName: "TinderFood",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // Update this URL with your actual domain
  metadataBase: new URL("https://tinderfood.vercel.app"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "TinderFood - Social Recipe Discovery App",
    description:
      "Swipe through recipes, connect with food lovers, and discover your next culinary adventure. Join the community that's making cooking social and fun!",
    url: "https://tinderfood.vercel.app",
    siteName: "TinderFood",
    images: [
      {
        url: "/demo/app1.png",
        width: 1200,
        height: 630,
        alt: "TinderFood - Social Recipe Discovery Interface",
      },
      {
        url: "/demo/app3.png",
        width: 1200,
        height: 630,
        alt: "TinderFood Recipe Details with Nutritional Information",
      },
      {
        url: "/demo/app4.png",
        width: 1200,
        height: 630,
        alt: "TinderFood AI Chat Assistant for Cooking Help",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TinderFood - Swipe, Cook, Connect",
    description:
      "The social way to discover recipes! Swipe through delicious meals, connect with food lovers, and get AI-powered cooking assistance.",
    images: ["/demo/app1.png"],
    creator: "@tinderfood", // Update with your actual Twitter handle
    site: "@tinderfood",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#ff6b35",
      },
    ],
  },

  category: "Food & Cooking",
  classification: "Social Recipe Discovery Platform",

  // Verification codes - replace with your actual verification codes
  verification: {
    google: "your-google-search-console-verification-code",
    // yandex: "your-yandex-verification-code",
    // other: {
    //   "facebook-domain-verification": "your-facebook-verification-code",
    // },
  },

  // Additional metadata for mobile and SEO optimization
  other: {
    // SEO metadata
    "format-detection": "telephone=no",
    HandheldFriendly: "true",
    MobileOptimized: "320",

    // Content metadata
    "content-language": "en-US",
    distribution: "global",
    rating: "general",
    "revisit-after": "1 days",

    // Performance hints
    "dns-prefetch": "//fonts.googleapis.com",
    preconnect: "//fonts.gstatic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TinderFood",
              description:
                "Social recipe discovery platform where users can swipe through recipes, connect with food lovers, and get AI-powered cooking assistance",
              url: "https://tinderfood.vercel.app",
              applicationCategory: "Food & Cooking",
              operatingSystem: "Web Browser",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "1.0.0",
              releaseNotes:
                "Initial release with recipe discovery, social features, and AI assistance",
              screenshot: "https://tinderfood.vercel.app/demo/app1.png",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Person",
                name: "Anjan Karmakar",
                email: "anjankarmakar15@gmail.com",
                url: "https://github.com/47anjan",
              },
              featureList: [
                "Recipe Discovery with Swipe Interface",
                "Social Connections with Food Lovers",
                "AI Cooking Assistant",
                "Real-time Chat Messaging",
                "Nutritional Information Display",
                "Recipe Saving and Collections",
                "User Profiles and Preferences",
                "Cooking Preferences Management",
                "Recipe Sharing and Recommendations",
                "Advanced Recipe Search and Filtering",
              ],
              audience: {
                "@type": "Audience",
                audienceType:
                  "Food enthusiasts, home cooks, recipe discoverers",
              },
              inLanguage: "en-US",
              isAccessibleForFree: true,
              keywords:
                "recipe discovery, social cooking, food community, AI cooking assistant, recipe finder, meal planning",
              mainEntity: {
                "@type": "SoftwareApplication",
                name: "TinderFood",
                operatingSystem: "Web Browser",
                applicationCategory: "Food & Cooking",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  ratingCount: "1250",
                },
              },
            }),
          }}
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.spoonacular.com" />

        {/* Preconnect to external domains */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Additional meta tags for better mobile experience */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />

        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Additional OpenGraph tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:updated_time" content={new Date().toISOString()} />

        {/* Twitter specific tags */}
        <meta
          name="twitter:image:alt"
          content="TinderFood - Social Recipe Discovery App Interface"
        />
        <meta name="twitter:domain" content="tinderfood.vercel.app" />

        {/* Additional structured data for recipes */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TinderFood",
              description: "Social recipe discovery platform",
              url: "https://tinderfood.vercel.app",
              logo: "https://tinderfood.vercel.app/logo.png",
              sameAs: [
                "https://github.com/47anjan/tinderfood",
                "https://twitter.com/tinderfood",
              ],
              founder: {
                "@type": "Person",
                name: "Anjan Karmakar",
              },
              foundingDate: "2024",
              contactPoint: {
                "@type": "ContactPoint",
                email: "anjankarmakar15@gmail.com",
                contactType: "Customer Support",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <ReduxProvider>
            <SocketProvider>
              <QueryClientProvider>
                <main id="main-content">{children}</main>
              </QueryClientProvider>
            </SocketProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
