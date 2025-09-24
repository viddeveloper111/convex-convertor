"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./pages/Header";
import { useSearch } from "./pages/SearchContext";
import { ToolCard } from "./pages/ToolCard";
import { ArrowLeft } from "lucide-react"; //
import {
  FileJson,
  FileCode,
  FileType,
  FileSpreadsheet,
  Link ,
  Clock,
  Braces,
  Hash,
  KeyRound,
  Palette,
  Image,
  Regex,
  Code2,
  Database,
  Shield,
  Fingerprint,
  Binary,
  Type,
  Layers,
  Settings,
  FileText,
  X,
} from "lucide-react";

/* ---------------------------------- Icon Map ---------------------------------- */
const iconMap: Record<string, React.ElementType> = {
  CSV: FileSpreadsheet,
  Base64: FileCode,
  JSON: FileJson,
  YAML: FileType,
  URL: Link,
  Timestamp: Clock,
  Query: Braces,
  HEX: Palette,
  Convert: Settings,
  "Image to Base64": Image,
  HAR: FileCode,
  Number: Binary,
  CSS: Code2,
  "CSS Units": Code2,
  Regex: Regex,
  Image: Image,
  JWT: Shield,
  Hash: Fingerprint,
  UUID: KeyRound,
  SVG: Layers,
  Lorem: Type,
  WebP: Image,
  SQL: Database,
  DOC: FileText,
  XLSX: FileSpreadsheet,
  PPT: FileType,
};

export default function JamToolsPage() {
  const router = useRouter();
  const { query } = useSearch();
  const [filter, setFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleSelect = (type: string) => {
    setFilter(type);
    setDropdownOpen(false);
  };


  /* ------------------------------- Tools Array ------------------------------- */
  const tools = [
    { name: "CSV to JSON", type: "CSV", desc: "Easily convert CSV data to JSON format.", path: "/tools/csv-to-json" },
    { name: "Base64 Encode/Decode", type: "Base64", desc: "Encode and decode Base64 data safely.", path: "/tools/base64-tool" },
    { name: "JSON Formatter", type: "JSON", desc: "Beautify and format JSON for readability.", path: "/tools/JsonFormatterCard" },
    { name: "YAML to JSON", type: "YAML", desc: "Convert YAML to JSON instantly.", path: "/tools/YamlToJson" },
    { name: "URL Encode/Decode", type: "URL", desc: "Encode or decode URLs with ease.", path: "/tools/UrlEncoderDecoder" },
    { name: "Timestamp to Date", type: "Timestamp", desc: "Convert Unix timestamps to human-readable dates.", path: "/tools/TimestampConverter" },
    { name: "Query Params → JSON", type: "Query", desc: "Turn URL parameters into JSON objects.", path: "/tools/QueryParamsToJson" },
    { name: "HEX to RGB", type: "HEX", desc: "Convert HEX colors to RGB format.", path: "/tools/HexToRgb" },
    { name: ".env → netlify.toml", type: "Convert", desc: "Transform .env variables for Netlify.", path: "/tools/EnvToNetlify" },
    { name: "Image to Base64", type: "Image to Base64", desc: "Convert images to Base64 strings.", path: "/tools/ImageToBase64" },
    { name: "JSON to CSV", type: "JSON", desc: "Turn JSON into sleek CSV format.", path: "/tools/JsonToCsv" },
    { name: "HAR File Viewer", type: "HAR", desc: "Analyze and debug HAR network files.", path: "/tools/HarViewer" },
    { name: "JSON to YAML", type: "JSON", desc: "Convert JSON to YAML effortlessly.", path: "/tools/JsonToYaml" },
    { name: "Number Base Changer", type: "Number", desc: "Switch numbers between bases.", path: "/tools/NumberBaseChanger" },
    { name: "CSS Inliner", type: "CSS", desc: "Inline CSS for better email compatibility.", path: "/tools/CssInliner" },
    { name: "Regex Tester", type: "Regex", desc: "Test & debug regular expressions.", path: "/tools/RegexTester" },
    { name: "CSS Units Converter", type: "CSS Units", desc: "Convert px to rem and more.", path: "/tools/CssUnitsConverter" },
    { name: "Image Resizer", type: "Image", desc: "Resize images while keeping ratio.", path: "/tools/ImageResizer" },
    { name: "JWT Parser", type: "JWT", desc: "Decode and inspect JWT tokens.", path: "/tools/JwtParser" },
    { name: "Hash Generator", type: "Hash", desc: "Generate MD5, SHA-256, SHA-512 hashes.", path: "/tools/HashGenerator" },
    { name: "UUID Generator", type: "UUID", desc: "Generate unique UUIDs easily.", path: "/tools/UuidGenerator" },
    { name: "SVG Viewer", type: "SVG", desc: "Preview and validate SVG code.", path: "/tools/SvgViewer" },
    { name: "Lorem Ipsum", type: "Lorem", desc: "Create placeholder text quickly.", path: "/tools/LoremIpsum" },
    { name: "WebP Converter", type: "WebP", desc: "Convert images to WebP format.", path: "/tools/WebPConverter" },
    { name: "SQL Minifier", type: "SQL", desc: "Minify SQL queries for optimization.", path: "/tools/SQLMinifier" },
    { name: "Word to PDF", type: "DOC", desc: "Convert Word documents to PDF.", path: "/tools/DocToPdfConverter" },
    { name: "JPG to PDF", type: "Image", desc: "Convert JPG/PNG images into PDFs.", path: "/tools/JpgToPdfConverter" },
    { name: "HTML to PDF", type: "Convert", desc: "Export HTML pages to PDF.", path: "/tools/HtmlToPdfConverter" },
    { name: "Excel to PDF", type: "XLSX", desc: "Transform Excel sheets to PDF.", path: "/tools/ExcelToPdfConverter" },
    { name: "PowerPoint to PDF", type: "PPT", desc: "Slides to PDF (one slide per page).", path: "/tools/PptToPdfConverter" },
    { name: "Heic to JPG",type: "Image", desc: "Convert HEIC images to JPG format.", path: "/tools/HeicToJpgConverter"},
    { name: "Markdown to HTML", type: "Document",desc: "Convert Markdown files to HTML pages.",path: "/tools/MarkdownToHtmlConverter"},
    { name: "Mp4 to Mp3",type: "Media", desc: "Extract audio from MP4 video as MP3 format.",path: "/tools/Mp4ToMp3Converter" },
    { name: "PDF Lock/Unlock",type: "PDF",desc: "Lock or unlock PDF files with a password.", path: "/tools/PDFlockunlock" }
    ];

  const toolTypes = Array.from(new Set(tools.map(t => t.type)));

  const filteredTools = tools.filter(t => {
    const q = query.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
    const matchesFilter = filter ? t.type === filter : true;
    return matchesSearch && matchesFilter;
  });

 const handleClick = () => {
  router.push("/resume");
};


  /* ------------------------------ UI Rendering ------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      {/* Optional site header */}

      <main className="container mx-auto px-4 py-12">
        {/* Sticky top controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 z-40 bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-md p-4 rounded-xl">
        <div>
          {/* Resume Button */}
          <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 border border-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-purple-500/40 hover:scale-105 transition"
    >
      <FileText className="w-5 h-5" />
      Build My Resume
    </button>

    </div>


          {/* Dropdown */}
          <div className="relative w-full md:w-60">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-black/40 text-white rounded-lg border border-purple-600 shadow-md hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <span className="flex items-center gap-2">
                {filter ? React.createElement(iconMap[filter] ?? FileText, { className: "w-4 h-4" }) : <FileText className="w-4 h-4" />}
                {filter || "All Categories"}
              </span>
              <span className="ml-2">▼</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute z-50 mt-2 w-full bg-black/70 backdrop-blur-lg border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto">
                <li
                  onClick={() => handleSelect("")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-purple-600/30 cursor-pointer transition"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>All Categories</span>
                </li>
                {toolTypes.map(type => {
                  const Icon = iconMap[type] || FileText;
                  return (
                    <li
                      key={type}
                      onClick={() => handleSelect(type)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-purple-600/30 cursor-pointer transition"
                    >
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span>{type}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => {
              const Icon = iconMap[tool.type] || FileText;
              return (
                <ToolCard
                  key={idx}
                  title={tool.name}
                  description={tool.desc}
                  category={tool.type}
                  icon={Icon}
                  onClick={() => router.push(tool.path)}
                />
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No tools found for “{query}”.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
