"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function JwtParserPage() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);

  const parseJwt = (token: string) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT");
      const decode = (str: string) => JSON.stringify(JSON.parse(atob(str)), null, 2);
      setHeader(decode(parts[0]));
      setPayload(decode(parts[1]));
      setSignature(parts[2]);
    } catch (err) {
      setHeader("Invalid JWT");
      setPayload("Invalid JWT");
      setSignature("Invalid JWT");
    }
  };

  const handleCopy = (text: string, type: "header" | "payload" | "signature") => {
    navigator.clipboard.writeText(text);
    if (type === "header") setCopiedHeader(true);
    if (type === "payload") setCopiedPayload(true);
    if (type === "signature") setCopiedSignature(true);
    setTimeout(() => {
      setCopiedHeader(false);
      setCopiedPayload(false);
      setCopiedSignature(false);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">JWT Parser</h1>
          <p className="text-black">Fast, free, open source, ad-free tools.</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* JWT Input */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          <label className="text-gray-800 dark:text-gray-200 font-semibold">JWT Token</label>
          <textarea
            value={jwt}
            onChange={(e) => {
              setJwt(e.target.value);
              parseJwt(e.target.value);
            }}
            placeholder="Paste JWT here"
            rows={3}
            className="w-full p-2 border rounded-lg text-black bg-white border-gray-700 focus:ring-2  transition"
          />

          {/* Decoded Sections */}
          <div className="space-y-4">
            {/* Header */}
            <div className="relative">
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Decoded Header</label>
              <textarea
                value={header}
                readOnly
                rows={4}
                className="w-full  border rounded-lg bg-white text-green-400 border-gray-700 focus:ring-2  transition"
              />
              <button
                onClick={() => handleCopy(header, "header")}
                className="absolute top-10 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
                title="Copy Header"
              >
                {copiedHeader ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
              </button>
            </div>

            {/* Payload */}
            <div className="relative">
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Decoded Payload</label>
              <textarea
                value={payload}
                readOnly
                rows={4}
                className="w-full  border rounded-lg bg-white text-green-400 border-gray-700 focus:ring-2  transition"
              />
              <button
                onClick={() => handleCopy(payload, "payload")}
                className="absolute top-10 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
                title="Copy Payload"
              >
                {copiedPayload ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
              </button>
            </div>

            {/* Signature */}
            <div className="relative">
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Signature</label>
              <textarea
                value={signature}
                readOnly
                rows={2}
                className="w-full p-1 border rounded-lg bg-white text-green-400 border-gray-700 focus:ring-2  transition"
              />
              <button
                onClick={() => handleCopy(signature, "signature")}
                className="absolute top-10 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
                title="Copy Signature"
              >
                {copiedSignature ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-black">
              Our tools are free and open source. Feel free to contribute.
            </p>
            <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800  hover:text-white transition">
              Contribute
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-black">
              Auto-capture all the info engineers need to debug!
            </p>
            <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 hover:text-white  transition">
              Try Jam
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}
