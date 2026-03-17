import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

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

        {/* Google Translate Hidden Container */}
        <div id="google_translate_element" className="hidden"></div>

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

        {/* Google Translate Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  {
                    pageLanguage: 'en',
                    includedLanguages: 'hi,ta,te,ur,bn,gu,kn,ml,mr,pa,or,as',
                    autoDisplay: false
                  },
                  'google_translate_element'
                );
              }

              document.addEventListener("change", function(e) {
                if (e.target.className === 'goog-te-combo') {
                  localStorage.setItem("lang", e.target.value);
                }
              });

              window.addEventListener("load", () => {
                const lang = localStorage.getItem("lang");

                if (lang) {
                  setTimeout(() => {
                    const select = document.querySelector('.goog-te-combo');
                    if (select) {
                      select.value = lang;
                      select.dispatchEvent(new Event('change'));
                    }
                  }, 1000);
                }
              });
            `,
          }}
        />

        <Script
  src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  strategy="afterInteractive"
/>

      </body>
    </html>
  );
}