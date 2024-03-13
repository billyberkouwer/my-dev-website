import type { Metadata } from "next";
import "@/styles/global.scss";
import { Mondwest } from "./font/font";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Web Development & 3D | Billy Myles-Berkouwer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Mondwest.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
