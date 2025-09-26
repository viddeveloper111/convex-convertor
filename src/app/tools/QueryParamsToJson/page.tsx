"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import { Braces } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // icon for the button


export default function QueryParamsToJsonPage() {
  const [query, setQuery] = useState("");
  const [jsonOutput, setJsonOutput] = useState("{}");
  const [copied, setCopied] = useState(false);
  const router = useRouter();


  // Convert query parameters to JSON
  const convertQueryToJson = (q: string) => {
    try {
      const params = new URLSearchParams(q);
      const obj: Record<string, string> = {};
      params.forEach((value, key) => {
        obj[key] = value;
      });
      setJsonOutput(JSON.stringify(obj, null, 2));
    } catch {
      setJsonOutput("Error: Invalid query string");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    setQuery(value);
    convertQueryToJson(value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white min-h-screen py-10">
      {/* Back Button */}
<div className="ps-6 flex justify-start">
  <button
    onClick={() => router.back()}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
  >
    <ArrowLeft className="h-5 w-5" />
    Back
  </button>
</div>

      <div className="container mx-auto max-w-5xl p-6 space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-[#9B4DF4]">
      <Braces className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      Query Params to JSON
    </h1>
          <p className="text-gray-400">
            Free, Open Source & Ad-free
          </p>
        </header>

        {/* Converter Tool */}
        <section className="bg-gray-200 rounded-2xl shadow p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <h2 className="font-semibold text-black mb-2">
                URL Query Parameters
              </h2>
              <textarea
                value={query}
                onChange={handleChange}
                placeholder="Paste your query string here"
                rows={12}
                className="w-full p-3 rounded-lg border   bg-white text-black font-mono text-sm "
              />
            </div>

            {/* JSON Output */}
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                JSON Output
              </h2>
              <pre className="w-full h-[290px] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9B4DF4] bg-white text-[#9B4DF4] font-mono text-sm overflow-x-auto">
                {jsonOutput}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-2 flex items-center gap-3 px-6 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#541998] transition"
              >
                {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className=" p-6 space-y-3">
          <p className="text-black">
            Convert URL query parameters into JSON format quickly and easily.
            Ideal for web applications, APIs, or data manipulation.
          </p>
          <p className="text-black">
            Made with 💜 by the developers building  Convex Converter.
          </p>
        </section>

        {/* How to Use */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-black mb-2">
            How to Use the Query Params to JSON Converter
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-black">
            <li>Paste your URL query string into the input box.</li>
            <li>JSON output is generated instantly.</li>
            <li>Copy the JSON output for further use in your project.</li>
          </ol>
        </section>

        {/* Use Cases */}
        <section className="p-6 space-y-3">
          <h2 className="text-2xl font-bold text-black">Use Cases</h2>
          <ul className="list-disc pl-6 text-black space-y-1">
            <li><b>Data Integration:</b> Merge data from query strings easily.</li>
            <li><b>Data Processing:</b> Convert query data into JSON for processing in multiple languages.</li>
            <li><b>Data Sharing:</b> Structured JSON makes it easier to share and exchange data.</li>
          </ul>
        </section>

        {/* FAQs */}
        <section className="p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black mb-2">FAQs</h2>
          <ul className="list-disc pl-6 text-black space-y-1">
            <li><b>How to convert URL into JSON?</b> Paste your query string; output is JSON.</li>
            <li><b>Can JSON be passed as a query parameter?</b> Yes, encode JSON as a string.</li>
            <li><b>How to pass parameters in JSON format?</b> Encode object as a string in the query string.</li>
            <li><b>How do I query JSON data?</b> Use JSONPath or parse JSON in your programming language.</li>
            <li><b>How to pass query parameters in API?</b> Include them in the URL query string; the API will parse them.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
