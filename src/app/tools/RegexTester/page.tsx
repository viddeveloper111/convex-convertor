"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, Braces, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [result, setResult] = useState("Please fill out all required fields");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Auto-test regex whenever pattern or testString changes
  useEffect(() => {
    if (!pattern || !testString) {
      setResult("Please fill out all required fields");
      return;
    }

    try {
      // Allow /pattern/flags format or plain
      const match = pattern.match(/^\/(.*)\/([gimsuy]*)$/);
      const regex = match ? new RegExp(match[1], match[2]) : new RegExp(pattern);
      const matches = testString.match(regex);
      setResult(matches ? JSON.stringify(matches, null, 2) : "No matches found");
    } catch (err: any) {
      setResult(`Invalid regex: ${err.message}`);
    }
  }, [pattern, testString]);

  // Copy result
  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <Braces className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            Regex Tester
          </h1>
          <p className="text-gray-400">Fast, free, open source, ad-free tool.</p>
        </header>

        {/* Regex Tool */}
        <div className="w-full space-y-6 border p-6 bg-gray-100 rounded-2xl shadow">
          {/* Pattern Input */}
          <div>
            <h2 className="font-semibold text-black mb-2">Regex Pattern</h2>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern (e.g., /pattern/g)"
              className="w-full p-3 border rounded-lg bg-white text-black font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
            />
          </div>

          {/* Test String Input */}
          <div>
            <h2 className="font-semibold text-black mb-2">Test String</h2>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test"
              rows={4}
              className="w-full p-3 border rounded-lg bg-white text-black font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
            />
          </div>

          {/* Result */}
          <div className="relative">
            <h2 className="font-semibold text-black mb-2">Result</h2>
            <pre className="w-full p-3 rounded-lg border bg-white text-[#9B4DF4] font-mono text-sm overflow-x-auto">
              {result}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#5b16aa] transition"
              title="Copy Result"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
