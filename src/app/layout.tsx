import type { Metadata } from "next";
import { Lexend, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ActiveSectionProvider } from "@/lib/active-section";

const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });
const notoMono = Noto_Sans_Mono({ variable: "--font-noto-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Harsh Karan",
  description:
    "Full-Stack Developer focused on building scalable web applications with Next.js, Node.js, and AWS.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "Node.js",
    "AWS",
    "JavaScript",
    "TypeScript",
  ],
  openGraph: {
    title: "Harsh Karan - Full-Stack Developer",
    description:
      "Full-Stack Developer focused on building scalable web applications with Next.js, Node.js, and AWS.",
    url: "https://example.com",
    siteName: "Harsh Karan Portfolio",
    images: [
      {
        url: "/images/avatar.svg",
        width: 1200,
        height: 630,
        alt: "Harsh Karan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexend.variable} ${notoMono.variable} antialiased font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ActiveSectionProvider>
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
