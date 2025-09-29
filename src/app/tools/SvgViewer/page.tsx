"use client";

import { useState, ChangeEvent,useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, ArrowLeft, Image } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SvgViewerPage() {
  const [svgCode, setSvgCode] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setSvgCode(e.target.value);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => setSvgCode(event.target?.result as string);
    reader.readAsText(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
      useEffect(() => {
      document.title = "SVG Viewer Converter";
    }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
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
          <p className="text-gray-500">Fast, free, open-source, ad-free tool.</p>
        </header>

        {/* SVG Input Card */}
        <div className="bg-gray-200 shadow-lg rounded-2xl p-6 w-full flex flex-col gap-6">
          {/* Textarea Input */}
          <div>
            <label className="text-black font-semibold mb-2">Paste SVG Code</label>
            <textarea
              value={svgCode}
              onChange={handleChange}
              placeholder="Paste SVG code here"
              rows={6}
              className="w-full p-4 border rounded-lg text-black bg-white focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-black font-semibold mb-2">Upload SVG File</label>
            <input
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded-lg text-black bg-white border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex w-40 items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-purple-700 transition"
          >
            {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
            {copied ? "Copied!" : "Copy SVG"}
          </button>
        </div>

        {/* SVG Preview */}
        {svgCode && (
          <div className="bg-gray-100 shadow-lg rounded-2xl p-6 w-full">
            <label className="text-black font-semibold mb-2 block">SVG Preview</label>
            <div
              className="border rounded-lg p-4 overflow-auto bg-white"
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
