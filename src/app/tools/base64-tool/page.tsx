"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { Binary } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
    const router = useRouter();

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
 <div className="pt-6 flex justify-start">
  <button
    onClick={() => router.back()}
    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-500"
  >
    <ArrowLeft className="h-5 w-5" />
    Back
  </button>
</div>

      {/* Header Section */}
      <header className="text-center mt-8 mb-10">
        <h1 className="flex justify-center items-center gap-2 text-4xl font-bold mb-3 text-[#9B4DF4]">
          <Binary className="w-10 h-10 bg-[#9B4DF4] text-white rounded-2xl p-2" />
          Base64 Encoder & Decoder
        </h1>
        <p className="text-gray-400">Free, Open Source & Ad-free</p>
      </header>

     <div className="bg-gray-200 shadow-lg rounded-xl p-6 max-w-3xl w-full flex flex-col gap-6">
      {/* Input */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Paste your text or Base64 string here..."
          rows={6}
          className="w-full p-4 border rounded-lg bg-white text-black  transition"
        />
        <button
          onClick={() => copyToClipboard(input, "input")}
          className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#430985] transition"
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
          className="w-full p-4 border rounded-lg bg-white text-black  transition"
        />
        <button
          onClick={() => copyToClipboard(output, "output")}
          className="absolute top-2 right-2 p-1 rounded-full bg-[#9B4DF4] text-white hover:bg-[#450a89] transition"
          title="Copy Output"
        >
          {copiedOutput ? <ClipboardCheck size={20} /> : <ClipboardCopy size={20} />}
        </button>
      </div>
    </div>
      <div className="mt-15 ">
        <p className=" text-black ">
          Use this free Base64 encoder and decoder to easily convert between plain text and Base64-encoded strings.<br/>
          This tool is perfect for decoding API responses.
        </p>
      </div>
       <section className="max-w-3xl mx-auto  py-12">
      <h2 className="text-2xl md:text-xl font-bold text-black mb-2">
        How to Use the Base64 Decode Tool
      </h2>

      <div className="">
        <p className=" text-black ">
          You can use this tool to <span className="font-semibold">decode Base64-encoded strings</span>,
          or to convert Base64 text strings back to their original binary form. Just paste your data
          and copy the result instantly. If you need to convert <span className="font-semibold">images to Base64</span>,
          this tool works for that <Link href="#" className="underline font-bold  text-black"> too.</Link>
        </p>

        <h3 className="text-xl font-semibold  text-black mt-6">Use Cases:</h3>
        <ul className="list-disc list-inside space-y-2  text-black">
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
      <h2 className="text-xl md:text-1xl font-bold  text-black mb-2">
        How Does the Base64 Tool Work?
      </h2>

      <div className="">
        <p className=" text-black ">
          Base64 encoding converts <span className="font-semibold">binary data into a text format</span> 
          that can be safely transmitted over text-based protocols like HTTP, email, and more. 
          This process ensures that the data remains intact and prevents corruption during transmission.
        </p>

        <h3 className="text-xl font-semibold  text-black mt-6">Key Benefits:</h3>
        <ul className="list-disc list-inside space-y-2  text-black">
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
        <h2 className="text-xl md:text-1xl font-bold  text-black mb-6">
          Using Base64 in JavaScript
        </h2>
        <p className=" text-blackmb-4 ">
          In JavaScript, Base64 encoding and decoding can be done using the built-in{" "}
          <code className="bg-[#9B4DF4]  px-1 rounded">btoa</code> and{" "}
          <code className="bg-[#9B4DF4]  px-1 rounded">atob</code> functions.
        </p>

                     <pre className="bg-black text-[#9B4DF4]  text-sm rounded-lg p-4 overflow-x-auto mb-6">
             {`let text = "Hello, world!";
             let encoded = btoa(text);
             console.log(encoded); // "SGVsbG8sIHdvcmxkIQ=="
             
             let encoded = "SGVsbG8sIHdvcmxkIQ==";
             let decoded = atob(encoded);
             console.log(decoded); // "Hello, world!"`}
        </pre>

        <p className=" text-black">
          These functions make it easy to handle encoding and decoding directly within your JavaScript 
          code, enabling smooth data processing and transmission in web applications.
        </p>
      </div>

      {/* --- Meet Jam --- */}
      <div className="  text-blackrounded-2xl shadow-lg p-4">
        <h2 className="text-xl md:text-1xl font-bold mb-4  text-black">
          Meet Convex Converter: The Ultimate Tool for Debugging Web Apps
        </h2>
        <p className="mb-4">
          While this tool helps you manage encoding and decoding efficiently,{" "}
          <Link href="#" className="underline  text-black">Convex Converter</Link> takes your debugging process to the next level.
        </p>
        <p className="mb-4 ">
           Convex Converter is <Link href="#" className="underline  text-black">the browser extension</Link> helping over 140,000 usersdebug faster. 
          It captures console logs, network requests, and more with just one click. Now anyone can 
          log comprehensive bug reports and you can debug so much faster without follow-ups.
        </p>
        <p className="mb-6 ">
          Whether you're dealing with Base64-encoded data or debugging JavaScript functions, 
           Convex Converter captures your screen and automatically includes all the debug details developers 
          need to fix issues in a shareable link.
        </p>
<div className="flex flex-col justify-center rounded-2xl bg-black h-50 items-center">
  <button className="bg-[#9B4DF4] text-black font-semibold px-6 py-3 rounded-xl shadow transition w-50">
    Get  Convex Converter for Free
  </button>
  <p className="mt-2 text-sm text-gray-400">⭐ 150+ reviews · 100k+ users</p>
</div>

      </div>

      {/* --- FAQs --- */}
     <div className="rounded-2xl mt-10">
  <h2 className="text-xl md:text-2xl font-bold  text-black mb-6">
    FAQs
  </h2>
  <ul className="space-y-4  text-black list-disc pl-6">
    <li>
      <span className="font-semibold  text-black">Can you decode Base64?</span><br />
      Yes, you can. Use this tool online by pasting the text into the input box and copying the decoded output.
    </li>
    <li>
      <span className="font-semibold  text-black">How to convert Base64 encoding?</span><br />
      Use our free tool here. Drop your file or text and get an ASCII string output.
    </li>
    <li>
      <span className="font-semibold  text-black">Can you encode Base64?</span><br />
      Yes, just paste your text into our tool and get the encoded result instantly.
    </li>
    <li>
      <span className="font-semibold  text-black">How to encode text to Base64 online?</span><br />
      Paste your text into the input box and copy the output — fast and easy.
    </li>
    <li>
      <span className="font-semibold  text-black">What is Base64?</span><br />
      It’s an encoding scheme that converts binary data into text format using ASCII characters.
    </li>
    <li>
      <span className="font-semibold  text-black">What is the difference between encoding and decoding?</span><br />
      Encoding converts binary data into Base64 text, while decoding converts Base64 text back to binary.
    </li>
  </ul>
</div>

    </section>
    </div>
  );
}
