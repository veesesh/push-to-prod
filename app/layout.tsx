import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetingMind — AI Action Plan Generator",
  description:
    "Turn messy meeting transcripts into clear tasks, owners, and exec reports — powered by Claude + Genspark.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
