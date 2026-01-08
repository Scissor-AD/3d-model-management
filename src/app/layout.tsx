import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Model Management | Design Technology Service Provider",
  description: "Professional 3D model management, laser scanning, BIM modeling, and reality capture services for architecture, construction, and engineering projects.",
  keywords: ["3D modeling", "laser scanning", "BIM", "reality capture", "point cloud", "as-built documentation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
