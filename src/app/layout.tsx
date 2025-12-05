import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/funnel/components/common/CustomCursor";
import { CursorProvider } from "@/funnel/components/common/CursorContext";
import ScrollRestoration from "@/funnel/components/common/ScrollRestoration";
import { DraftModeProvider } from "@/components/DraftModeProvider";
import { draftMode } from "next/headers";
import ConditionalLayout from "@/components/ConditionalLayout";
import { VisualEditing } from "next-sanity/visual-editing";
import { client } from "@/sanity/lib/client";
import { SanityProvider } from "@/components/SanityProvider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://picasso-fusion.vercel.app"), 
  title: {
    default: "Picasso Fusion | Digital Art Platform",
    template: "%s | Picasso Fusion",
  },
  description: "Picasso Fusion is a premier platform for creating and exploring digital art. Unlock your creativity with our exclusive design membership.",
  keywords: [
    "digital art",
    "design membership",
    "creative platform",
    "picasso fusion",
    "art community",
    "graphic design",
    "web design",
    "design services",
    "unlimited design",
    "subscription design",
  ],
  authors: [{ name: "Picasso Fusion Team" }],
  creator: "Picasso Fusion",
  publisher: "Picasso Fusion",
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://picasso-fusion.vercel.app",
    title: "Picasso Fusion | Digital Art Platform",
    description: "Unlock your creativity with our exclusive design membership. Streamline your journey with expert designers.",
    siteName: "Picasso Fusion",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Picasso Fusion Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Picasso Fusion | Digital Art Platform",
    description: "Unlock your creativity with our exclusive design membership.",
    images: ["/twitter-image.jpg"],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Picasso Fusion",
  url: "https://picasso-fusion.vercel.app",
  logo: "https://picasso-fusion.vercel.app/logo.png",
  sameAs: [
    "https://twitter.com/picassofusion",
    "https://instagram.com/picassofusion",
    "https://linkedin.com/company/picassofusion",
  ],
  description: "Picasso Fusion is a platform that allows users to create their own digital art.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <SanityProvider isPreview={isEnabled}>
          <ScrollRestoration />
          <CursorProvider>
            <CustomCursor />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </CursorProvider>
          {isEnabled && (
            <>
              <DraftModeProvider />
              <VisualEditing />
            </>
          )}
        </SanityProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}