import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { noFlashScript } from "@/lib/theme";
import { profile, siteMeta } from "@/data/portfolio";
import "./globals.css";

/* Display face — variable width AND weight, which the hero leans on. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s — ${profile.name}`,
  },
  description: siteMeta.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteMeta.url }],
  creator: profile.name,
  keywords: [
    "Oracle NetSuite",
    "NetSuite Functional Consultant",
    "ERP Implementation",
    "Machine Learning",
    "Computer Vision",
    "AI",
    "Python",
    "Jatin Acharya",
    "Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8fa" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteMeta.url,
  image: `${siteMeta.url}/portrait.webp`,
  description: siteMeta.description,
  sameAs: [profile.linkedin, profile.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "EPIQ Softech India Pvt Ltd",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Manipal University Jaipur",
  },
  knowsAbout: [
    "Oracle NetSuite",
    "ERP Implementation",
    "Machine Learning",
    "Computer Vision",
    "Python",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteMeta.title,
  url: siteMeta.url,
  description: siteMeta.description,
  inLanguage: "en",
  author: { "@type": "Person", name: profile.name },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          // Sets data-theme before first paint. Must stay blocking and inline.
          dangerouslySetInnerHTML={{ __html: noFlashScript }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
