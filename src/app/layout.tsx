"use client";

import React, { useState } from "react";
import Header from "./pages/Header";
import "./globals.css";
import Footer from "./pages/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [search, setSearch] = useState(""); // same as JamToolsPage
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="flex flex-col min-h-screen bg-black text-white bg-gradient-to-br"
        suppressHydrationWarning
      >
        {/* 🔹 Global Header */}
        <Header
          onSearch={(q) => setSearch(q)} // search handling
          onCommandPalette={() => setCommandPaletteOpen(true)} // open palette
        />

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* 🔹 Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
