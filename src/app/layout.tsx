import type { Metadata } from "next";
import { Lexend, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ActiveSectionProvider } from "@/lib/active-section";
import PageTransition from "@/components/layout/PageTransition";
import ScrollCursor from "@/components/layout/ScrollCursor";

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
      <body className={`${lexend.variable} ${notoMono.variable} antialiased font-sans relative`}>
        {/* Fixed background image with frosted glass overlay */}
        <div className="fixed inset-0 z-[-1] will-change-auto">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" 
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Subtle gradient overlay that creates depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
        </div>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ActiveSectionProvider>
            <ScrollProgress />
            <ScrollCursor />
            <Header />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
