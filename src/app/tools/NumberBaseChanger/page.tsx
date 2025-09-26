"use client";

import { Binary, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NumberBaseChanger() {
  const [numberInput, setNumberInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!numberInput.trim()) {
      setResult("");
      return;
    }
    try {
      const decimal = parseInt(numberInput, fromBase);
      if (isNaN(decimal)) {
        setResult("Invalid number for the selected base");
        return;
      }
      setResult(decimal.toString(toBase).toUpperCase());
    } catch {
      setResult("Conversion error");
    }
  }, [numberInput, fromBase, toBase]);

  return (
    <div className="bg-white min-h-screen flex justify-center p-6">
      <div className="w-full max-w-5xl space-y-8">
        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex justify-center items-center gap-2 text-3xl font-bold text-[#9B4DF4]">
            <Binary className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            Number Base Changer
          </h1>
          <p className="text-gray-400">Fast, free, open source & ad-free</p>
        </header>

        {/* Input Section */}
        <section className="space-y-4 border p-6 bg-gray-100 rounded-2xl">
          <label className="font-semibold text-black">Number</label>
          <input
            type="text"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
            placeholder="Enter your number"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="font-semibold text-black">From Base</label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(Number(e.target.value))}
                className="w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-[#9B4DF4]"
              >
                <option value={2}>Binary (2)</option>
                <option value={8}>Octal (8)</option>
                <option value={10}>Decimal (10)</option>
                <option value={16}>Hexadecimal (16)</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="font-semibold text-black">To Base</label>
              <select
                value={toBase}
                onChange={(e) => setToBase(Number(e.target.value))}
                className="w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-[#9B4DF4]"
              >
                <option value={2}>Binary (2)</option>
                <option value={8}>Octal (8)</option>
                <option value={10}>Decimal (10)</option>
                <option value={16}>Hexadecimal (16)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Result Section */}
        <section className="space-y-2 relative">
          <label className="font-semibold text-black">Result</label>
          <pre className="p-6 rounded-lg border bg-white text-[#9B4DF4] font-mono text-sm whitespace-pre-wrap">
            {result}
          </pre>
        </section>

        {/* How to Use */}
        <section className="p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">How to Use</h2>
          <ul className="list-disc pl-6 space-y-1 text-black">
            <li>Enter your number.</li>
            <li>Select the current base (binary, decimal, hexadecimal, etc.).</li>
            <li>Select the target base.</li>
            <li>Conversion happens automatically without clicking a button.</li>
          </ul>
        </section>

        {/* Understanding Number Bases */}
        <section className="p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">Understanding Number Bases</h2>
          <p className="text-black">
            Number bases represent numbers using different symbols. Binary uses
            0-1, decimal uses 0-9, hexadecimal uses 0-9 & A-F. Converting
            between bases is essential in programming, math, and data
            processing.
          </p>
        </section>

        {/* FAQs */}
        <section className="p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">FAQs</h2>
          <ul className="list-disc pl-6 space-y-1 text-black">
            <li>What is a number base? It’s the set of digits used to represent numbers in a system.</li>
            <li>How to change a base number? Enter number, select bases; conversion is automatic.</li>
            <li>Can it convert any base? Yes—binary, decimal, hexadecimal, and octal are supported.</li>
            <li>Is it suitable for coding tasks? Absolutely, handy for developers and data work.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
