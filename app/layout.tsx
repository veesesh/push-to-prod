import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeetingMind — Meeting Notes To Clear Execution",
  description:
    "Turn messy transcripts into clear action items, blockers, and leadership-ready updates with Claude and Genspark.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
