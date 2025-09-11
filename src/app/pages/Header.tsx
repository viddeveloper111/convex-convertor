"use client";

import { useState, useEffect } from "react";
import { Search, Github, Command } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import Link from "next/link";

interface HeaderProps {
  onSearch: (query: string) => void;
  onCommandPalette: () => void;
}

export function Header({ onSearch, onCommandPalette }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onCommandPalette();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCommandPalette]);

  return (
    <header className="sticky top-0 z-50 w-full bg-purple-700 backdrop-blur-md shadow-lg border-b border-purple-600">
  <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
    {/* Left Logo + Title */}
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 backdrop-blur-md flex items-center justify-center shadow-md border border-gray-700">
          <span className="text-sm font-bold text-white">C</span>
        </div>

        <Link href="/" className="text-lg font-bold text-white">
          Convex Converter
        </Link>
      </div>
    </div>

    {/* Right Actions */}
    <div className="flex items-center gap-4">
      {/* Search Input */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
        <Input
          placeholder="Search tools..."
          value={searchValue}
          onChange={handleSearchChange}
          className="
            w-80 pl-10 pr-16 
            bg-gray-900 
            border-2 border-purple-400 
            rounded-md 
            text-sm text-white 
            placeholder-gray-400 
            focus:ring-2 focus:ring-purple-400
            transition
          "
        />
      </div>

      {/* GitHub Button */}
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border border-gray-900 bg-black text-white hover:bg-gray-800 hover:text-white"
      >
        <a
          href="https://github.com/jam-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Github className="h-4 w-4 mr-2" />
          Contribute
        </a>
      </Button>
    </div>
  </div>
</header>

  );
}

export default Header;
