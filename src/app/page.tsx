"use client";

import React, { useState } from "react";
import { Header } from "./pages/Header";
import { ToolCard } from "./pages/ToolCard";
import {
  FileJson,
  FileCode,
  FileType,
  FileSpreadsheet,
  Link,
  Clock,
  Braces,
  Hash,
  Key,
  Palette,
  Image,
  Regex,
  Code2,
  Database,
  Shield,
  Fingerprint,
  KeyRound,
  Binary,
  Type,
  Layers,
  Settings,
  FileText,
} from "lucide-react";

export default function JamToolsPage() {
  // 🔹 Icon Map
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
  };

  const tools = [
    {
      name: "CSV to JSON",
      type: "CSV",
      desc: "Easily convert CSV data to JSON format with our free tool. Quickest way to turn tabular data into a JSON format for APIs and data processing.",
      path: "/tools/csv-to-json",
    },
    {
      name: "Base64 Encode/Decode",
      type: "Base64",
      desc: "Easily encode and decode Base64 data with our online utility, so you can transmit your data safely or decode Base64-encoded strings.",
      path: "/tools/base64-tool",
    },
    {
      name: "JSON Formatter",
      type: "JSON",
      desc: "Format and beautify your JSON data for better readability and debugging. Quickly visualize and organize your JSON data with ease.",
      path: "/tools/JsonFormatterCard",
    },
    {
      name: "YAML to JSON",
      type: "YAML",
      desc: "Easily convert YAML to JSON with our converter. Useful when you're working with configuration files and need to switch between them.",
      path: "/tools/YamlToJson",
    },
    {
      name: "URL Encode/Decode",
      type: "URL",
      desc: "Convert URLs to a safe format with URL encoding or decode URL-encoded strings back to their original format.",
      path: "/tools/UrlEncoderDecoder",
    },
    {
      name: "Timestamp to Date Converter",
      type: "Timestamp",
      desc: "Paste Unix timestamps and get a human readable dates. Perfect for developers working with time-based data.",
      path: "/tools/TimestampConverter",
    },
    {
      name: "Query Parameters to JSON",
      type: "Query",
      desc: "Convert URL query parameters into a structured JSON object, simplifying the process of parsing and manipulating URL data in web applications.",
      path: "/tools/QueryParamsToJson",
    },
    {
      name: "HEX to RGB Converter",
      type: "HEX",
      desc: "Convert HEX to RGB and generate CSS snippets for web, Swift, and Android with our easy-to-use color converter.",
      path: "/tools/HexToRgb",
    },
    {
      name: "Convert .env to netlify.toml",
      type: "Convert",
      desc: "This free tool allows you to quickly and easily convert your .env file variables into the format needed for your netlify.toml file.",
      path: "/tools/EnvToNetlify",
    },
    {
      name: "Image to Base64 Converter",
      type: "Image to Base64",
      desc: "Instantly convert images to Base64 strings. Embed images directly in your code. Fast, free, and developer-friendly.",
      path: "/tools/ImageToBase64",
    },
    {
      name: "JSON to CSV",
      type: "JSON",
      desc: "Transform your JSON data into sleek CSV format with Jam's free online converter. Simply paste your JSON and watch the magic happen!",
      path: "/tools/JsonToCsv",
    },
    {
      name: "HAR file viewer",
      type: "HAR",
      desc: "Easily view and analyze HAR files online for free. Debug web traffic and network performance. Open source & ad-free.",
      path: "/tools/HarViewer",
    },
    {
      name: "JSON to YAML",
      type: "JSON",
      desc: "Easily convert JSON to YAML with our converter. Perfect for when you're juggling configuration files and need a switch between formats.",
      path: "/tools/JsonToYaml",
    },
    {
      name: "Number Base Changer",
      type: "Number",
      desc: "Easily convert numbers between different bases (binary, octal, decimal, hexadecimal) with our free online Number Base Changer.",
      path: "/tools/NumberBaseChanger",
    },
    {
      name: "CSS Inliner for Email",
      type: "CSS",
      desc: "Easily convert your CSS styles to inline styles directly in your HTML. Perfect for improving email compatibility and reducing external stylesheet dependencies.",
      path: "/tools/CssInliner",
    },
    {
      name: "Regex Tester",
      type: "Regex",
      desc: "Test and debug your regular expressions in real-time. Provides quick feedback on pattern matching for strings.",
      path: "/tools/RegexTester",
    },
    {
      name: "CSS Units Converter",
      type: "CSS Units",
      desc: "Easily convert px to rem with our simple CSS unit converter. Quickly transform pixel values to rem units for better scalability and accessibility.",
      path: "/tools/CssUnitsConverter",
    },
    {
      name: "Image Resizer",
      type: "Image",
      desc: "Resize images while maintaining aspect ratio and choose between PNG and JPEG formats with our free tool.",
      path: "/tools/ImageResizer",
    },
    {
      name: "JWT Parser",
      type: "JWT",
      desc: "Easily decode JWT tokens and view their header, payload, and signature. Perfect for debugging and analyzing JSON Web Tokens.",
      path: "/tools/JwtParser",
    },
    {
      name: "Hash Generator",
      type: "Hash",
      desc: "Quickly generate secure hashes for your text using algorithms like SHA-256, SHA-512, MD5, and more. Ideal for password hashing, data integrity checks, and cryptographic applications.",
      path: "/tools/HashGenerator",
    },
    {
      name: "UUID Generator",
      type: "UUID",
      desc: "Generate random UUIDs. Useful for creating unique identifiers for various applications such as database keys, session IDs, and more.",
      path: "/tools/UuidGenerator",
    },
    {
      name: "SVG Viewer",
      type: "SVG",
      desc: "Instantly preview and validate SVG code in your browser. Perfect for developers working with vector graphics and debugging SVG markup.",
      path: "/tools/SvgViewer",
    },
    {
      name: "Lorem Ipsum Generator",
      type: "Lorem",
      desc: "Easily generate random Lorem Ipsum text for your design projects. Perfect for placeholder content and layout previews.",
      path: "/tools/LoremIpsum",
    },
    {
      name: "WebP Converter",
      type: "WebP",
      desc: "Convert images to WebP format with batch processing and quality control. Reduce file sizes while maintaining image quality.",
      path: "/tools/WebPConverter",
    },
    {
      name: "SQL Minifier",
      type: "SQL",
      desc: "Minify SQL by removing comments, extra spaces, and formatting for cleaner, optimized queries.",
      path: "/tools/SQLMinifier",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toolTypes = Array.from(new Set(tools.map((t) => t.type)));

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.desc.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? tool.type === filter : true;
    return matchesSearch && matchesFilter;
  });

   const handleSelect = (type: string) => {
    setFilter(type);
    setDropdownOpen(false);
  };

 return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white ">
      {/* 🔹 Header */}
      <Header
        onSearch={(q) => setSearch(q)}
        onCommandPalette={() => alert("Command palette opened!")}
      />

      <main className="container mx-auto py-12 px-4">
        {/* Custom Dropdown */}
        <div className="relative w-full max-w-sm mb-8">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-black/50 text-white rounded-lg border border-gray-700 shadow-md backdrop-blur-md hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <span className="flex items-center gap-2">
              {filter ? React.createElement(iconMap[filter]) : <FileText />}
              {filter || "All Categories"}
            </span>
            <span className="ml-2">▼</span>
          </button>

{dropdownOpen && (
  <ul className="absolute z-50 mt-2 w-full bg-black/70 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
    {/* 🔹 All Tools Option */}
    <li
      onClick={() => handleSelect("")}
      className="flex items-center gap-2 px-4 py-2 hover:bg-black/50 cursor-pointer transition"
    >
      <FileText className="w-4 h-4 text-indigo-500" />
      <span>All Categories</span>
    </li>

    {toolTypes.map((type) => {
      const Icon = iconMap[type];
      return (
        <li
          key={type}
          onClick={() => handleSelect(type)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-black/50 cursor-pointer transition "
        >
          <Icon className="w-4 h-4 text-indigo-500" />
          <span>{type}</span>
        </li>
      );
    })}
  </ul>
)}

        </div>


        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  onClick={() => (window.location.href = tool.path)}
                />
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No tools found for selected criteria.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
