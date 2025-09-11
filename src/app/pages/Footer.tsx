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
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-600 backdrop-blur-md shadow-inner text-white px-6 py-10">
      {/* Tools Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-white mb-4">Tools</h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            {Array.from({ length: Math.ceil(toolsLinks.length / 6) }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {toolsLinks
                  .slice(rowIdx * 6, rowIdx * 6 + 6)
                  .map((tool, colIdx) => (
                    <td key={colIdx} className="py-2 px-4">
                      <Link
                        href={tool.path}
                        className="hover:text-gray-200 transition-colors font-medium"
                      >
                        {tool.name}
                      </Link>
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Footer Bottom */}
      <div className="border-t border-purple-400 pt-4 text-center text-white text-sm">
        &copy; {year} Convex Converter. All rights reserved.
      </div>
    </footer>
  );
}
