"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function UuidGeneratorPage() {
  const [uuid, setUuid] = useState(uuidv4());
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">UUID Generator</h1>
          <p className="text-black">Fast, free, open source, ad-free tools.</p>
          <p className="text-sm text-black">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* UUID Display Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6 items-center">
          <div className="relative w-full">
            <input
              value={uuid}
              readOnly
              className="w-full p-4 border rounded-lg bg-white text-green-400 border-gray-700 text-center font-mono focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
              title="Copy UUID"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>

          <button
            onClick={generateUuid}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Generate New UUID
          </button>
        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-black">Our tools are free and open source. Feel free to contribute.</p>
            <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800 hover:text-white  transition">Contribute</button>
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
