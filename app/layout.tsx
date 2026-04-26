import type { Metadata } from "next";
import { Nunito, Lato } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "From Boards to Beakers — STEM Activity Sheets for Board Games",
  description:
    "Free STEM activity sheets and hands-on experiments connected to the board games kids already love — for classrooms, game nights, and curious minds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
