import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import LeagueNav from "./components/LeagueNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giveaway Gameplan",
  description: "Your one stop shop for finding stadium giveaways",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="
        selection:bg-amber-500 selection:text-zinc-900
        bg-sky-950
        "
    >
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased
          pb-24
          flex flex-col gap-10
          `}
      >
        <Header />
        <LeagueNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
