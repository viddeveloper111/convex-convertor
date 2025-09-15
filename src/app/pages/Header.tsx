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
      <div className=" mx-auto flex h-16 items-center justify-between px-4">
        {/* Left Logo + Title */}
        <div className="flex items-center gap-2">
          {/* Custom CC Logo */}
          <div className="h-12 w-12 rounded-lg bg-gray-900 flex items-center justify-center shadow-lg border border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="h-8 w-8 text-purple-400"
              fill="currentColor"
            >
              {/* Outer C */}
              <path d="M28 12c-8.8 0-16 7.2-16 16s7.2 16 16 16h4v-6h-4c-5.5 0-10-4.5-10-10s4.5-10 10-10h4v-6h-4z"/>
              {/* Inner C */}
              <path d="M44 12c-8.8 0-16 7.2-16 16s7.2 16 16 16h4v-6h-4c-5.5 0-10-4.5-10-10s4.5-10 10-10h4v-6h-4z"/>
              {/* Small wrench accent on top right */}
              <path d="M52 8l-4 4 2 2-8 8 4 4 8-8 2 2 4-4-8-8z"/>
            </svg>
          </div>
          <Link href={"/"} className="flex items-center">
          <span className="text-xl font-extrabold text-white tracking-wide">
            Convex Converter
          </span>
          </Link>
        </div>

        {/* Right Actions - Search Input Only */}
        <div className="flex-1 flex justify-end">
          {/* Search Input */}
          <div className="relative hidden md:block mr-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <Input
              placeholder="Search tools..."
              value={searchValue}
              onChange={handleSearchChange}
              className="
                w-64 pl-10 pr-4 
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
        </div>
      </div>
    </header>
  );
}

export default Header;