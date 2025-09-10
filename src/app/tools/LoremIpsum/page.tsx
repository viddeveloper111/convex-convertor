"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck, RefreshCw } from "lucide-react";

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState(1);
  const [asHtml, setAsHtml] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLoremIpsum = () => {
    const lorem = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."
    ];

    let result = "";
    for (let i = 0; i < paragraphs; i++) {
      result += lorem.sort(() => 0.5 - Math.random()).join(" ") + "\n\n";
    }

    if (asHtml) {
      result = result.split("\n").map((p, i) => `<p key=${i}>${p}</p>`).join("");
    }

    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-black">Lorem Ipsum Generator</h1>
          <p className="text-black">Fast, free, open source, ad-free tools.</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div>
              <label className="text-gray-800 dark:text-gray-200 font-semibold mr-2">Amount</label>
              <input
                type="number"
                min={1}
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-20 p-2 border rounded-lg bg-black text-white border-gray-700"
              />
              <span className="ml-2 text-gray-500">Paragraphs</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={asHtml}
                onChange={() => setAsHtml(!asHtml)}
                id="asHtml"
                className="w-4 h-4 accent-indigo-500"
              />
              <label htmlFor="asHtml" className="text-gray-800 dark:text-gray-200">As HTML</label>
            </div>

            <button
              onClick={generateLoremIpsum}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
            >
              Generate <RefreshCw size={16} />
            </button>
          </div>

          {/* Output */}
          <div className="relative">
            <textarea
              value={output}
              readOnly
              rows={6}
              placeholder="Generated Lorem Ipsum will appear here"
              className="w-full p-4 border rounded-lg bg-white text-black border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
              title="Copy Output"
            >
              {copied ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
            </button>
          </div>
        </div>
       <div className="grid md:grid-cols-2 gap-6 w-full">
         <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-black">
                Our tools are free and open source. Feel free to contribute.
              </p>
              <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800  hover:text-white transition">
                Contribute
              </button>
            </div>
           <div className=" p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-black">
                Auto-capture all the info engineers need to debug!
              </p>
              <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 hover:text-white transition">
                Try Jam
              </button>
            </div>
        </div>
          
          
        {/* Footer / Info */}
        <div className="text-black  max-w-5xl">
          <p>
            Quickly generate random placeholder text with our Lorem Ipsum Generator. Whether you're a web developer, graphic designer or content creator, Jam's free Lorem Ipsum tool makes it easy to generate filler text.
          </p>
    
            </div>
            <section className="bg-white  rounded-2xl shadow p-6 mt-10 max-w-5xl w-full mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-black">
        How to use the Lorem Ipsum Generator
      </h2>
      <ol className="list-decimal pl-6 space-y-2 text-black">
        <li>
          Choose the number of <b>paragraphs</b>, <b>sentences</b>, or <b>words</b> you need.
        </li>
        <li>
          Copy the generated text and paste it into your design or content project.
        </li>
      </ol>
    
      <h2 className="text-2xl font-bold text-black mt-6">
        How the Lorem Ipsum Generator works
      </h2>
      <p className="text-black">
        This tool generates dummy text in the form of Lorem Ipsum, which is a popular placeholder text used in the design industry. Lorem Ipsum mimics natural language patterns, making it a great option for creating realistic-looking placeholder content for websites. It helps designers focus on layout and visual elements without being distracted by real content.
      </p>
    
      <p className="text-black">
        Need more customization? You can adjust the amount of text to better suit your needs.
      </p>
    </section>
          </div>
        </div>
  );
}
