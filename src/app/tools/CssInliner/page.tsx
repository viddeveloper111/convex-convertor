"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CssInlinerPage() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [inlinedHtml, setInlinedHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Auto-convert HTML + CSS to inlined HTML
  useEffect(() => {
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
            <Mail className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            CSS Inliner for Email
          </h1>
          <p className="text-gray-400">
            Convert your CSS to inline styles quickly and easily.
          </p>
        </header>

        {/* Tool Inputs */}
        <div className="w-full space-y-6 border p-6 bg-gray-100 rounded-2xl shadow">
          {/* HTML Input */}
          <div>
            <h2 className="font-semibold text-black mb-2">HTML</h2>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste HTML here"
              rows={6}
              className="w-full p-4 border rounded-lg bg-white text-black font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
            />
          </div>

          {/* CSS Input */}
          <div>
            <h2 className="font-semibold text-black mb-2">CSS</h2>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              placeholder="Paste CSS here"
              rows={4}
              className="w-full p-4 border rounded-lg bg-white text-black font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
            />
          </div>

          {/* Output */}
          <div className="relative">
            <h2 className="font-semibold text-black mb-2">Inlined HTML</h2>
            <textarea
              value={inlinedHtml}
              readOnly
              rows={6}
              placeholder="Your inlined HTML will appear here"
              className="w-full p-4 border rounded-lg bg-white text-[#9B4DF4] font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
            />
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#5b16aa] transition"
              title="Copy Output"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
