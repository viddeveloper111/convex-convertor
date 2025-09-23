"use client";

import React, { useState } from "react";
import Header from "./pages/Header";
import "./globals.css";
import Footer from "./pages/Footer";
import { SearchProvider } from "./pages/SearchContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [search, setSearch] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="flex flex-col min-h-screen bg-black text-white bg-gradient-to-br"
        suppressHydrationWarning
      >
   
        {/* ✅ Wrap everything with SearchProvider */}
        <SearchProvider>
          <Header
            onSearch={(q) => setSearch(q)}
            onCommandPalette={() => setCommandPaletteOpen(true)}
          />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
