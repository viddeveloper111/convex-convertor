"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, RefreshCw, ArrowLeft, Type } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState(1);
  const [asHtml, setAsHtml] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const generateLoremIpsum = () => {
    const lorem = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."
    ];

    let result = "";
    for (let i = 0; i < paragraphs; i++) {
      result += lorem.sort(() => 0.5 - Math.random()).join(" ") + "\n\n";
    }

    if (asHtml) {
      result = result.split("\n").map((p, i) => `<p key=${i}>${p}</p>`).join("");
    }

    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
      useEffect(() => {
      document.title = "Loram Ipsum Converter";
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

      <div className="container mx-auto max-w-7xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex justify-center items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <Type className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            Lorem Ipsum Generator
          </h1>
          <p className="text-gray-500">Fast, free, open source, ad-free tool.</p>
        </header>

        {/* Controls */}
        <div className="bg-gray-200 shadow-lg rounded-2xl p-6 w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div>
              <label className="text-black font-semibold mr-2">Amount</label>
              <input
                type="number"
                min={1}
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-20 p-2 border rounded-lg bg-white text-black border-[#9B4DF4]"
              />
              <span className="ml-2 text-gray-500">Paragraphs</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={asHtml}
                onChange={() => setAsHtml(!asHtml)}
                id="asHtml"
                className="w-4 h-4 accent-[#9B4DF4]"
              />
              <label htmlFor="asHtml" className="text-black">As HTML</label>
            </div>

            <button
              onClick={generateLoremIpsum}
              className="px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              Generate <RefreshCw size={16} />
            </button>
          </div>

          {/* Output */}
          <div className="relative">
            <textarea
              value={output}
              readOnly
              rows={6}
              placeholder="Generated Lorem Ipsum will appear here"
              className="w-full p-4 border rounded-lg text-black bg-white border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
              title="Copy Output"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="text-black max-w-7xl space-y-4">
          <p>
            Quickly generate random placeholder text with our Lorem Ipsum Generator. Whether you're a web developer, graphic designer, or content creator, this free tool makes it easy to generate filler text.
          </p>

          <h2 className="text-2xl font-bold text-black">How to use the Lorem Ipsum Generator</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Choose the number of <b>paragraphs</b> you need.</li>
            <li>Copy the generated text and paste it into your design or content project.</li>
          </ol>

          <h2 className="text-2xl font-bold text-black mt-6">How it works</h2>
          <p>
            This tool generates dummy text in the form of Lorem Ipsum, which mimics natural language patterns, making it ideal for creating realistic placeholder content. Adjust the amount of text as needed.
          </p>
        </div>
      </div>
    </div>
  );
}
