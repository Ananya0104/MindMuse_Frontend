// --- START OF FILE app/layout.tsx ---

// Import the Metadata type from Next.js for type safety
import type {Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

// --- SEO & Social Metadata ---
// This object configures SEO, social sharing, and PWA metadata for your site
// --- Schema.org Structured Data for SEO ---
const schemaOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Godai Wellness",
  url: "https://godaiwellness.com",
  logo: "https://godaiwellness.com/icons/android-chrome-512x512.png",
  description:
    "Godai Wellness blends AI-powered mental wellness tools and adaptogenic snacks to help you feel your best.",
  sameAs: [
    "https://www.linkedin.com/company/godaiwellness",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "team@godaiwellness.com",
    contactType: "customer service",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
};

// Separate viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// --- Root Layout ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "rlz7yewnhn");`,
            }}
          />
          <link href="https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap" rel="stylesheet" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJsonLd) }}
          />
          <Script
            id="google-identity-services"
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
          />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}