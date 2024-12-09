import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Header from "./_layout/Header";
import Footer from "./_layout/Footer";
import { Montserrat } from "next/font/google";
import ProviderClient from "./provider/Providers";
import { Toaster } from "react-hot-toast";
import SessionProviderClient from "./provider/SessionProviderClient";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "400", "700"],
  adjustFontFallback: false,
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "MERN Stack Project",
  description: "Ecommerce Website using MERN Stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${montserrat.className}`}>
        <SessionProviderClient>
          <ProviderClient>
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            {children}
            <Footer />
          </ProviderClient>
        </SessionProviderClient>
        
      </body>
    </html>
  );
}
