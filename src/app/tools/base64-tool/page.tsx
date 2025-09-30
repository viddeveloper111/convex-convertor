"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, Binary, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const router = useRouter();

  const copyToClipboard = (text: string, type: "input" | "output") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === "input") {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const handleChange = (text: string) => {
    setInput(text);
    try {
      const decoded = atob(text);
      if (/^[\x09\x0A\x0D\x20-\x7E]*$/.test(decoded)) {
        setOutput(decoded);
        return;
      }
    } catch {
      // not valid base64, encode instead
    }
    try {
      const encoded = btoa(text);
      setOutput(encoded);
    } catch {
      setOutput("⚠️ Invalid input");
    }
  };

  useEffect(() => {
    document.title = "Base64 Encode/Decode Converter";
  }, []);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center px-6 py-10">
      {/* Back Button */}
      <div className="w-full max-w-8xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Header */}
      <header className="text-center max-w-6xl mb-10">
        <h1 className="flex justify-center items-center gap-3 text-4xl font-bold text-[#9B4DF4]">
          <Binary className="w-10 h-10 bg-[#9B4DF4] text-white rounded-xl p-2" />
          Base64 Encoder & Decoder
        </h1>
        <p className="text-gray-500 mt-2">Free, Open Source & Ad-free</p>
      </header>

      {/* Converter */}
      <div className="bg-gray-100 shadow-xl rounded-xl p-6 max-w-6xl w-full space-y-6">
        {/* Input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Paste your text or Base64 string here..."
            rows={6}
            className="w-full p-4 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#9B4DF4]"
          />
          <button
            onClick={() => copyToClipboard(input, "input")}
            className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#7b35d3] transition"
            title="Copy Input"
          >
            {copiedInput ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
          </button>
        </div>

        {/* Output */}
        <div className="relative">
          <textarea
            value={output}
            placeholder="Result will appear here..."
            rows={6}
            readOnly
            className="w-full p-4 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#9B4DF4]"
          />
          <button
            onClick={() => copyToClipboard(output, "output")}
            className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#7b35d3] transition"
            title="Copy Output"
          >
            {copiedOutput ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="max-w-6xl mt-8 text-center text-gray-700">
        Use this free Base64 encoder/decoder to quickly convert between plain text and Base64 strings.
        Ideal for decoding API responses or encoding data safely.
      </p>

      {/* Info Sections */}
      <section className="mt-12 space-y-8 text-gray-800">
        <div>
          <h2 className="text-2xl font-bold mb-2 ">How to Use the Tool</h2>
          <p>
            Paste your data to <span className="font-semibold">encode or decode Base64</span>.
            Copy the result instantly. Works for text and small image strings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">How Base64 Works</h2>
          <p>
            Base64 turns <span className="font-semibold">binary data into text</span> so it can be
            transmitted safely through text-based protocols like HTTP and email.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-6 shadow w-full">
          <h2 className="text-2xl font-bold mb-4">Using Base64 in JavaScript</h2>
          <pre className="bg-black text-[#9B4DF4] p-4 rounded-lg overflow-x-auto text-sm">
            {`let text = "Hello, world!";
              let encoded = btoa(text);
              console.log(encoded); // "SGVsbG8sIHdvcmxkIQ=="

              let decoded = atob(encoded);
              console.log(decoded); // "Hello, world!"`}
          </pre>
        </div>

        <div className="rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Can you decode Base64?</strong> Yes. Paste the string and copy the decoded output.</li>
            <li><strong>How to encode?</strong> Type or paste text and copy the Base64 result instantly.</li>
            <li><strong>What is Base64?</strong> An encoding scheme that represents binary data using ASCII characters.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
