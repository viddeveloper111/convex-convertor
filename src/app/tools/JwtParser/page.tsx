"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck, ShieldCheck, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JwtParserPage() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [copied, setCopied] = useState<{ type: string | null }>({ type: null });
  const router = useRouter();

  const parseJwt = (token: string) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT");
      const decode = (str: string) =>
        JSON.stringify(JSON.parse(atob(str)), null, 2);
      setHeader(decode(parts[0]));
      setPayload(decode(parts[1]));
      setSignature(parts[2]);
    } catch {
      setHeader("Invalid JWT");
      setPayload("Invalid JWT");
      setSignature("Invalid JWT");
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ type });
    setTimeout(() => setCopied({ type: null }), 2000);
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
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <ShieldCheck className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            JWT Parser
          </h1>
          <p className="text-gray-400">
            Fast, free, open-source, ad-free tool.
          </p>
        </header>

        {/* Parser Box */}
        <div className="bg-gray-200 shadow-lg rounded-2xl p-6 w-full flex flex-col gap-6">
          <label className="text-black font-semibold">JWT Token</label>
          <textarea
            value={jwt}
            onChange={(e) => {
              setJwt(e.target.value);
              parseJwt(e.target.value);
            }}
            placeholder="Paste your JWT here"
            rows={3}
            className="w-full p-3 border rounded-lg bg-white text-black  transition"
          />

          {/* Decoded Sections */}
          {[
            { label: "Decoded Header", value: header, type: "header" },
            { label: "Decoded Payload", value: payload, type: "payload" },
            { label: "Signature", value: signature, type: "signature" },
          ].map(({ label, value, type }) => (
            <div key={type} className="relative">
              <label className="text-black font-semibold">{label}</label>
              <textarea
                value={value}
                readOnly
                rows={type === "signature" ? 2 : 4}
                className="w-full p-3 border rounded-lg bg-white text-[#9B4DF4]  transition"
              />
              <button
                onClick={() => handleCopy(value, type)}
                className="absolute top-10 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
                title={`Copy ${label}`}
              >
                {copied.type === type ? (
                  <ClipboardCheck size={20} />
                ) : (
                  <ClipboardCopy size={20} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
