import React from "react";
import "./globals.css";
import { LoadManagerWithRedux } from "./LoadManagerWithRedux.js";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "sim",
  description: "sim's portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='font font-color bg-color layout'>
        <SpeedInsights />
        <LoadManagerWithRedux>{children}</LoadManagerWithRedux>
      </body>
    </html>
  );
}
