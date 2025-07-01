import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduConvo",
  description: "Conversations Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>

        {/* ✅ Scrollable Background Image */}
        {/* <header className="bg-black/5 backdrop-blur shadow-md z-10 relative">
          <Navigation />
        </header> */}

        <main className="z-10 relative">{children}</main>
      </body>
    </html>
  );
}
