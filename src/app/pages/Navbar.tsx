"use client";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="bg-white text-black dark:bg-gray-900 dark:text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/"><span className="font-bold text-3xl">Comax Converter</span></Link>
      </div>
    </nav>
  );
}
