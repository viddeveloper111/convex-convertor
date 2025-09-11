"use client";

import React from "react";
import Header from "./pages/Header";
import "./globals.css";
import Footer from "./pages/Footer";

interface LayoutProps {
  children: React.ReactNode;
}



export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="flex flex-col min-h-screen bg-black text-white bg-gradient-to-br"
        suppressHydrationWarning
      >
        {/* <Header onSearch={() => {}} onCommandPalette={() => {}} /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

