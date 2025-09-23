"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClipboardCopy, ClipboardCheck,ArrowLeft } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UuidGeneratorPage() {
  const [uuid, setUuid] = useState(uuidv4());
  const [copied, setCopied] = useState(false);  const router = useRouter();

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
    <div className="bg-[#181023] min-h-screen flex flex-col items-center p-6">
   {/* Back Button */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>

      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
  <Fingerprint className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
  UUID Generator
</h1>
          <p className="text-gray-400">Fast, free, open source, ad-free tools.</p>
        </header>

        {/* UUID Display Card */}
        <div className="bg-black shadow-lg rounded-xl p-6 w-full flex flex-col gap-6 items-center">
          <div className="relative w-full">
            <input
              value={uuid}
              readOnly
              className="w-full p-4 border rounded-lg bg-black text-[#9B4DF4] border-gray-700 text-center font-mono focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#5410a2] transition"
              title="Copy UUID"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>

          <button
            onClick={generateUuid}
            className="px-6 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#521894] transition"
          >
            Generate New UUID
          </button>
        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-white">Our tools are free and open source. Feel free to contribute.</p>
            <button className="px-4 py-2 border text-black border-gray-600 rounded-xl bg-[#9B4DF4] hover:bg-[#531798] hover:text-white  transition">Contribute</button>
          </div>
          <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-white">Auto-capture all the info engineers need to debug!</p>
            <button className="px-4 py-2 border border-gray-600 text-black rounded-xl bg-[#9B4DF4] hover:bg-[#511496] transition hover:text-white ">Try Jam</button>
          </div>
        </div>
      </div>
    </div>
  );
}
