import type { Metadata } from "next";
import "@/styles/global.scss";
import { Mondwest } from "./font/font";
import Layout from "@/components/layout/Layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const url = process.env.SITE_URL as string;

export const metadata: Metadata = {
  title: "Web Development & 3D - Billy Myles-Berkouwer",
  metadataBase: new URL(url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Mondwest.className}>
        <SpeedInsights />
        <Analytics />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
