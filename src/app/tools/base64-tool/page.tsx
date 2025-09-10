"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

const copyToClipboard = (text: string, type: "input" | "output") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === "input") {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  // Detect & Convert automatically
  const handleChange = (text: string) => {
    setInput(text);

    try {
      // Try decoding first
      const decoded = atob(text);
      // Check if decoded string makes sense (ASCII printable chars)
      if (/^[\x09\x0A\x0D\x20-\x7E]*$/.test(decoded)) {
        setOutput(decoded);
        return;
      }
    } catch {
      // not valid base64, will encode
    }

    // Otherwise encode text
    try {
      const encoded = btoa(text);
      setOutput(encoded);
    } catch {
      setOutput("⚠️ Invalid input");
    }
  };
 
  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-black">
          Base64 Encoder & Decoder
        </h1>
        <p className="text-gray-400">Free, Open Source & Ad-free</p>
      </header>

     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 max-w-3xl w-full flex flex-col gap-6">
      {/* Input */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Paste your text or Base64 string here..."
          rows={6}
          className="w-full p-4 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          onClick={() => copyToClipboard(input, "input")}
          className="absolute top-2 right-2 p-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
          title="Copy Input"
        >
          {copiedInput ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
        </button>
      </div>

      {/* Output */}
      <div className="relative">
        <textarea
          value={output}
          placeholder="Result will appear here..."
          rows={6}
          readOnly
          className="w-full p-4 border rounded-lg text-black bg-white border-gray-700 focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          onClick={() => copyToClipboard(output, "output")}
          className="absolute top-2 right-2 p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          title="Copy Output"
        >
          {copiedOutput ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
        </button>
      </div>
    </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-3xl w-full">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
          <p className="text-black">
            Our tools are free and open source. Feel free to contribute.
          </p>
          <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800 hover:text-white transition">
            Contribute
          </button>
        </div>
        <div className="bg-white  p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
          <p className="text-black">
            Auto-capture all the info engineers need to debug!
          </p>
          <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800  hover:text-white transition">
            Try Jam
          </button>
        </div>
      </div>
      <div className="mt-15 ">
        <p className="text-black ">
          Use this free Base64 encoder and decoder to easily convert between plain text and Base64-encoded strings.<br/>
          This tool is perfect for decoding API responses.
        </p>
      </div>
       <section className="max-w-3xl mx-auto  py-12">
      <h2 className="text-2xl md:text-xl font-bold text-black mb-2">
        How to Use the Base64 Decode Tool
      </h2>

      <div className="">
        <p className="text-gray-700 dark:text-black ">
          You can use this tool to <span className="font-semibold">decode Base64-encoded strings</span>,
          or to convert Base64 text strings back to their original binary form. Just paste your data
          and copy the result instantly. If you need to convert <span className="font-semibold">images to Base64</span>,
          this tool works for that <Link href="#" className="underline font-bold text-white"> too.</Link>
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-black mt-6">Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-black text-lg">
          <li>
            <span className="font-semibold">Data Conversion:</span> Convert text strings to their
            original binary form, useful for handling encoded text data.
          </li>
          <li>
            <span className="font-semibold">Debugging:</span> Decode Base64 data when troubleshooting
            or analyzing web resources.
          </li>
        </ul>
      </div>
    </section>
   <section className="max-w-3xl mx-auto ">
      <h2 className="text-xl md:text-1xl font-bold text-gray-900 dark:text-white mb-2">
        How Does the Base64 Tool Work?
      </h2>

      <div className="">
        <p className="text-gray-700 dark:text-black ">
          Base64 encoding converts <span className="font-semibold">binary data into a text format</span> 
          that can be safely transmitted over text-based protocols like HTTP, email, and more. 
          This process ensures that the data remains intact and prevents corruption during transmission.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-black mt-6">Key Benefits:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-400 dark:text-black">
          <li>
            <span className="font-semibold">Data Integrity:</span> Ensures that binary data, special 
            characters, and non-ASCII symbols are correctly transmitted over the internet without corruption.
          </li>
          <li>
            <span className="font-semibold">Data Embedding:</span> Allows embedding binary data within 
            text-based formats like JSON, XML, and HTML, making it useful for web applications and APIs.
          </li>
          <li>
            <span className="font-semibold">Compatibility:</span> Facilitates easier data sharing and 
            exchange between different systems and platforms that handle text-based data.
          </li>
          <li>
            <span className="font-semibold">ASCII Decoding:</span> Converts ASCII strings back to their 
            original binary form, ensuring accurate data reconstruction.
          </li>
        </ul>
      </div>
    </section>
     <section className="max-w-3xl mx-auto">
      {/* --- Using Base64 in JS --- */}
      <div className=" rounded-2xl shadow-lg p-2">
        <h2 className="text-xl md:text-1xl font-bold text-gray-900 dark:text-white mb-6">
          Using Base64 in JavaScript
        </h2>
        <p className="text-gray-700 dark:text-black mb-4 ">
          In JavaScript, Base64 encoding and decoding can be done using the built-in{" "}
          <code className="bg-gray-100 dark:bg-gray-400 px-1 rounded">btoa</code> and{" "}
          <code className="bg-gray-100 dark:bg-gray-400 px-1 rounded">atob</code> functions.
        </p>

                     <pre className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-x-auto mb-6">
             {`let text = "Hello, world!";
             let encoded = btoa(text);
             console.log(encoded); // "SGVsbG8sIHdvcmxkIQ=="
             
             let encoded = "SGVsbG8sIHdvcmxkIQ==";
             let decoded = atob(encoded);
             console.log(decoded); // "Hello, world!"`}
        </pre>

        <p className="text-gray-700 dark:text-black ">
          These functions make it easy to handle encoding and decoding directly within your JavaScript 
          code, enabling smooth data processing and transmission in web applications.
        </p>
      </div>

      {/* --- Meet Jam --- */}
      <div className=" text-blacks rounded-2xl shadow-lg p-4">
        <h2 className="text-xl md:text-1xl font-bold mb-4 text-white">
          Meet Jam: The Ultimate Tool for Debugging Web Apps
        </h2>
        <p className="mb-4">
          While this tool helps you manage encoding and decoding efficiently,{" "}
          <Link href="#" className="underline text-white">Jam</Link> takes your debugging process to the next level.
        </p>
        <p className="mb-4 ">
          Jam is <Link href="#" className="underline text-white">the browser extension</Link> helping over 140,000 usersdebug faster. 
          It captures console logs, network requests, and more with just one click. Now anyone can 
          log comprehensive bug reports and you can debug so much faster without follow-ups.
        </p>
        <p className="mb-6 ">
          Whether you're dealing with Base64-encoded data or debugging JavaScript functions, 
          Jam captures your screen and automatically includes all the debug details developers 
          need to fix issues in a shareable link.
        </p>
<div className="flex flex-col justify-center rounded-2xl bg-gray-900 h-50 items-center">
  <button className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded-xl shadow transition w-50">
    Get Jam for Free
  </button>
  <p className="mt-2 text-sm text-gray-400">⭐ 150+ reviews · 100k+ users</p>
</div>

      </div>

      {/* --- FAQs --- */}
     <div className="rounded-2xl mt-10">
  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-black mb-6">
    FAQs
  </h2>
  <ul className="space-y-4 text-gray-700 dark:text-black list-disc pl-6">
    <li>
      <span className="font-semibold text-white">Can you decode Base64?</span><br />
      Yes, you can. Use this tool online by pasting the text into the input box and copying the decoded output.
    </li>
    <li>
      <span className="font-semibold text-white">How to convert Base64 encoding?</span><br />
      Use our free tool here. Drop your file or text and get an ASCII string output.
    </li>
    <li>
      <span className="font-semibold text-white">Can you encode Base64?</span><br />
      Yes, just paste your text into our tool and get the encoded result instantly.
    </li>
    <li>
      <span className="font-semibold text-white">How to encode text to Base64 online?</span><br />
      Paste your text into the input box and copy the output — fast and easy.
    </li>
    <li>
      <span className="font-semibold text-white">What is Base64?</span><br />
      It’s an encoding scheme that converts binary data into text format using ASCII characters.
    </li>
    <li>
      <span className="font-semibold text-white">What is the difference between encoding and decoding?</span><br />
      Encoding converts binary data into Base64 text, while decoding converts Base64 text back to binary.
    </li>
  </ul>
</div>

    </section>
    </div>
  );
}
