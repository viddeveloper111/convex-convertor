"use client";

import { useState, ChangeEvent } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function SvgViewerPage() {
  const [svgCode, setSvgCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Handle paste/update of SVG code
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSvgCode(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgCode(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  // Copy SVG code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">SVG Viewer</h1>
          <p className="text-black">
            Fast, free, open source, ad-free tools.
          </p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* SVG Input */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          {/* Textarea Input */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Paste SVG Code
            </h2>
            <textarea
              value={svgCode}
              onChange={handleChange}
              placeholder="Paste SVG code here"
              rows={6}
              className="w-full p-4 border rounded-lg bg-white text-black border-gray-700 focus:ring-2  transition"
            />
          </div>

          {/* File Upload */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Upload SVG File
            </h2>
            <input
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded-lg bg-white text-black border-gray-700 focus:ring-2  transition"
            />
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex w-35 items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
            {copied ? "Copied!" : "Copy SVG"}
          </button>
        </div>

        {/* SVG Preview */}
        {svgCode && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full">
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
              SVG Preview
            </h2>
            <div
              className="border rounded-lg p-4 overflow-auto"
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </div>
        )}


           <div className="grid md:grid-cols-2 gap-6 w-full">
         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-black">
                Our tools are free and open source. Feel free to contribute.
              </p>
              <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800  hover:text-white transition">
                Contribute
              </button>
            </div>
           <div className=" p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-black">
                Auto-capture all the info engineers need to debug!
              </p>
              <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 hover:text-white transition">
                Try Jam
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
