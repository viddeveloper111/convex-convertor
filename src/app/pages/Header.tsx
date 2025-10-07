"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

/* Small link helper */
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
      className="flex items-center gap-2 px-2 py-2 text-sm text-black hover:bg-white rounded"
    >
      <Icon className="h-4 w-4 text-purple-700 shrink-0" />
      {label}
    </Link>
  );
}

/* Reusable dropdown wrapper */
function Dropdown({
  label,
  width,
  children,
}: {
  label: string;
  width: string;
  children: React.ReactNode;
}) {
  const [hideOnClick, setHideOnClick] = useState(false);

  const handleClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) {
      setHideOnClick(true);
      setTimeout(() => setHideOnClick(false), 10000);
    }
  };

  return (
    <div className="relative group focus-within:z-50 w-full" onClick={handleClickInside}>
      <Button
        variant="ghost"
        className="flex items-center gap-1 text-black hover:bg-gray-200 focus:outline-none"
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </Button>
      <div
        className={`absolute left-1/2 ${width} -translate-x-1/2 rounded-xl bg-gray-200 border border-gray-300 shadow-lg
          ${!hideOnClick ? "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:scale-100" : "opacity-0 scale-95 pointer-events-none"}
          transition ease-out duration-150`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        console.log("Cmd/Ctrl + K pressed");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-200 text-black backdrop-blur-md shadow-lg overflow-visible">
      <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center shadow-lg border border-gray-700">
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
          <Link
            href="/"
            className="text-lg md:text-xl font-extrabold text-black tracking-wide"
          >
            Convex Tools
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 relative overflow-visible ">
          {/* Example dropdown */}
          <Dropdown label="SIZE REDUCER" width="w-36">
            <div className="grid grid-cols-1 divide-y divide-gray-400/40">
              <div className="p-4">
                <LinkItem href="/size/ImageSize" icon={ImageIcon} label="Image Size" />
                <LinkItem href="/size/PdfSize" icon={ImageIcon} label="PDF Size" />
                <LinkItem href="/size/WordSize" icon={ImageIcon} label="Word Size" />
              </div>
            </div>
          </Dropdown>


         <Dropdown label="ALL CONVERT TOOLS" width="w-[57rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-gray-400/40">
          
          <div className="p-4">
            <div className="mb-2 text-xs font-bold text-black  uppercase tracking-wide">
              Convert Tools
            </div>
            <LinkItem href="/tools/JpgToPdfConverter" icon={ImageIcon} label="JPG → PDF"/>
            <LinkItem href="/tools/DocToPdfConverter" icon={FileText} label="Word → PDF" />
            <LinkItem href="/tools/PptToPdfConverter" icon={Presentation} label="PowerPoint → PDF" />
            <LinkItem href="/tools/ExcelToPdfConverter" icon={Table} label="Excel → PDF" />
            <LinkItem href="/tools/HtmlToPdfConverter" icon={Code} label="HTML → PDF" />
            <LinkItem href="/tools/PdfToJpgConverter" icon={ImageIcon} label="PDF → JPG" />
            <LinkItem href="/tools/PdfToWordConverter" icon={FileText} label="PDF → Word" />
            <LinkItem href="/tools/PdfToPptConverter" icon={Presentation} label="PDF → PowerPoint" />
            <LinkItem href="/tools/PdfToExcelConverter" icon={Table} label="PDF → Excel" />
            <LinkItem href="/tools/PdfToHtmlConverter" icon={FileCheck} label="PDF → HTML" />
          </div>

    
          <div className="p-4">
            <div className="mb-2 text-xs font-bold text-black uppercase tracking-wide">
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

          <div className="p-4">
            <div className="mb-2 text-xs font-bold text-black uppercase tracking-wide">
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

        
          <div className="p-4">
            <div className="mb-2 text-xs font-bold text-black uppercase tracking-wide">
              Convert Tools
            </div>
            <LinkItem href="/tools/UuidGenerator" icon={FileText} label="UUID GENERATOR" />
            <LinkItem href="/tools/SvgViewer" icon={Presentation} label="SVG VIEWER" />
            <LinkItem href="/tools/LoremIpsum" icon={Table} label="LOREM IPSUM" />
            <LinkItem href="/tools/WebPConverter" icon={ImageIcon} label="WEBP CONVERTER" />
            <LinkItem href="/tools/SQLMinifier" icon={FileText} label="SQL MINIFIER" />
          </div>
        </div>
      </Dropdown>
         <Dropdown label="CONVERT PDF" width="w-[24rem]">
  <div className="grid grid-cols-2 divide-x divide-gray-400/40 ">

    <div className="p-4">
      <div className="mb-2 text-xs font-bold text-black uppercase tracking-wide">
        Convert To PDF
      </div>
      <LinkItem href="/tools/JpgToPdfConverter" icon={ImageIcon} label="JPG → PDF" />
      <LinkItem href="/tools/DocToPdfConverter" icon={FileText} label="Word → PDF" />
      <LinkItem href="/tools/PptToPdfConverter" icon={Presentation} label="PowerPoint → PDF" />
      <LinkItem href="/tools/ExcelToPdfConverter" icon={Table} label="Excel → PDF" />
      <LinkItem href="/tools/HtmlToPdfConverter" icon={Code} label="HTML → PDF" />
    </div>


    <div className="p-4">
      <div className="mb-2 text-xs font-bold text-black  uppercase tracking-wide">
        Convert From PDF
      </div>
      <LinkItem href="/tools/PdfToJpgConverter" icon={ImageIcon} label="PDF → JPG" />
      <LinkItem href="/tools/PdfToWordConverter" icon={FileText} label="PDF → Word" />
      <LinkItem href="/tools/PdfToPptConverter" icon={Presentation} label="PDF → PowerPoint" />
      <LinkItem href="/tools/PdfToExcelConverter" icon={Table} label="PDF → Excel" />
      <LinkItem href="/tools/PdfToHtmlConverter" icon={FileCheck} label="PDF → HTML" />
    </div>
  </div>
</Dropdown>

         <Dropdown label="IMAGE TOOLS" width="w-[22rem]">
  <div className="grid grid-cols-2 divide-x divide-gray-400/40">
   
    <div className="p-4">
      <div className="mb-2 text-xs font-bold text-black  uppercase tracking-wide">
        Optimize / Convert
      </div>
      <LinkItem href="/tools/ImageResizer" icon={ImageIcon} label="Image Resizer" />
      <LinkItem href="/tools/WebPConverter" icon={ImageIcon} label="WEBP Converter" />
      <LinkItem href="/tools/ImageToBase64" icon={ImageIcon} label="Image → Base64" />
    </div>


    <div className="p-4">
      <div className="mb-2 text-xs font-bold text-black uppercase tracking-wide">
        Misc
      </div>
      <LinkItem href="/tools/SvgViewer" icon={ImageIcon} label="SVG Viewer" />
    </div>
  </div>
</Dropdown>

         <Dropdown label="DEVELOPER TOOLS" width="w-[28rem]">
  <div className="grid grid-cols-2  divide-x divide-gray-400/40">
 
    <div className="p-4">
      <div className="mb-2 text-xs font-bold text-black  uppercase tracking-wide">
        Format / Encode
      </div>
      <LinkItem href="/tools/JsonFormatterCard" icon={FileText} label="JSON Formatter" />
      <LinkItem href="/tools/csv-to-json" icon={FileText} label="CSV → JSON" />
      <LinkItem href="/tools/JsonToCsv" icon={FileText} label="JSON → CSV" />
      <LinkItem href="/tools/UrlEncoderDecoder" icon={Code} label="URL Encode/Decode" />
      <LinkItem href="/tools/base64-tool" icon={Code} label="Base64 Encode/Decode" />
    </div>

   
    <div className="p-4">
      <div className="mb-2 text-xs font-bold text-black  uppercase tracking-wide">
        Utilities
      </div>
      <LinkItem href="/tools/RegexTester" icon={Code} label="Regex Tester" />
      <LinkItem href="/tools/HashGenerator" icon={FileCheck} label="Hash Generator" />
      <LinkItem href="/tools/JwtParser" icon={FileCheck} label="JWT Parser" />
      <LinkItem href="/tools/TimestampConverter" icon={FileCheck} label="Timestamp → Date" />
    </div>
  </div>
</Dropdown>



        </nav>
        <div>
 {/* Build Resume Button */}
  <Link href="/">
    <button className="inline-flex items-center border border-gray-400 text-black p-1  rounded-lg shadow-md hover:shadow-gray-500/40 hover:scale-105 transition" >
    <FileText className=" h-5" />
    Build My Resume
  </button>

  </Link>
  </div>
        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 text-black"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-4">

        </div>
      )}
    </header>
  );
}
