"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck, ArrowLeft, FileJson } from "lucide-react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Convert JSON to CSV
  const convertJsonToCsv = (input: string) => {
    try {
      const data = JSON.parse(input);
      return Papa.unparse(data);
    } catch {
      return "Invalid JSON";
    }
  };

  // Auto convert on input change
  const handleChange = (text: string) => {
    setJsonInput(text);
    const csv = convertJsonToCsv(text);
    setCsvOutput(csv);
  };

  const handleCopy = () => {
    if (!csvOutput) return;
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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
        <div className="w-full max-w-5xl space-y-8">
          {/* Header */}
          <header className="text-center space-y-2">
            <h1 className="flex justify-center items-center gap-2 text-3xl font-bold text-[#9B4DF4]">
              <FileJson className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
              JSON to CSV Converter
            </h1>
            <p className="text-gray-400">
              Fast, free, open source, ad-free tools.
            </p>
          </header>

          {/* Input Section */}
          <section className="space-y-2 border p-5 rounded-2xl bg-gray-200">
            <label className="font-semibold text-black">JSON Input</label>
            <textarea
              value={jsonInput}
              onChange={(e) => handleChange(e.target.value)}
              rows={8}
              className="w-full p-3 border  rounded-lg bg-white text-black font-mono text-sm "
              placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
            />
          </section>

          {/* Output Section */}
          <section className="space-y-2">
            <label className="font-semibold text-black">CSV Output</label>
            <pre className="p-4 rounded-lg border border-gray-300 bg-white text-[#9B4DF4] font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]">
              {csvOutput}
            </pre>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#55258d] transition"
            >
              {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
              {copied ? "Copied!" : "Copy CSV"}
            </button>
          </section>

          {/* Description Sections */}
          <section className="p-6 space-y-2">
            <p className="text-black">
              This free tool offers a quick and easy way to convert JSON files into CSV format. If you work with data analysis, spreadsheets, or need to import data into various applications, you can use  Convex Converter's JSON to CSV converter to transform structured JSON data into tabular CSV format. Simply paste your JSON data and get the CSV result.
            </p>
            <p className="text-black">
              Built with 💜 by the developers at  Convex Converter, using the open-source PapaParse package.
            </p>
          </section>

          {/* How to Use */}
          <section className="p-6 space-y-2">
            <h2 className="text-2xl font-bold text-black mb-2">
              How to Use  Convex Converter's JSON to CSV Converter Tool
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-black">
              <li>Import JSON data: Paste the JSON data you want to convert.</li>
              <li>Get the CSV result: Obtain the CSV output and copy to clipboard.</li>
              <li>Simple and fast conversion: Our tool quickly converts JSON data into a flat CSV format, ready for use in spreadsheet applications.</li>
            </ol>
            <p className="mt-2 text-black">
              Need to convert the other way? You can use the CSV to JSON converter here.
            </p>
          </section>

          {/* Benefits */}
          <section className="p-6 space-y-2">
            <h2 className="text-2xl font-bold text-black mb-2">
              Benefits of Converting JSON to CSV
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li><b>Data Analysis:</b> CSV format is ideal for importing data into spreadsheet applications for analysis and visualization.</li>
              <li><b>Data Compatibility:</b> CSV is widely supported, making it easier to import data into software and systems.</li>
              <li><b>Data Readability:</b> CSV's tabular format makes it easy for humans to read and understand large datasets quickly.</li>
            </ul>
          </section>

          {/* FAQs */}
          <section className="p-6 space-y-2">
            <h2 className="text-2xl font-bold text-black mb-2">FAQs</h2>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li><b>Can you convert JSON to CSV?</b> Yes, our tool easily converts JSON files to CSV format, perfect for data analysis and reporting.</li>
              <li><b>How accurate is the converter?</b> It handles both JSON and CSV data formats, ensuring data integrity.</li>
              <li><b>What types of JSON can be converted?</b> Simple, flat JSON structures are supported effectively.</li>
              <li><b>How easy is it to use?</b> Paste your JSON data and let the tool do the conversion.</li>
              <li><b>How to convert JSON to CSV in Python?</b> Use Python libraries like pandas, or try our online converter for a quick solution.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
