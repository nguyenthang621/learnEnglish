import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PromotionBar from "@/components/PromotionBar/PromotionBar";
import HeaderNavigation from "@/components/HeaderNavigation/HeaderNavigation";
import Footer from "@/components/Footer/Footer";
import { ReduxProvider } from "@/stores/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning English",
  description: "Learning English Everyday",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ReduxProvider>
        <PromotionBar />
        <HeaderNavigation />
          {children}
        {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
