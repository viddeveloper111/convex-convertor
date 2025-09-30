"use client";

import { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClipboardCopy, ClipboardCheck, ArrowLeft, Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UuidGeneratorPage() {
  const [uuid, setUuid] = useState(uuidv4());
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const generateUuid = () => setUuid(uuidv4());

  const handleCopy = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
      useEffect(() => {
      document.title = "Uuid GenertorConverter";
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
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <Fingerprint className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            UUID Generator
          </h1>
          <p className="text-gray-500">Fast, free, open-source, ad-free tool.</p>
        </header>

        {/* UUID Display Card */}
        <div className="bg-gray-200 shadow-lg rounded-2xl p-6 w-full flex flex-col gap-6 items-center">
          <div className="relative w-full">
            <input
              value={uuid}
              readOnly
              className="w-full p-4 border rounded-lg bg-white text-[#9B4DF4] border-gray-300 text-center font-mono focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
              title="Copy UUID"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>

          <button
            onClick={generateUuid}
            className="px-6 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-purple-700 transition"
          >
            Generate New UUID
          </button>
        </div>
      </div>
    </div>
  );
}
