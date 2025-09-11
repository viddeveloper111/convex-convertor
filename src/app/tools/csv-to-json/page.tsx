"use client";

import React, { useMemo, useRef, useState,ChangeEvent,KeyboardEvent  } from "react";
import Link from "next/link";
import { FileJson } from "lucide-react";

export default function CsvToJsonPage() {
  const [csv, setCsv] = useState(
    ["id,name,email", "1,John Doe,john@example.com", "2,Jane Smith,jane@example.com"].join("\n")
  );
  const [delimiter, setDelimiter] = useState<"," | ";" | "\t" | "|" | "auto">("auto");
  const [hasHeader, setHasHeader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
     const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // redirect to Jam.dev or a typed link
      window.location.href = "https://jam.dev";
    }
  };

  const activeDelimiter = useMemo(() => {
    if (delimiter !== "auto") return delimiter;
    return detectDelimiter(csv);
  }, [csv, delimiter]);

  const rows = useMemo(() => {
    try {
      setError(null);
      return parseCSV(csv, activeDelimiter);
    } catch (e: any) {
      setError(e?.message || "Failed to parse CSV");
      return [];
    }
  }, [csv, activeDelimiter]);

  const json = useMemo(() => {
    if (!rows.length) return [] as any[];
    if (hasHeader) {
      const [header, ...body] = rows;
      return body.map((r) => rowToObject(header, r));
    }
    return rows;
  }, [rows, hasHeader]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsv(String(ev.target?.result || ""));
    };
    reader.readAsText(file);
  }

  async function handleCopy() {
    const text = JSON.stringify(json, null, 2);
    await navigator.clipboard.writeText(text);
    alert("JSON copied to clipboard");
  }

  function handleDownload() {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen  px-4 py-8 bg-[#181023]">
      <div className="max-w-6xl mx-auto container">
        <header className="mb-6 flex items-center justify-between gap-4">
         <div className="flex flex-col items-center text-center">
  <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-semibold text-[#9B4DF4]">
    <FileJson className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" /> 
    CSV → JSON Converter
  </h1>
  <p className="text-gray-400 mt-1">
    Fast, free, open source, ad-free tools.
  </p>
</div>

       <button
  onClick={() => fileInputRef.current?.click()}
  className="rounded-2xl border border-gray-700 px-4 py-2 bg-[#9B4DF4] hover:text-white"
>
  Upload CSV
</button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleFile}
          />
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: CSV input */}
          <div className="bg-black rounded-2xl p-4 border border-gray-800 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <label className="text-sm text-gray-400">Delimiter</label>
              <select
                className="bg-black border border-gray-700 rounded-xl px-3 py-2"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value as any)} // ✅ cast fixed
                title="Delimiter"
              >
                <option value="auto">Auto-detect</option>
                <option value=",">Comma ,</option>
                <option value=";">Semicolon ;</option>
                <option value="\t">Tab \t</option>
                <option value="|">Pipe |</option>
              </select>

              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                />
                First row is header
              </label>
            </div>

            <textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              className="w-full h-64 md:h-[28rem] text-white bg-black rounded-xl p-3 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9B4DF4]"
              placeholder="Paste CSV here"
              spellCheck={false}
            />

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </div>

          {/* Right: JSON output */}
          <div className="bg-black rounded-2xl p-4 border border-gray-800 flex flex-col text-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">JSON Output</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="rounded-xl border border-gray-700 px-3 py-1.5 hover:bg-gray-900 text-sm " 
                >
                  Copy JSON
                </button>
                <button
                  onClick={handleDownload}
                  className="rounded-xl border border-gray-700 px-3 py-1.5 hover:bg-gray-900 text-sm"
                >
                  Download JSON
                </button>
              </div>
            </div>
            <pre className="flex-1 overflow-auto rounded-xl bg-black text-[#9B4DF4] p-3 border  border-gray-800 text-sm whitespace-pre-wrap">
              {JSON.stringify(json, null, 2)}
            </pre>
          </div>
        </div>
     
       <div className="grid md:grid-cols-2 gap-6 mt-8">
  {/* Card 1: Contribute */}
  <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
    <p className="text-white ">
      Our tools are free and open source. Feel free to contribute.
    </p>
    <button className="px-4 py-2 border border-gray-600 rounded-xl bg-[#9B4DF4] hover:bg-[#181023] transition hover:text-white">
      Contribute
    </button>
  </div>

  {/* Card 2: Try Jam */}
  <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
    <p className="text-white">
      Auto-capture all the info engineers need to debug!
    </p>
 <button className="px-4 py-2 border border-gray-600 rounded-xl bg-[#9B4DF4] hover:bg-[#181023] transition hover:text-white">      Try Jam
    </button>
  </div>
</div>
<div className="mt-8 text-gray-300 space-y-2 text-sm ">
  <p>You can convert CSV files into JSON online with this free tool. If you work with APIs, data, or web apps, you can use Jam's CSV to JSON converter to turn tabular data into JSON format.</p>
</div>
<div className=" text-gray-300 space-y-2 text-sm">
  <p>
    Just paste your CSV file and get the JSON result. Built with 💜 by the developers at Jam, using the open-source{" "}
    <Link href="#" className="underline font-bold">
      PapaParse
    </Link>{" "}
    package.
  </p>
</div>
<div className="mt-8 text-gray-300 space-y-2 text-sm">
  <h2 className="text-xl font-semibold mb-2  text-white">How to Use Jam's CSV to JSON Converter Tool</h2>
  <p>
    Whether you're working on web development projects, data analysis, or integrating with APIs, this converter makes it easy to convert CSV files into JSON data.
  </p>
  <ul className="list-disc list-inside mt-2 space-y-1">
    <li>
      <strong>Import CSV file :</strong> Paste the CSV file you want to convert.
    </li>
    <li>
      <strong>Get the JSON result :</strong> Get the JSON output and copy to clipboard.
    </li>
    <li>
      <strong>Lowercase keys :</strong> Optionally, choose to convert all keys in the JSON output to lowercase for consistency.
    </li>
<li>
  <strong>Need to convert the other way?</strong> You can use the JSON to CSV converter{" "}
  <Link href="#" className="underline font-bold">here</Link>.
</li>

  </ul>
</div>
<div className="mt-8 text-gray-300 text-sm space-y-2">
    <h2 className="text-xl font-semibold mb-2  text-white">More JSON Utilities —</h2>
  <p className="mb-2">
     Beautify JSON, convert from query parameters, or YAML with Jam's free developer utilities. They're all available in dark mode too.
  </p>
  <ul className="list-disc list-inside space-y-1">
    <li>
      <Link href="#" className="underline font-extrabold">JSON Formatter :</Link> Format and beautify your JSON data for better readability and debugging.
    </li>
    <li>
      <Link href="#" className="underline font-extrabold">YAML to JSON :</Link> Easily convert human-readable YAML to JSON. Useful where you're working with configuration files and need to switch between them.
    </li>
    <li>
      <Link href="#" className="underline font-extrabold">Query Parameters to JSON :</Link> Simplify data handling and integration in your web applications by converting query strings to JSON.
    </li>
  </ul>
</div>
<div className="mt-8 text-gray-300 text-sm space-y-2">
<h2 className="text-xl font-semibold mb-2  text-white">Benefits of Converting CSV to JSON format</h2>
  <p className="mb-2">
    CSV is a simple file format used to store data in tables, like in a spreadsheet. JSON (JavaScript Object Notation) is an easy-to-read data format that both people and computers can understand.
  </p>
  <ul className="list-disc list-inside space-y-1">
    <li>
      <strong>Data Integration :</strong> JSON helps merge data from CSV files more easily in web applications, as well as APIs.
    </li>
    <li>
      <strong>Data Processing :</strong> JSON is better for converting data in different programming languages.
    </li>
    <li>
      <strong>Data Sharing :</strong> JSON's structured format makes it easier to share and exchange data between different systems and platforms.
    </li>
  </ul>
</div>
<div className="mt-8 text-gray-300 text-sm space-y-4">
  <h2 className="text-xl font-semibold mb-2 text-white">FAQs</h2>
  <ul className="list-disc list-inside space-y-2">
    <li>
      <strong>Can you turn CSV into JSON?</strong> Yes, our tool easily converts CSV files to JSON format, making it perfect for data integration and processing.
    </li>
    <li>
      <strong>How accurate is the converter?</strong> Our tool can handle both CSV data and JSON data, ensuring data integrity when switching between data formats.
    </li>
    <li>
      <strong>How to convert JSON to CSV using Excel?</strong> Open Excel and go to the "Data" tab. Select "Get Data" &gt; "From File" &gt; "From JSON" to import your JSON file. Use the Power Query Editor to transform and load the data, then save it as a CSV file.
    </li>
    <li>
      <strong>What is the delimiter of CSV to JSON?</strong> Our tool uses commas to separate values in CSV and properly formats JSON output.
    </li>
    <li>
      <strong>Is the CSV to JSON converter suitable for all types of data?</strong> Yes. Our tool can handle various types of table data, which is beneficial for developers, data analysts, and anyone who works with data.
    </li>
    <li>
      <strong>How easy is it to use the CSV to JSON converter?</strong> Jam's converter is user-friendly and intuitive, allowing anyone to use it without technical knowledge. Simply paste your CSV file, and the tool will do the rest.
    </li>
    <li>
      <strong>Are there any limitations to the converter?</strong> The tool functions effectively for all standard use cases. It can handle typical CSV files and also extremely large files.
    </li>
    <li>
      <strong>How to convert CSV to JSON in Visual Studio Code?</strong> You can use extensions in Visual Studio Code to convert CSV to JSON. Or you can try our online converter for a quick and easy conversion right here.
    </li>
  </ul>
</div>


    </div>
     </div>
  );
}

// ------------------------ Helpers ------------------------

function detectDelimiter(text: string): "," | ";" | "\t" | "|" {
  const sample = text.split(/\r?\n/).slice(0, 5).join("\n");
  const candidates: Array<"," | ";" | "\t" | "|"> = [",", ";", "\t", "|"];
  let best: { d: any; score: number } = { d: ",", score: -Infinity };
  for (const d of candidates) {
    const lines = sample.split(/\r?\n/).filter(Boolean);
    const counts = lines.map((l) => countTopLevelSplits(l, d));
    const variance = calcVariance(counts);
    const score = -variance + counts.reduce((a, b) => a + b, 0) * 0.01;
    if (score > best.score) best = { d, score };
  }
  return best.d;
}

function countTopLevelSplits(line: string, d: string) {
  let inQuotes = false;
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === d && !inQuotes) {
      count++;
    }
  }
  return count;
}

function calcVariance(nums: number[]) {
  if (!nums.length) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  return nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
}

function parseCSV(text: string, d: string): string[][] {
  const out: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    if (row.length > 0) out.push(row);
    row = [];
  };

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === d) {
        pushField();
        i++;
        continue;
      }
      if (ch === "\n") {
        pushField();
        pushRow();
        i++;
        continue;
      }
      if (ch === "\r") {
        if (text[i + 1] === "\n") {
          pushField();
          pushRow();
          i += 2;
          continue;
        } else {
          pushField();
          pushRow();
          i++;
          continue;
        }
      }
      field += ch;
      i++;
    }
  }
  pushField();
  pushRow();

  return out;
}

function rowToObject(header: string[], r: string[]) {
  const o: Record<string, any> = {};
  const len = Math.max(header.length, r.length);
  for (let i = 0; i < len; i++) {
    const key = header[i] ?? `col_${i + 1}`;
    o[key] = r[i] ?? "";
  }
  return o;
}
