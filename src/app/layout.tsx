import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildVision — The Future of Equipment Selection",
  description: "AI-powered, manufacturer-neutral, standards-backed equipment selection for MEP engineers. The OpenEvidence of construction.",
  openGraph: {
    title: "BuildVision — The Future of Equipment Selection",
    description: "AI-powered, manufacturer-neutral equipment selection platform backed by AHRI data and ASHRAE standards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
