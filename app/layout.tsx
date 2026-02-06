// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { IntroProvider } from "@/context/IntroContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Home & Space Improvement Studio",
  description: "Premium interior design and architecture services for your dream home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider>
          <IntroProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}