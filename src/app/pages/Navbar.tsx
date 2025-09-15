"use client";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="bg-[#181023] text-black  dark:text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/"><span className="font-bold text-3xl text-[#9B4DF4]">Convex-Convertor</span></Link>
      </div>
    </nav>
  );
}
