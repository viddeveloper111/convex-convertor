"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [result, setResult] = useState("Please fill out all required fields");
  const [copied, setCopied] = useState(false);

  // Auto-test regex whenever pattern or testString changes
  useEffect(() => {
    if (!pattern || !testString) {
      setResult("Please fill out all required fields");
      return;
    }

    try {
      // Remove leading/trailing slashes if any
      const match = pattern.match(/^\/(.*)\/([gimsuy]*)$/);
      let regex: RegExp;
      if (match) {
        regex = new RegExp(match[1], match[2]);
      } else {
        regex = new RegExp(pattern);
      }

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
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">Regex Tester</h1>
          <p className="text-black">Fast, free, open source, ad-free tools.</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Regex Tool */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          {/* Pattern Input */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Regex Pattern</h2>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern here (e.g., /pattern/g)"
              className="w-full p-3 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Test String Input */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Test String</h2>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter test string here"
              rows={4}
              className="w-full p-3 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Result */}
          <div className="relative">
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Result</h2>
            <pre className="w-full p-3 rounded-lg border border-gray-700 bg-white text-green-400 font-mono text-sm overflow-x-auto">
              {result}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition"
              title="Copy Result"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>

        {/* Info / Contribution */}
       <div className="grid md:grid-cols-2 gap-6 w-full"> <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition"> <p className="text-black"> Our tools are free and open source. Feel free to contribute. </p> <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800 transition hover:text-white "> Contribute </button> </div> <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition"> <p className="text-black"> Auto-capture all the info engineers need to debug! </p> <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 transition hover:text-white"> Try Jam </button> </div> </div>
      </div>
    </div>
  );
}
