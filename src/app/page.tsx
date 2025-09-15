"use client";

import Link from "next/link";
import React, { useState, ChangeEvent } from "react";
export default function JamToolsPage() {

const tools = [
 {
      name: "CSV to JSON",
      type:"CSV",
      desc: "Easily convert CSV data to JSON format with our free tool. Quickest way to turn tabular data into a JSON format for APIs and data processing.",
      path: "/tools/csv-to-json",
    },
  { name: "Base64 Encode/Decode",
     type:"Base64", 
    desc: "Easily encode and decode Base64 data with our online utility, so you can transmit your data safely or decode Base64-encoded strings.",
    path: "/tools/base64-tool",
  },
  { name: "JSON Formatter", 
     type:"JSON",
     desc: "Format and beautify your JSON data for better readability and debugging. Quickly visualize and organize your JSON data with ease.",
     path: "/tools/JsonFormatterCard",
   },
  { name: "YAML to JSON",
     type:"YAML",
      desc: "Easily convert YAML to JSON with our converter. Useful when you're working with configuration files and need to switch between them.",
    path: "/tools/YamlToJson",
   },
  { name: "URL Encode/Decode", 
     type:"URL",
     desc: "Convert URLs to a safe format with URL encoding or decode URL-encoded strings back to their original format.",
      path: "/tools/UrlEncoderDecoder",
   },
  { name: "Timestamp to Date Converter", 
     type:"Timestamp",
     desc: "Paste Unix timestamps and get a human readable dates. Perfect for developers working with time-based data.",
    path: "/tools/TimestampConverter",
   },
  { name: "Query Parameters to JSON",
     type:"Query",
      desc: "Convert URL query parameters into a structured JSON object, simplifying the process of parsing and manipulating URL data in web applications.",
     path: "/tools/QueryParamsToJson",
   },
  { name: "HEX to RGB Converter",
     type:"HEX",
      desc: "Convert HEX to RGB and generate CSS snippets for web, Swift, and Android with our easy-to-use color converter.",
      path: "/tools/HexToRgb",
   },
  { name: "Convert .env to netlify.toml",
     type:"Convert",
      desc: "This free tool allows you to quickly and easily convert your .env file variables into the format needed for your netlify.toml file.",
    path: "/tools/EnvToNetlify",
   },
  { name: "Image to Base64 Converter", 
     type:"Image to Base64",
    desc: "Instantly convert images to Base64 strings. Embed images directly in your code. Fast, free, and developer-friendly.",
     path: "/tools/ImageToBase64",
   },
  { name: "JSON to CSV", 
     type:"JSON",
     desc: "Transform your JSON data into sleek CSV format with Jam's free online converter. Simply paste your JSON and watch the magic happen!",
     path: "/tools/JsonToCsv",
   },
  { name: "HAR file viewer",
     type:"HAR",
      desc: "Easily view and analyze HAR files online for free. Debug web traffic and network performance. Open source & ad-free.",
      path: "/tools/HarViewer",
   },
  { name: "JSON to YAML",
     type:"JSON",
      desc: "Easily convert JSON to YAML with our converter. Perfect for when you're juggling configuration files and need a switch between formats.",
    path: "/tools/JsonToYaml",
   },
  { name: "Number Base Changer", 
     type:"Number",
     desc: "Easily convert numbers between different bases (binary, octal, decimal, hexadecimal) with our free online Number Base Changer." ,
    path: "/tools/NumberBaseChanger",
  },
  { name: "CSS Inliner for Email", 
     type:"CSS",
     desc: "Easily convert your CSS styles to inline styles directly in your HTML. Perfect for improving email compatibility and reducing external stylesheet dependencies.",
     path: "/tools/CssInliner",
   },
  { name: "Regex Tester", 
     type:"Regex",
    desc: "Test and debug your regular expressions in real-time. Provides quick feedback on pattern matching for strings.",
        path: "/tools/RegexTester",
   },
  { name: "CSS Units Converter",
     type:"CSS Units",
      desc: "Easily convert px to rem with our simple CSS unit converter. Quickly transform pixel values to rem units for better scalability and accessibility.",
      path: "/tools/CssUnitsConverter",
   },
  { name: "Image Resizer",
     type:"Image", 
     desc: "Resize images while maintaining aspect ratio and choose between PNG and JPEG formats with our free tool.",
     path: "/tools/ImageResizer",
   },
  { name: "JWT Parser", 
    type:"JWT",
     desc: "Easily decode JWT tokens and view their header, payload, and signature. Perfect for debugging and analyzing JSON Web Tokens.",
    path: "/tools/JwtParser",
   },
  { name: "Hash Generator", 
    type:"Hash",
     desc: "Quickly generate secure hashes for your text using algorithms like SHA-256, SHA-512, MD5, and more. Ideal for password hashing, data integrity checks, and cryptographic applications.",
     path: "/tools/HashGenerator",
   },
  { name: "UUID Generator",  
    type:"UUID",
    desc: "Generate random UUIDs. Useful for creating unique identifiers for various applications such as database keys, session IDs, and more.",
    path: "/tools/UuidGenerator",
   },
  { name: "SVG Viewer",  
    type:"SVG",
    desc: "Instantly preview and validate SVG code in your browser. Perfect for developers working with vector graphics and debugging SVG markup.",
      path: "/tools/SvgViewer",
   },
  { name: "Lorem Ipsum Generator", 
    type:"Lorem",
     desc: "Easily generate random Lorem Ipsum text for your design projects. Perfect for placeholder content and layout previews.",
    path: "/tools/LoremIpsum",
   },
  { name: "WebP Converter",
     type:"WebP",
     desc: "Convert images to WebP format with batch processing and quality control. Reduce file sizes while maintaining image quality.",
     path: "/tools/WebPConverter",
   },
  { name: "SQL Minifier", 
    type:"SQL",
    desc: "Minify SQL by removing comments, extra spaces, and formatting for cleaner, optimized queries.",
    path: "/tools/SQLMinifier",
   },
   { name: "DOCX to PDF", 
    type:"DOC",
    desc: "Minify SQL by removing comments, extra spaces, and formatting for cleaner, optimized queries.",
    path: "/tools/DocToPdfConverter",
   },
];

 const [search, setSearch] = useState("");
  const [fromTool, setFromTool] = useState("");
  const [toTool, setToTool] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const toolTypes = Array.from(new Set(tools.map((t) => t.type)));

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.desc.toLowerCase().includes(search.toLowerCase());

    const matchesFrom = fromTool ? tool.type === fromTool : true;
    const matchesTo = toTool ? tool.type === toTool : true;

    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="min-h-screen  text-gray-100 p-10">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={fromTool}
          onChange={(e) => setFromTool(e.target.value)}
          className="px-6 py-2 rounded border border-gray-600 bg-white text-black focus:outline-none focus:ring focus:ring-gray-500"
        >
          <option value="">Select Tools</option>
          {toolTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={handleSearch}
          className="ml-auto px-4 py-2 rounded border border-gray-600 bg-white text-black focus:outline-none focus:ring focus:ring-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.path}
              className="block bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-gray-700 hover:scale-105 transform text-black"
            >
              <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
              <p className="text-gray-400 mb-4">{tool.desc}</p>
              <span className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600 transition">
                Try it
              </span>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No tools found for selected criteria.
          </p>
        )}
      </div>
    </div>
  );
}