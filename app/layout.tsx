// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { IntroProvider } from "@/context/IntroContext";
import { getMetadataSettings, getFaviconSettings } from "@/lib/site-settings";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [metadataSettings, faviconSettings] = await Promise.all([
      getMetadataSettings(),
      getFaviconSettings(),
    ]);
    
    return {
      title: metadataSettings?.siteTitle || "Home & Space Improvement Studio",
      description: metadataSettings?.siteDescription || "Premium interior design and architecture services for your dream home",
      keywords: metadataSettings?.keywords || ["interior design", "architecture", "home improvement"],
      authors: [{ name: metadataSettings?.author || "Home & Space Improvement Studio" }],
      themeColor: metadataSettings?.themeColor || "#9C7E5A",
      icons: {
        icon: faviconSettings?.favicon || "/favicon.ico",
        apple: faviconSettings?.appleTouchIcon || undefined,
      },
      openGraph: {
        title: metadataSettings?.siteTitle || "Home & Space Improvement Studio",
        description: metadataSettings?.siteDescription || "Premium interior design and architecture services for your dream home",
        images: faviconSettings?.ogImage ? [
          {
            url: faviconSettings.ogImage,
            width: 1200,
            height: 630,
            alt: metadataSettings?.siteTitle || "Home & Space Improvement Studio",
          }
        ] : undefined,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: metadataSettings?.siteTitle || "Home & Space Improvement Studio",
        description: metadataSettings?.siteDescription || "Premium interior design and architecture services for your dream home",
        images: faviconSettings?.ogImage ? [faviconSettings.ogImage] : undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Home & Space Improvement Studio",
      description: "Premium interior design and architecture services for your dream home",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider>
          <SessionProvider>
            <IntroProvider>
              {children}
            </IntroProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}