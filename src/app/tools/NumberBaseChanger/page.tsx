"use client";
import { Binary } from "lucide-react";
import { useState, useEffect } from "react";

export default function NumberBaseChanger() {
  const [numberInput, setNumberInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState("");

  // Auto convert when input or bases change
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
    <div className="bg-[#181023] min-h-screen flex items-center justify-center p-6">
      {/* Container */}
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex justify-center items-center gap-2 text-3xl font-bold text-[#9B4DF4]">
      <Binary className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      Number Base Changer
    </h1>
          <p className="text-gray-400">
            Fast, free, open source, ad-free tools.
          </p>
          
        </header>

        {/* Input Section */}
        <section className="bg-black  rounded-2xl shadow p-6 space-y-4">
          <label className="font-semibold text-white">Number</label>
          <input
            type="text"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] rounded-lg bg-black text-white font-mono text-sm"
            placeholder="Enter your number"
          />

          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="font-semibold text-white">From Base</label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] rounded-lg bg-black text-white"
              >
                <option value={2}>Binary (2)</option>
                <option value={8}>Octal (8)</option>
                <option value={10}>Decimal (10)</option>
                <option value={16}>Hexadecimal (16)</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="font-semibold text-white">To Base</label>
              <select
                value={toBase}
                onChange={(e) => setToBase(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] rounded-lg bg-black text-white"
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
        <section className="space-y-2">
          <label className="font-semibold text-black">Result</label>
          <pre className="p-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] bg-black text-[#9B4DF4] font-mono text-sm">
            {result}
          </pre>
        </section>

        {/* How to Use */}
        <section className=" p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">How to Use the Number Base Changer</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-400">
            <li>Enter your number.</li>
            <li>Select the current base (binary, decimal, hexadecimal, etc.).</li>
            <li>Select the target base.</li>
            <li>Conversion happens automatically without clicking a button.</li>
          </ul>
        </section>

        {/* Understanding Number Bases */}
        <section className="p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">Understanding Number Bases</h2>
          <p className="text-gray-400">
            Number bases represent numbers using different symbols. Binary uses 0-1, decimal uses 0-9, hexadecimal uses 0-9 & A-F. Converting numbers between bases is essential in programming, math, and data processing.
          </p>
        </section>

        {/* FAQs */}
        <section className=" p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">FAQs</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-400">
            <li>What is a number base? It's the set of digits used to represent numbers in a system.</li>
            <li>How to change a base number? Enter number, select bases; conversion is automatic.</li>
            <li>Can it convert any base? Yes, common bases like binary, decimal, hexadecimal, and octal.</li>
            <li>Is it suitable for Python coding? Yes, it helps convert number bases for code and data tasks.</li>
          </ul>
        </section>
      </div>
      
    </div>
  );
}
