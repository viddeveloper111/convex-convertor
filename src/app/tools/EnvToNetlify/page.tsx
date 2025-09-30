"use client";

import { useState ,useEffect} from "react";
import { ClipboardCopy, ClipboardCheck, FileCog, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnvToNetlifyPage() {
  const [envInput, setEnvInput] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Auto-convert .env to netlify.toml
  const convertEnvToNetlify = (input: string) => {
    const lines = input.split("\n");
    const result = lines
      .filter(line => line.trim() && !line.trim().startsWith("#"))
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
      useEffect(() => {
      document.title = "Netlify to Ml Converter";
    }, []);

  return (
    <div className="bg-white min-h-screen p-6">
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

      {/* Main Content */}
      <div className="flex justify-center">
        <div className="w-full max-w-7xl space-y-8">
          {/* Header */}
          <header className="text-center space-y-2">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-[#9B4DF4]">
              <FileCog className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
              Convert .env to netlify.toml
            </h1>
            <p className="text-gray-500">Free, Open Source & Ad-free</p>
          </header>

          {/* Input Section */}
          <section className="space-y-2 border rounded-2xl p-5 bg-gray-200">
            <label className="font-semibold text-black">Paste your .env content</label>
            <textarea
              value={envInput}
              onChange={(e) => setEnvInput(e.target.value)}
              rows={6}
              className="w-full p-3 border  rounded-lg bg-white text-black font-mono text-sm "
              placeholder="API_KEY=12345&#10;NODE_ENV=production"
            />
          </section>

          {/* Output Section */}
          <section className="space-y-2">
            <label className="font-semibold text-black">netlify.toml output</label>
            <pre className="p-3 rounded-lg border border-gray-300 bg-white text-[#9B4DF4] font-mono text-sm">
              {netlifyOutput}
            </pre>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </section>

          {/* Description */}
          <section className="p-6">
            <p className="text-black">
              This free tool allows you to quickly convert your <code>.env</code> file variables into the format needed for your <code>netlify.toml</code> file. 
              Contributed by Cassidy Williams — software engineer, dev advocate, startup advisor, and investor.
            </p>
          </section>

          {/* How to Use */}
          <section className="p-6 space-y-2">
            <h2 className="text-2xl font-bold text-black mb-2">How to Use</h2>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li><strong>Paste your variables:</strong> Copy the variables from your <code>.env</code> file into the input box.</li>
              <li><strong>Handles comments and empty lines:</strong> You don’t need to remove comments or empty lines.</li>
              <li><strong>Copy the result:</strong> Copy the converted output and paste it into your <code>netlify.toml</code> file.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
