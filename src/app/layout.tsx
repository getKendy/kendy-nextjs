import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

// import { headers } from "next/headers";
import Header from "./_component/header";
import TickerStats from "./_component/ticker-stats";
import BaroStats from "./_component/baro-stats";



const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GetKendy - Home",
  description: "Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI",
  openGraph: {
    title: "GetKendy",
    description: "Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI",
    url: "https://crypto.hezik.nl",
    siteName: "GetKendy",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arcadegames",
    creator: "@arcadegames",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${["font-sans", fontSans.variable].join(" ")} flex min-h-screen flex-col bg-gradient-to-b from-[#362f3d] to-[#15162c] text-white`}>
          <Header />
          <div className="flex flex-wrap justify-between">
            <BaroStats />
            <TickerStats />
          </div>
          {props.children}
      </body>
    </html>
  );
}
