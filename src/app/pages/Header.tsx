"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearch } from "./SearchContext";
import {
  Search,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Presentation,
  Table,
  Code,
  FileCheck,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";

function LinkItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-2 py-2 text-sm text-white hover:bg-purple-600 rounded"
    >
      <Icon className="h-4 w-4 text-purple-400" />
      {label}
    </Link>
  );
}

interface HeaderProps {
  onSearch: (query: string) => void;
  onCommandPalette: () => void;
}

export default function Header({ onSearch, onCommandPalette }: HeaderProps) {
  const { query, setQuery } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  // Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onCommandPalette();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCommandPalette]);

  return (
    <header className="sticky top-0 z-50 w-full bg-purple-700 backdrop-blur-md shadow-lg border-b border-purple-600">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-lg bg-gray-900 flex items-center justify-center shadow-lg border border-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="h-8 w-8 text-purple-400"
              fill="currentColor"
            >
              <path d="M28 12c-8.8 0-16 7.2-16 16s7.2 16 16 16h4v-6h-4c-5.5 0-10-4.5-10-10s4.5-10 10-10h4v-6h-4z" />
              <path d="M44 12c-8.8 0-16 7.2-16 16s7.2 16 16 16h4v-6h-4c-5.5 0-10-4.5-10-10s4.5-10 10-10h4v-6h-4z" />
              <path d="M52 8l-4 4 2 2-8 8 4 4 8-8 2 2 4-4-8-8z" />
            </svg>
          </div>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-white tracking-wide">
              Convex Converter
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {/* ALL CONVERT TOOLS dropdown */}
          <div className="relative group">
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-white hover:bg-purple-600"
            >
              ALL CONVERT TOOLS
              <ChevronDown />
            </Button>
            <div
              className="
                absolute left-1/2 mt-2 w-[60rem] rounded-xl bg-gray-900 border border-purple-400 shadow-lg
                -translate-x-1/2 opacity-0 scale-95 pointer-events-none
                group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                transition ease-out duration-150
              "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-purple-500/40">
                {/* first column */}
                <div className="p-4">
                  <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
                    Convert Tools
                  </div>
                  <LinkItem href="/tools/JpgToPdfConverter" icon={ImageIcon} label="JPG → PDF" />
                  <LinkItem href="/tools/DocToPdfConverter" icon={FileText} label="Word → PDF" />
                  <LinkItem href="/tools/PptToPdfConverter" icon={Presentation} label="PowerPoint → PDF" />
                  <LinkItem href="/tools/ExcelToPdfConverter" icon={Table} label="Excel → PDF" />
                  <LinkItem href="/tools/HtmlToPdfConverter" icon={Code} label="HTML → PDF" />
                  <LinkItem href="/tools/pdf-to-jpg" icon={ImageIcon} label="PDF → JPG" />
                  <LinkItem href="/tools/pdf-to-word" icon={FileText} label="PDF → Word" />
                  <LinkItem href="/tools/pdf-to-powerpoint" icon={Presentation} label="PDF → PowerPoint" />
                  <LinkItem href="/tools/pdf-to-excel" icon={Table} label="PDF → Excel" />
                  <LinkItem href="/tools/pdf-to-pdfa" icon={FileCheck} label="PDF → PDF/A" />
                </div>
                {/* Column 2 */}
                 <div className="p-4">
                 <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
                   Convert Tools
                 </div>
                 <LinkItem href="/tools/csv-to-json" icon={FileText} label="CSV → JSON" />
                 <LinkItem href="/tools/base64-tool" icon={Code} label="ENCODE → DECODE" />
                 <LinkItem href="/tools/JsonFormatterCard" icon={FileText} label="JSON FORMATTER" />
                 <LinkItem href="/tools/YamlToJson" icon={Code} label="YAML → JSON" />
                 <LinkItem href="/tools/UrlEncoderDecoder" icon={Code} label="URL ENCODE → DECODE" />
                 <LinkItem href="/tools/TimestampConverter" icon={FileCheck} label="TIMESTAMP → DATE" />
                 <LinkItem href="/tools/QueryParamsToJson" icon={FileCheck} label="PARAMETER → JSON" />
                 <LinkItem href="/tools/HexToRgb" icon={FileCheck} label="HEX → RGB" />
                 <LinkItem href="/tools/EnvToNetlify" icon={FileCheck} label=".ENV → NETLIFY.TOML" />
                 <LinkItem href="/tools/ImageToBase64" icon={ImageIcon} label="IMAGE → BASE64" />
             </div>
             {/* Column 3 */}
              <div className="p-4">
          <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
               Convert Tools
             </div>
             <LinkItem href="/tools/JsonToCsv" icon={FileText} label="JSON → CSV" />
             <LinkItem href="/tools/HarViewer" icon={FileText} label="HARFILE VIEWER" />
             <LinkItem href="/tools/JsonToYaml" icon={Code} label="JSON → YAML" />
             <LinkItem href="/tools/NumberBaseChanger" icon={Table} label="NUMBER BASE CHANGE" />
             <LinkItem href="/tools/CssInliner" icon={Code} label="CSS INLINER FOR EMAIL" />
             <LinkItem href="/tools/RegexTester" icon={Code} label="REGEX TESTER" />
             <LinkItem href="/tools/CssUnitsConverter" icon={Code} label="CSS → UNIT" />
             <LinkItem href="/tools/ImageResizer" icon={ImageIcon} label="IMAGE RESIZER" />
             <LinkItem href="/tools/JwtParser" icon={FileCheck} label="JWT PARSER" />
           <LinkItem href="/tools/HashGenerator" icon={FileCheck} label="HASH GENERATOR" />
      
           </div>
      
           {/* Column 4 */}
           <div className="p-4">
             <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
               Convert Tools
             </div>
             <LinkItem href="/tools/UuidGenerator" icon={FileText} label="UUID GENERATOR" />
             <LinkItem href="/tools/SvgViewer" icon={Presentation} label="SVG VIEWER" />
             <LinkItem href="/tools/LoremIpsum" icon={Table} label="LOREM IPSUM" />
             <LinkItem href="/tools/WebPConverter" icon={ImageIcon} label="WEBP CONVERTER" />
             <LinkItem href="/tools/SQLMinifier" icon={FileText} label="SQL MINIFIER" />
           </div>
              </div>
            </div>
          </div>
            {/* Convert PDF Dropdown */}
         <div id="pdf-dropdown" className="relative group">
           <Button
             variant="ghost"
             className="flex gap-1 text-white hover:bg-purple-600 "
           >
             CONVERT PDF
             <ChevronDown />
           </Button>

              <div
                className="
                  absolute left-1/2 mt-2 w-[30rem] rounded-xl bg-gray-900 border border-purple-400 shadow-lg
                  -translate-x-1/2
                  opacity-0 scale-95 pointer-events-none
                  group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                  transition ease-out duration-150
                "
              >
                <div className="grid grid-cols-2 divide-x divide-purple-500/40">
                  {/* Left */}
                  <div className="p-4">
                    <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
                      Convert To PDF
                    </div>
                    <LinkItem href="/tools/JpgToPdfConverter" icon={ImageIcon} label="JPG → PDF" />
                    <LinkItem href="/tools/DocToPdfConverter" icon={FileText} label="Word → PDF" />
                    <LinkItem href="/tools/PptToPdfConverter" icon={Presentation} label="PowerPoint → PDF" />
                    <LinkItem href="/tools/ExcelToPdfConverter" icon={Table} label="Excel → PDF" />
                    <LinkItem href="/tools/HtmlToPdfConverter" icon={Code} label="HTML → PDF" />
                  </div>  
                  {/* Right */}
                  <div className="p-4">
                    <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
                      Convert From PDF
                    </div>
                    <LinkItem href="/tools/pdf-to-jpg" icon={ImageIcon} label="PDF → JPG" />
                    <LinkItem href="/tools/pdf-to-word" icon={FileText} label="PDF → Word" />
                    <LinkItem href="/tools/pdf-to-powerpoint" icon={Presentation} label="PDF → PowerPoint" />
                    <LinkItem href="/tools/pdf-to-excel" icon={Table} label="PDF → Excel" />
                    <LinkItem href="/tools/pdf-to-pdfa" icon={FileCheck} label="PDF → PDF/A" />
                  </div>
                </div>
              </div>
            </div>

        
    {/* 🖼️ Image Tools Dropdown */}
    <div id="image-dropdown" className="relative group">
      <Button
        variant="ghost"
        className="flex items-center gap-1 text-white hover:bg-purple-600 "
      >
        IMAGE TOOLS
        <ChevronDown />
      </Button>

      <div
        className="
          absolute left-1/2 mt-2 w-[28rem] rounded-xl bg-gray-900 border border-purple-400 shadow-lg
          -translate-x-1/2
          opacity-0 scale-95 pointer-events-none
          group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
          transition ease-out duration-150
        "
      >
        <div className="grid grid-cols-2 divide-x divide-purple-500/40">
          <div className="p-4">
            <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
              Optimize / Convert
            </div>
            <LinkItem href="/tools/ImageResizer" icon={ImageIcon} label="Image Resizer" />
            <LinkItem href="/tools/WebPConverter" icon={ImageIcon} label="WEBP Converter" />
            <LinkItem href="/tools/ImageToBase64" icon={ImageIcon} label="Image → Base64" />
          </div>
          <div className="p-4">
            <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
              Misc
            </div>
            <LinkItem href="/tools/SvgViewer" icon={ImageIcon} label="SVG Viewer" />
          </div>
        </div>
      </div>
    </div>

   {/* 💻 Developer Tools Dropdown */}
   <div id="dev-dropdown" className="relative group">
     <Button
       variant="ghost"
       className="flex items-center gap-1 text-white hover:bg-purple-600 "
     >
       DEVELOPER TOOLS
       <ChevronDown />
     </Button>

      <div
        className="
          absolute left-1/2 mt-2 w-[32rem] rounded-xl bg-gray-900 border border-purple-400 shadow-lg
          -translate-x-1/2
          opacity-0 scale-95 pointer-events-none
          group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
          transition ease-out duration-150
        "
      >
        <div className="grid grid-cols-2 divide-x divide-purple-500/40">
          <div className="p-4">
            <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
              Format / Encode
            </div>
            <LinkItem href="/tools/JsonFormatterCard" icon={FileText} label="JSON Formatter" />
            <LinkItem href="/tools/csv-to-json" icon={FileText} label="CSV → JSON" />
            <LinkItem href="/tools/JsonToCsv" icon={FileText} label="JSON → CSV" />
            <LinkItem href="/tools/UrlEncoderDecoder" icon={Code} label="URL Encode/Decode" />
            <LinkItem href="/tools/base64-tool" icon={Code} label="Base64 Encode/Decode" />
          </div>
          <div className="p-4">
            <div className="mb-2 text-xs font-semibold text-purple-300 uppercase tracking-wide">
              Utilities
            </div>
            <LinkItem href="/tools/RegexTester" icon={Code} label="Regex Tester" />
            <LinkItem href="/tools/HashGenerator" icon={FileCheck} label="Hash Generator" />
            <LinkItem href="/tools/JwtParser" icon={FileCheck} label="JWT Parser" />
            <LinkItem href="/tools/TimestampConverter" icon={FileCheck} label="Timestamp → Date" />
          </div>
        </div>
      </div>
    </div>

        </nav>

        {/* Search (desktop) */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
          <Input
            id="global-search"
            placeholder="Search tools..."
            value={query}
            onChange={handleSearchChange}
            className="w-64 pl-10 pr-4 bg-gray-900 border-2 border-purple-400 rounded-md text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-purple-600 px-4 py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <Input
              placeholder="Search tools..."
              value={query}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 bg-gray-800 border-2 border-purple-400 rounded-md text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
            />
          </div>
          {/* quick links for mobile */}
          <Link href="/tools/JpgToPdfConverter" className="block text-white hover:text-purple-300">
            JPG → PDF
          </Link>
          <Link href="/tools/pdf-to-jpg" className="block text-white hover:text-purple-300">
            PDF → JPG
          </Link>
        </div>
      )}
    </header>
  );
}
