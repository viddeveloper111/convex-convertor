"use client";

import React from "react";
import Navbar from "./pages/Navbar";
import "./globals.css";
import Footer from "./pages/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer/>
      </body>
    </html>
  );
}
