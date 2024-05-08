import React from "react";
import "./globals.css";
import { LoadManagerWithRedux } from "./LoadManagerWithRedux.js";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "sim",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='font font-color bg-color layout'>
        <LoadManagerWithRedux>{children}</LoadManagerWithRedux>
        <SpeedInsights />
      </body>
    </html>
  );
}
