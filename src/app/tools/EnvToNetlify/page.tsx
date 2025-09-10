"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function EnvToNetlifyPage() {
  const [envInput, setEnvInput] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-convert .env to netlify.toml
  const convertEnvToNetlify = (input: string) => {
    const lines = input.split("\n");
    const result = lines
      .filter(line => line?.trim() && !line.trim().startsWith("#"))
      .map(line => {
        const [key, ...rest] = line.split("=");
        const value = rest.join("=");
        return `  ${key.trim()} = "${value.trim()}"`;
      })
      .join("\n");

    return `[build.environment]\n${result}`;
  };

  const netlifyOutput = convertEnvToNetlify(envInput);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(netlifyOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="bg-white min-h-screen p-6 flex justify-center">
      {/* Container */}
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-black">
            Convert .env to netlify.toml
          </h1>
          <p className="text-black">
            Free, Open Source & Ad-free
          </p>
          <p className="text-sm text-black">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Input Section */}
        <section className="space-y-2 border rounded-2xl p-5 bg-gray-900 ">
          <label className="font-semibold text-white">
            Paste your .env content
          </label>
          <textarea
            value={envInput}
            onChange={(e) => setEnvInput(e.target.value)}
            rows={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg text-black bg-white font-mono text-sm"
            placeholder="API_KEY=12345&#10;NODE_ENV=production"
          />
        </section>

        {/* Output Section */}
        <section className="space-y-2">
          <label className="font-semibold text-black">
            netlify.toml output
          </label>
          <pre className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white text-green-400 font-mono text-sm">
            {netlifyOutput}
          </pre>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
            {copied ? "Copied!" : "Copy Output"}
          </button>
        </section>

        {/* Description */}
        <section className="bg-white  rounded-2xl shadow p-6">
          <p className="text-black">
            This free tool allows you to quickly and easily convert your <code>.env</code> file variables into the format needed for your <code>netlify.toml</code> file. 
            This tool was contributed to Jam&apos;s dev utilities by Cassidy Williams — software engineer, dev advocate, startup advisor, and investor. 
            You can find her posting memes on Twitter and sharing learnings and tools for developers in her newsletter.
          </p>
        </section>

        {/* How to Use */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black mb-2">
            How to Use
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>
              <strong>Paste your variables:</strong> Copy the variables from your <code>.env</code> file and paste them into the input box.
            </li>
            <li>
              <strong>Handles comments and empty lines:</strong> The tool works with comments and empty lines, so you don't need to remove them manually.
            </li>
            <li>
              <strong>Copy the result:</strong> Copy the converted output and paste it into your <code>netlify.toml</code> file.
            </li>
            <li>
              <strong>Contributed by Cassidy Williams:</strong> This tool was added to Jam.dev's dev utilities by Cassidy Williams — software engineer, dev advocate, startup advisor, and investor.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
