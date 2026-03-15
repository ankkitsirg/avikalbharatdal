import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avikal Bharat Dal",
  description: "Official website of Avikal Bharat Dal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-party-light text-gray-800`}
      >

        {/* FLAG STRIPE TOP */}
        <div className="h-3 bg-party-orange"></div>
        <div className="h-1 bg-party-gold"></div>

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="bg-party-orange text-white text-center py-6 mt-10">
          © {new Date().getFullYear()} Avikal Bharat Dal. All rights reserved.
        </footer>

      </body>
    </html>
  );
}