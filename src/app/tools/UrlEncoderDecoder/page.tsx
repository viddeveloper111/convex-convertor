"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import { Link } from "lucide-react";

export default function UrlEncoderDecoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (text: string) => {
    setInput(text);

    try {
      // Try decoding
      const decoded = decodeURIComponent(text);
      if (decoded !== text) {
        setOutput(decoded);
        return;
      }
    } catch {
      // not decodable
    }

    try {
      // Otherwise encode
      const encoded = encodeURIComponent(text);
      setOutput(encoded);
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
  };

  // Copy result
  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-[#181023]">
    <div className=" mx-auto max-w-5xl p-6 space-y-12  text-center">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-[#9B4DF4]">
      <Link className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      URL Encoder/Decoder
    </h1>
        <p className="text-gray-400">
          Free, Open Source & Ad-free
        </p>
      </header>

      {/* Converter Tool */}
     <section className="bg-black rounded-2xl shadow p-6 space-y-4 text-left">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 text-center">
            Encode / Decode (Auto)
          </h2>

          <textarea
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Paste here..."
            rows={6}
            className="w-full p-3 rounded-lg border border-gray-400  bg-black text-white font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
          />

          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-center">
            Result
          </h3>
          <pre className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-black text-[#9B4DF4] font-mono text-sm overflow-x-auto text-left">
            {output}
          </pre>

          <div className="flex justify-center">
            <button
              onClick={handleCopy}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#5d20a3] transition"
            >
              {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </section>

      {/* Intro */}
      <section className=" p-6">
        <p className="text-gray-400">
          You can encode and decode URLs online with this free tool, ensuring
          proper treatment of special characters, spaces, and non-ASCII symbols
          in web addresses and query strings.
        </p>
       
      </section>

      {/* How to Use */}
      <section className="p-6 text-left">
        <h2 className="text-2xl font-bold text-white mb-4 ">
          How to Use Jam's URL Decode Tool
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-400">
          <li>Paste your URL in the input box.</li>
          <li>
            Click <b>Encode</b> or <b>Decode</b>.
          </li>
          <li>Copy the result and use it in your project.</li>
        </ol>
      </section>

      {/* Explanation */}
      <section className=" p-6 space-y-3 text-left">
        <h2 className="text-2xl font-bold text-white">
          How the URL Encoder/Decoder Works
        </h2>
        <p className="text-gray-400">
          This tool converts unsafe characters into percent-encoded values
          (e.g., space → %20). It ensures data integrity in query strings, web
          apps, and APIs.
        </p>
        <p className="text-gray-400">
          Example: <code>@</code> becomes <code>%40</code>, and{" "}
          <code>%25</code> becomes <code>%</code>.
        </p>
      </section>

      {/* FAQs */}
      <section className="p-6 text-left">
        <h2 className="text-2xl font-bold text-white mb-4 ">
          FAQs
        </h2>
        <div className="space-y-3 text-gray-400">
          <p>
            <b>What is URL encoding?</b> Converting characters into a safe
            format for internet transmission.
          </p>
          <p>
            <b>Why is it important?</b> It prevents errors in query strings and
            ensures data sharing across systems.
          </p>
          <p>
            <b>Can I decode %40?</b> Yes, it decodes to <code>@</code>.
          </p>
          <p>
            <b>What is %20?</b> It represents a space character.
          </p>
          <p>
            <b>Is encoding UTF-8?</b> Yes, URL encoding typically uses UTF-8.
          </p>
        </div>
      </section>
    </div>
    </div>
  );
}
