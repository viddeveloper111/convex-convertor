"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, Ruler, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CssUnitsConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("px");
  const [toUnit, setToUnit] = useState("rem");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Example conversion: assume 1rem = 16px
  const conversionRates: Record<string, number> = {
    px: 1,
    rem: 16,
    em: 16,
    pt: 1.3333, // 1pt ≈ 1.333px
    vw: 16,     // assume 1vw = 16px (example)
  };

  // Auto-convert whenever value, fromUnit, or toUnit changes
  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("Invalid number!");
      return;
    }
    const valueInPx = num * (conversionRates[fromUnit] || 1);
    const converted = valueInPx / (conversionRates[toUnit] || 1);
    setResult(`${converted} ${toUnit}`);
  }, [value, fromUnit, toUnit]);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#181023] min-h-screen flex flex-col items-center p-6">
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

        {/* Back Button */}
        

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <Ruler className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            CSS Units Converter
          </h1>
          <p className="text-gray-400">Fast, free, open source, ad-free tools.</p>
        </header>

        {/* Converter Tool */}
        <div className="bg-white dark:bg-black shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">

          {/* Input Value */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Input Value</h2>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full p-3 border rounded-lg bg-black text-white border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
          </div>

          {/* From Unit */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">From Unit</h2>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 border rounded-lg bg-black text-white border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
            >
              <option value="px">Pixels (px)</option>
              <option value="rem">Rems (rem)</option>
              <option value="em">Ems (em)</option>
              <option value="pt">Points (pt)</option>
              <option value="vw">Viewport width (vw)</option>
            </select>
          </div>

          {/* To Unit */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">To Unit</h2>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 border rounded-lg bg-black text-white border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
            >
              <option value="px">Pixels (px)</option>
              <option value="rem">Rems (rem)</option>
              <option value="em">Ems (em)</option>
              <option value="pt">Points (pt)</option>
              <option value="vw">Viewport width (vw)</option>
            </select>
          </div>

          {/* Result */}
          <div className="relative">
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Result</h2>
            <input
              type="text"
              value={result}
              readOnly
              placeholder="Conversion result"
              className="w-full p-3 border rounded-lg bg-black text-[#9B4DF4] border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#53129d] transition"
              title="Copy Result"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>

        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-white">Our tools are free and open source. Feel free to contribute.</p>
            <button className="px-4 py-2 border text-black border-gray-600 rounded-xl bg-[#9B4DF4] hover:bg-[#5915a5] hover:text-white transition">
              Contribute
            </button>
          </div>
          <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-white">Auto-capture all the info engineers need to debug!</p>
            <button className="px-4 py-2 border border-gray-600 text-black rounded-xl bg-[#9B4DF4] hover:bg-[#5a1ca1] hover:text-white transition">
              Try Jam
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
