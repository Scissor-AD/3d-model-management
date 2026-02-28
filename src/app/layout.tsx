import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "3D Model Management | Design Technology Service Provider",
  description: "Professional 3D model management, laser scanning, BIM modeling, and reality capture services for architecture, construction, and engineering projects.",
  keywords: ["3D modeling", "laser scanning", "BIM", "reality capture", "point cloud", "as-built documentation"],
  metadataBase: new URL("https://3dmodelmanagement.com"),
  openGraph: {
    title: "3D Model Management",
    description: "Reality capture, laser scanning, BIM modeling, and digital twin services for architecture, construction, and engineering.",
    siteName: "3D Model Management",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Model Management",
    description: "Reality capture, laser scanning, BIM modeling, and digital twin services for architecture, construction, and engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts - Neue Haas Grotesk */}
        <link rel="stylesheet" href="https://use.typekit.net/uwa5jwq.css" />
      </head>
      <body className="antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
