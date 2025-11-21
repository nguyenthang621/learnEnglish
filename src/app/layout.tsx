import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/stores/ReduxProvider";
import ExtentionTranslate from "@/components/ExtentionTranslate/ExtentionTranslate";
import { ToastContainer } from "react-toastify";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
        >
        <ToastContainer />
        <ReduxProvider>
        <ExtentionTranslate/>
          {/* <PromotionBar />
          <HeaderNavigation /> */}
            {children}
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
