"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import yaml from "js-yaml";
import { FileJson } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // icon for the button


export default function YamlToJsonPage() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("[]");
  const [copied, setCopied] = useState(false);
  const router = useRouter();


  // YAML → JSON conversion
// YAML → JSON conversion
useEffect(() => {
  try {
    if (yamlInput.trim() === "") {
      setJsonOutput("[]");
      return;
    }
    const parsed = yaml.load(yamlInput);
    setJsonOutput(JSON.stringify(parsed, null, 2));
  } catch (err: unknown) {
    if (err instanceof Error) {
      setJsonOutput(`Error: ${err.message}`);
    } else {
      setJsonOutput("An unknown error occurred");
    }
  }
}, [yamlInput]);


  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
      useEffect(() => {
      document.title = "YAML to JSON Converter";
    }, []);

  return (
    <div className="bg-white">
      {/* Back Button */}
<div className="p-6 flex justify-start">
  <button
    onClick={() => router.back()}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
  >
    <ArrowLeft className="h-5 w-5" />
    Back
  </button>
</div>

    <div className="mx-auto p-6 space-y-12 max-w-7xl">
      {/* Header */}
    <header className="text-center space-y-2">
  <h1 className="flex justify-center items-center gap-2 text-3xl font-bold text-[#9B4DF4]">
    <FileJson className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
    YAML to JSON
  </h1>

  <p className="text-gray-400">
    Free, Open Source & Ad-free
  </p>
</header>


      {/* Converter Tool */}
      <section className="bg-gray-200 rounded-2xl shadow p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* YAML Input */}
          <div>
            <h2 className="font-semibold text-black mb-2">
              YAML
            </h2>
            <textarea
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              placeholder="Paste YAML here"
              rows={12}
              className="w-full p-3 rounded-lg border   text-black bg-white font-mono text-sm focus:ring-2"
            />
          </div>

          {/* JSON Output */}
          <div>
            <h2 className="font-semibold text-black mb-2">
              JSON
            </h2>
            <pre className="w-full h-[290px] p-3 rounded-lg border border-gray-700 bg-white text-[#9B4DF4] font-mono text-sm overflow-x-auto focus:ring-2  focus:ring-[#9B4DF4]">
              {jsonOutput}
            </pre>
            <button
              onClick={handleCopy}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#5309a7] transition "
            >
              {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="p-6">
        <p className="text-black">
          Our free, open-source, and ad-free YAML to JSON converter makes it
          easy to handle your data formats. Convert configuration files or
          integrate YAML data into web apps and APIs with just a few clicks.
          Built with 💜 for developers by developers, using the open-source{" "}
          <b>js-yaml</b> package.
        </p>
      </section>

      {/* Why Convert */}
      <section className=" p-6 space-y-4">
        <h2 className="text-2xl font-bold text-black">
          Why Convert YAML to JSON?
        </h2>
        <p className="text-black">
          YAML (YAML Ain't Markup Language) is widely used for configuration
          files, but JSON (JavaScript Object Notation) is a more universal data
          format, especially in web development and APIs. Converting YAML to
          JSON is essential when you need:
        </p>
        <ul className="list-disc pl-6 text-black space-y-2">
          <li>
            <b>Data Integration:</b> JSON supports data sharing across multiple
            platforms, including web applications and APIs.
          </li>
          <li>
            <b>Data Portability:</b> JSON’s lightweight structure ensures it can
            be easily transmitted between servers, applications, and databases.
          </li>
          <li>
            <b>Cross-Language Compatibility:</b> JSON works with almost every
            programming language, making it ideal for dynamic web applications.
          </li>
        </ul>
      </section>

      {/* How to Use */}
      <section className=" p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          How to Use Our YAML to JSON Converter
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-black">
          <li>Paste your YAML code into the input box.</li>
          <li>Instantly receive your JSON output. No registration or ads.</li>
          <li>Copy your JSON data and integrate it into your project.</li>
        </ol>
      </section>

      {/* Key Features */}
      <section className=" p-6 space-y-3">
        <h2 className="text-2xl font-bold text-black">
          Key Features of Our YAML to JSON Tool
        </h2>
        <ul className="space-y-2 text-black">
          <li>⚡ Fast and accurate – instant conversions with no loss of data integrity.</li>
          <li>📂 Supports large files – convert small or large YAML files without issues.</li>
          <li>✅ Built-in JSON validation – strict JSON standards ensured.</li>
          <li>👨‍💻 Developer-friendly – no ads, no registration, just copy & use.</li>
        </ul>
      </section>

      {/* YAML vs JSON */}
      <section className="p-6 space-y-3">
        <h2 className="text-2xl font-bold text-black">
          YAML vs JSON: Which is Better for Your Project?
        </h2>
        <p className="text-black">
          Both YAML and JSON have their strengths, but choosing the right format
          depends on your specific use case:
        </p>
        <ul className="list-disc pl-6 text-black space-y-1">
          <li>
            <b className="text-black">YAML:</b> Easier for humans to read and write. Ideal for
            configuration files and complex data structures.
          </li>
          <li>
            <b className="text-black">JSON:</b> Lightweight and widely supported across programming
            languages. Essential for APIs, web services, and data exchange.
          </li>
        </ul>
        <p className="text-black">
          Our tool ensures that converting YAML to JSON retains the integrity of
          your data, allowing you to use the best format for each project.
        </p>
      </section>

      {/* FAQs */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          FAQs
        </h2>
        <div className="space-y-4 text-black">
          <div>
            <p className="font-semibold text-black">What is YAML?</p>
            <p>
              YAML (YAML Ain't Markup Language) is a human-readable data format
              often used in configuration files for applications and services.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black">What is JSON?</p>
            <p>
              JSON (JavaScript Object Notation) is a lightweight data format
              used to transmit data between servers and web applications.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black">
              Can I convert large YAML files to JSON?
            </p>
            <p>
              Yes, our tool can handle both small and large files, ensuring a
              quick and reliable conversion.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black">How accurate is this converter?</p>
            <p>
              Our tool maintains full data integrity, ensuring the JSON output
              accurately represents your original YAML data.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black">
              Is the YAML to JSON converter suitable for all types of data?
            </p>
            <p>
              Yes. It can handle multi-line strings, key-value pairs, and
              complex configurations safely.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black">Can I convert JSON back to YAML?</p>
            <p>
              Absolutely! You can switch between formats easily with our JSON to
              YAML converter.
            </p>
          </div>
        </div>
      </section>

    </div>
    </div>
  );
}
