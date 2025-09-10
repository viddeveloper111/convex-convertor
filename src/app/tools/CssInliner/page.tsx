"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function CssInlinerPage() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [inlinedHtml, setInlinedHtml] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-convert HTML + CSS to inlined HTML
  useEffect(() => {
    // Simple demo: just wrap CSS in <style> tag and prepend to HTML
    if (!html && !css) {
      setInlinedHtml("");
      return;
    }
    setInlinedHtml(`<style>${css}</style>\n${html}`);
  }, [html, css]);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(inlinedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">CSS Inliner for Email</h1>
          <p className="text-black">Convert your CSS to inline styles quickly and easily.</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Tool Inputs */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          {/* HTML Input */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">HTML</h2>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste HTML here"
              rows={6}
              className="w-full p-4 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* CSS Input */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">CSS</h2>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              placeholder="Paste CSS here"
              rows={4}
              className="w-full p-4 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Output */}
          <div className="relative">
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Inlined HTML</h2>
            <textarea
              value={inlinedHtml}
              readOnly
              rows={6}
              placeholder="Your inlined HTML will appear here"
              className="w-full p-4 border rounded-lg bg-white text-green-400 border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-gray-600 text-white hover:bg-gray-800 transition"
              title="Copy Output"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>

       <div className="grid md:grid-cols-2 gap-6 w-full"> <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition"> <p className="text-black"> Our tools are free and open source. Feel free to contribute. </p> <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:text-white hover:bg-gray-800 transition"> Contribute </button> </div> <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition"> <p className="text-black"> Auto-capture all the info engineers need to debug! </p> <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 hover:text-white transition"> Try Jam </button> </div> </div>


      </div>
    </div>
  );
}
