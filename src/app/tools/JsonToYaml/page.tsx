"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, FileJson, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import yaml from "js-yaml";

export default function JsonToYamlPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Auto convert when input changes
  useEffect(() => {
    if (!jsonInput.trim()) {
      setYamlOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const yamlResult = yaml.dump(parsed);
      setYamlOutput(yamlResult);
    } catch (err) {
      setYamlOutput("Invalid JSON");
    }
  }, [jsonInput]);

  // Copy YAML output
  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(yamlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center p-6">
      <div className="w-full max-w-5xl space-y-8">
        {/* Back Button */}
        <div className="mb-6 flex justify-start">
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
            <FileJson className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            JSON to YAML Converter
          </h1>
          <p className="text-gray-400">Free, Open Source & Ad-free</p>
        </header>

        {/* Input Section */}
        <section className="space-y-2 border p-5 bg-gray-200 rounded-2xl">
          <label className="font-semibold text-black">JSON Input</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={8}
            className="w-full p-3 border  rounded-lg bg-white text-black font-mono text-sm "
            placeholder='{"name":"John","age":30}'
          />
        </section>

        {/* Output Section */}
        <section className="space-y-2 relative">
          <label className="font-semibold text-black">YAML Output</label>
          <pre className="p-6 rounded-lg border bg-white text-[#9B4DF4] font-mono text-sm whitespace-pre-wrap">
            {yamlOutput}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-8 right-2 flex items-center gap-1 px-3 py-1 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#501594] transition"
          >
            {copied ? <ClipboardCheck size={16} /> : <ClipboardCopy size={16} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </section>

        {/* Description & Benefits */}
        <section className="p-6 space-y-4">
          <p className="text-black">
            This free tool quickly converts JSON to YAML. Ideal for configuration files, data, or web apps. Simply paste your JSON data and get the YAML result. Built with 💜 by the  Convex Converter developers, using the open-source <code>js-yaml</code> package.
          </p>

          <h2 className="text-2xl font-bold text-black">How to Use</h2>
          <p className="text-black">
            To convert JSON data to YAML files, just input your JSON and copy the YAML output. No signup required.
          </p>
          <p className="text-black">
            Our tool’s built-in YAML Validator ensures syntactically correct output, so you can reliably use the data in your applications.
          </p>
          <p className="text-black">
            Need to convert the other way? Use the YAML to JSON converter.
          </p>

          <h2 className="text-2xl font-bold text-black">Benefits of Converting JSON to YAML</h2>
          <ul className="list-disc pl-6 space-y-1 text-black">
            <li><b>Data Integration:</b> Merge data from files easily in web apps and APIs.</li>
            <li><b>Data Processing:</b> Better for converting data between programming languages.</li>
            <li><b>Data Sharing:</b> Easier to share and exchange structured data between systems.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black">JSON vs YAML</h2>
          <ul className="list-disc pl-6 space-y-1 text-black">
            <li><b>Readability:</b> YAML prioritizes human readability with clean indentation; JSON is structured but less readable for complex configs.</li>
            <li><b>Syntax:</b> JSON is stricter; YAML supports multi-line strings and nested maps/dictionaries.</li>
            <li><b>Use Cases:</b> JSON is common in APIs; YAML is common for configuration files and Ansible playbooks.</li>
            <li><b>Data Types & Features:</b> Both support basic types; YAML supports anchors, aliases, and more complex structures.</li>
          </ul>
        </section>

        {/* FAQs */}
        <section className="p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">FAQs</h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Can you turn JSON into YAML? Yes, easily and reliably.</li>
            <li>How accurate is the converter? It ensures data integrity when converting formats.</li>
            <li>How to use an editor for conversion? Use VSCode with relevant extensions or our online tool.</li>
            <li>Is the converter suitable for all types of JSON? Yes, including multi-line strings and nested objects.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
