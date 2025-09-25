"use client";

import { useState, ChangeEvent } from "react";
import { ClipboardCopy, ClipboardCheck,ArrowLeft  } from "lucide-react";
import { Image } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SvgViewerPage() {
  const [svgCode, setSvgCode] = useState("");
  const [copied, setCopied] = useState(false);
    const router = useRouter();

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
    <div className="bg-[#181023] min-h-screen flex flex-col items-center p-6">
         {/* Back Button */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
            <h1 className="flex justify-center items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
      <Image className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      SVG Viewer
    </h1>
          <p className="text-gray-400">
            Fast, free, open source, ad-free tools.
          </p>
         
        </header>

        {/* SVG Input */}
        <div className="bg-black shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
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
              className="w-full p-4 border rounded-lg text-white bg-black  focus:ring-2 focus:ring-[#9B4DF4] transition"
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
              className="w-full p-2 border rounded-lg text-white bg-black border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex w-35 items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#5612a3] transition"
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
      </div>
    </div>
  );
}
