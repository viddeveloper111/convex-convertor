"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function CssUnitsConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("px");
  const [toUnit, setToUnit] = useState("rem");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  // Example conversion: assume 1rem = 16px
  const conversionRates: Record<string, number> = {
    px: 1,
    rem: 16,
    em: 16,
    pt: 1.3333, // 1pt ≈ 1.333px
    vw: 16, // assume 1vw = 16px (for example)
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

  // Copy result
  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">CSS Units Converter</h1>
          <p className="text-black">Fast, free, open source, ad-free tools.</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Converter Tool */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">

          {/* Input Value */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Input Value</h2>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full p-3 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* From Unit */}
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-semibold mb-2">From Unit</h2>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
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
              className="w-full p-3 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
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
              className="w-full p-3 border rounded-lg bg-white text-green-400 border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-10 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
              title="Copy Result"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>

        </div>
        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-black">
              Our tools are free and open source. Feel free to contribute.
            </p>
            <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800 
hover:text-white transition">
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
