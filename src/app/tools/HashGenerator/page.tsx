"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function HashGeneratorPage() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-1" | "SHA-512">("SHA-256");
  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text) {
      setHash("");
      return;
    }

    const generateHash = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);

      let result = "";
      if (encoding === "hex") {
        result = Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      } else {
        // base64 encoding
        result = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
      }

      setHash(result);
    };

    generateHash();
  }, [text, algorithm, encoding]);

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">Hash Generator</h1>
          <p className="text-black">Fast, free, open source, ad-free tools.</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Tool Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          {/* Input Text */}
          <div>
            <label className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to hash"
              rows={4}
              className="w-full p-4 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Algorithm & Encoding */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-800 dark:text-gray-200 font-semibold mb-1">Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as typeof algorithm)}
                className="p-2 rounded-lg border text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
              >
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-1">SHA-1</option>
                <option value="SHA-512">SHA-512</option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-gray-800 dark:text-gray-200 font-semibold mb-1">Output Encoding</label>
              <select
                value={encoding}
                onChange={(e) => setEncoding(e.target.value as typeof encoding)}
                className="p-2 rounded-lg border text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
              >
                <option value="hex">Hex</option>
                <option value="base64">Base64</option>
              </select>
            </div>
          </div>

          {/* Output */}
          <div className="relative">
            <label className="text-gray-800 dark:text-gray-200 font-semibold mb-1">Generated Hash</label>
            <textarea
              value={hash}
              readOnly
              rows={4}
              placeholder="Generated hash will appear here"
              className="w-full p-4 border rounded-lg bg-white text-green-400 border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
              title="Copy Hash"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-black">Our tools are free and open source. Feel free to contribute.</p>
            <button className="px-4 py-2 border text-black hover:text-white  border-gray-600 rounded-xl hover:bg-gray-800 transition">Contribute</button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-black">Auto-capture all the info engineers need to debug!</p>
            <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 transition hover:text-white ">Try Jam</button>
          </div>
        </div>

      </div>
    </div>
  );
}
