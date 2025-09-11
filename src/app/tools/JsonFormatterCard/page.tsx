"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { FileJson } from "lucide-react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleFormat = (text?: string) => {
    const data = text ?? input;
    try {
      const parsed = JSON.parse(data);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch {
      setOutput("Invalid JSON! ❌");
    }
  };

  return (
    <div className="bg-[#181023] min-h-screen flex flex-col items-center p-6 text-black">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center">
<h1 className="flex items-center gap-2 text-4xl font-bold mb-3 text-[#9B4DF4]">
  <FileJson className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl " />
  JSON Formatter
</h1>          <p className="text-gray-400">Fast, free, open source, ad-free tools.</p>
        </header>

        {/* Formatter Card */}
        <div className="bg-black  shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          {/* Input */}
          <textarea
            value={input}
            onChange={(e) => {
              const val = e.target.value;
              setInput(val);
              handleFormat(val);
            }}
            onPaste={(e) => {
              const text = e.clipboardData.getData("text");
              setInput(text);
              handleFormat(text);
              e.preventDefault();
            }}
            placeholder="Paste your JSON here..."
            rows={6}
            className="w-full p-4 border rounded-lg bg-black text-white border-gray-400 focus:ring-2 focus:ring-[#9B4DF4]  transition"
          />

          {/* Output */}
          <div className="relative">
            <textarea
              value={output}
              placeholder="Formatted JSON will appear here..."
              rows={6}
              readOnly
              className="w-full p-4 border rounded-lg bg-black text-white border-gray-400 focus:ring-2 focus:ring-[#9B4DF4]   transition"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(output);
                setCopiedOutput(true);
                setTimeout(() => setCopiedOutput(false), 2000);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#3e0d77] transition"
              title="Copy Output"
            >
              {copiedOutput ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>

        {/* Info Sections */}
       {/* Info Sections */}
<div className="w-full flex flex-col items-center space-y-10 text-gray-300">
  <p className="w-full max-w-4xl text-left">
    You can use this <span className="font-semibold">JSON formatter</span> to beautify your JSON and make it easier to read. Just paste your minified JSON and get the formatted result. Made with 💜 by the developers building Jam
  </p>

  {/* How to Use */}
  <section className="w-full max-w-4xl text-left">
    <h2 className="text-xl font-bold text-white mb-2">
      How to Use JSON Online Formatter
    </h2>
    <p className="mb-2">
      Whether you're debugging or doing data analysis, with this JSON editor you can quickly format JSON files by copying and pasting – no signup required.
    </p>
    <p>
      Our tool's built-in JSON Validator ensures the output is syntactically correct and adheres to JSON standards. So, you can reliably use the data in your applications.
    </p>
  </section>

  {/* Benefits */}
  <section className="w-full max-w-4xl text-left">
    <h2 className="text-xl font-bold text-white mb-2">
      Benefits of Formatting JSON
    </h2>
    <p className="mb-4">
      JSON (JavaScript Object Notation) is an easy-to-read data format that both people and computers can understand. Formatting JSON improves readability and helps in debugging.
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li><span className="font-semibold">Readability:</span> Formatted JSON is easier to read and understand, making it simpler to debug and analyze data.</li>
      <li><span className="font-semibold">Data Analysis:</span> Beautified JSON helps in analyzing data structures and relationships more effectively.</li>
      <li><span className="font-semibold">Data Interchange:</span> Well-structured JSON is easier to share and collaborate on with team members.</li>
    </ul>
  </section>

  {/* More Tools */}
  <section className="w-full max-w-4xl text-left">
    <h2 className="text-xl font-bold text-white mb-2">
      More JSON Conversion Tools
    </h2>
    <ul className="list-disc list-inside space-y-2">
      <li>
        <Link href="#" className="underline font-bold text-[#9B4DF4]  hover:text-[#411672]">
          CSV to JSON :
        </Link> Convert CSV data to JSON format for APIs and data processing.
      </li>
      <li>
        <Link href="#" className="underline font-bold text-[#9B4DF4] hover:text-[#411672]">
          YAML to JSON :
        </Link> Convert human-readable YAML to JSON.
      </li>
      <li>
        <Link href="#" className="underline font-bold text-[#9B4DF4] hover:text-[#411672]">
          Query Parameters to JSON :
        </Link> Convert query strings to JSON for web apps.
      </li>
    </ul>
  </section>

  {/* FAQs */}
  <section className="w-full max-w-4xl text-left">
    <h2 className="text-xl font-bold text-white mb-2">FAQs</h2>
    <dl className="space-y-3">
      <div>
        <dt className="font-bold text-white">
          How accurate is the formatter?
        </dt>
        <dd className="text-gray-300">
          Our tool guarantees precise data integrity during the JSON formatting process.
        </dd>
      </div>
      <div>
        <dt className="font-bold text-gray-300">
          How to format JSON using a code editor?
        </dt>
        <dd className="text-gray-300">
          Use a code editor like VSCode with extensions, or use this online formatter for quick results.
        </dd>
      </div>
    </dl>
  </section>
</div>

      </div>
    </div>
  );
}
