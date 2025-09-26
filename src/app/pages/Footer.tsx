"use client";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  const toolsLinks = [
    { name: "CSV-TO-JSON", path: "/tools/csv-to-json" },
    { name: "Base64 Encode/Decode", path: "/tools/base64-tool" },
    { name: "JSON Formatter", path: "/tools/JsonFormatterCard" },
    { name: "YAML-To-JSON", path: "/tools/YamlToJson" },
    { name: "URL Encode/Decode", path: "/tools/UrlEncoderDecoder" },
    { name: "Timestamp To Date Converter", path: "/tools/TimestampConverter" },
    { name: "Query Parameters To JSON", path: "/tools/QueryParamsToJson" },
    { name: "HEX To RGB Converter", path: "/tools/HexToRgb" },
    { name: "Converter .env to Netlify.toml", path: "/tools/EnvToNetlify" },
    { name: "Image to Base64 Converter", path: "/tools/ImageToBase64" },
    { name: "JSON to CSV", path: "/tools/JsonToCsv" },
    { name: "HAR File Viewer", path: "/tools/HarViewer" },
    { name: "JSON to YAML", path: "/tools/JsonToYaml" },
    { name: "Number Base Changer", path: "/tools/NumberBaseChanger" },
    { name: "CSS Inliner for Email", path: "/tools/CssInliner" },
    { name: "Regex Tester", path: "/tools/RegexTester" },
    { name: "CSS Units Converter", path: "/tools/CssUnitsConverter" },
    { name: "Image Resizer", path: "/tools/ImageResizer" },
    { name: "JWT Parser", path: "/tools/JwtParser" },
    { name: "Hash Generator", path: "/tools/HashGenerator" },
    { name: "UUID Generator", path: "/tools/UuidGenerator" },
    { name: "SVG Viewer", path: "/tools/SvgViewer" },
    { name: "Lorem Ipsum Generator", path: "/tools/LoremIpsum" },
    { name: "WebP Converter", path: "/tools/WebPConverter" },
    { name: "SQL Minifier", path: "/tools/SQLMinifier" },
    { name: "Docx to PDF", path: "/tools/DocToPdfConverter" },
  ];

  return (
    <footer className="bg-gray-200 text-black px-6 py-10 border-t border-gray-200">
      {/* Tools Section */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Tools</h3>

        {/* Responsive grid: 2 cols on small, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-3">
          {toolsLinks.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.path}
              className="hover:text-purple-600 transition-colors font-medium text-sm"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 pt-4 text-center text-sm">
        &copy; {year} Convex Converter. All rights reserved.
      </div>
    </footer>
  );
}
