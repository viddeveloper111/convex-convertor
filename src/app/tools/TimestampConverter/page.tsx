"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // icon for the button


export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState("");
  const [utcDate, setUtcDate] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();


  // Convert timestamp to UTC & local date
  const convertTimestamp = (ts: string) => {
    if (!ts) {
      setUtcDate("");
      setLocalDate("");
      return;
    }
    try {
      let date: Date;
      if (/^\d{11,13}$/.test(ts)) {
        date = new Date(parseInt(ts, 10));
      } else if (/^\d{1,10}$/.test(ts)) {
        date = new Date(parseInt(ts, 10) * 1000);
      } else {
        throw new Error("Invalid timestamp format");
      }
      if (isNaN(date.getTime())) throw new Error("Invalid date");

      setUtcDate(date.toUTCString());
      setLocalDate(date.toString());
    } catch (err: any) {
      setUtcDate(`⚠️ ${err.message}`);
      setLocalDate(`⚠️ ${err.message}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTimestamp(value);
    convertTimestamp(value);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#181023] min-h-screen py-10">
      {/* Back Button */}
<div className="ps-6 flex justify-start">
  <button
    onClick={() => router.back()}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
  >
    <ArrowLeft className="h-5 w-5" />
    Back
  </button>
</div>

      <div className="container mx-auto max-w-5xl p-6 space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
              <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-[#9B4DF4]">
      <Clock className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      Timestamp to Date Converter
    </h1>
          <p className="text-gray-400">Free, Open Source & Ad-free</p>
        </header>

        {/* Converter Tool */}
        <section className="bg-black rounded-2xl shadow p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Timestamp (milliseconds or seconds)
              </h2>
              <input
                type="text"
                value={timestamp}
                onChange={handleChange}
                placeholder="Paste here"
                className="w-full p-3 rounded-lg border border-gray-300  bg-black text-white font-mono text-sm  focus:ring-2 focus:ring-[#9B4DF4]"
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Date (UTC)
              </h2>
              <pre className="w-full p-3 rounded-lg border border-gray-300  bg-black text-[#9B4DF4] font-mono text-sm overflow-x-auto  focus:ring-2 focus:ring-[#9B4DF4]">
                {utcDate || "—"}
              </pre>

              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Date (Local)
              </h2>
              <pre className="w-full p-3 rounded-lg border border-gray-300  bg-black text-[#9B4DF4] font-mono text-sm overflow-x-auto  focus:ring-2 focus:ring-[#9B4DF4]">
                {localDate || "—"}
              </pre>

              <button
                onClick={() => handleCopy(localDate || utcDate)}
                className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#570dab] transition"
              >
                {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="p-6 space-y-3">
          <p className="text-gray-400">
            Easily convert Unix timestamps into human-readable dates. Ideal for debugging logs, analyzing datasets, or working on web development projects.
          </p>
        </section>

        {/* Features */}
        <section className=" p-6 space-y-3">
          <h2 className="text-2xl font-bold text-white">Features</h2>
          <ul className="list-disc pl-6 space-y-1 text-white">
            <li><b>Instant Conversion:</b> Converts timestamps automatically.</li>
            <li><b>Accurate Results:</b> Shows both UTC and local time.</li>
            <li><b>Open Source:</b> Made with 💜 by Jam.dev.</li>
          </ul>
        </section>

        {/* How to Use */}
        <section className=" p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            How to Use Jam's Timestamp Converter
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-400">
            <li>Input the timestamp in seconds or milliseconds.</li>
            <li>Your date is displayed instantly in UTC and local time.</li>
            <li>Copy the result for further use.</li>
          </ol>
        </section>

        {/* Explanation */}
        <section className=" p-6 space-y-3">
          <h2 className="text-2xl font-bold text-white">What is a Unix Timestamp?</h2>
          <p className="text-gray-400">
            A Unix timestamp represents the number of seconds since January 1st, 1970 UTC. It’s widely used for logging, file systems, and computing.
          </p>
          <p className="text-gray-400">
            The Year 2038 problem affects 32-bit integers and can cause overflow; using 64-bit integers solves this limitation.
          </p>
        </section>

        {/* Code Snippet */}
        <section className=" p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Example Code (JS/TS)</h2>
          <pre className=" text-green-600 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`function convertTimestampToDate(timestamp: string) {
  let date: Date;

  if (/^\\d{11,13}$/.test(timestamp)) {
    date = new Date(parseInt(timestamp, 10));
  } else if (/^\\d{1,10}$/.test(timestamp)) {
    date = new Date(parseInt(timestamp, 10) * 1000);
  } else {
    throw new Error("Invalid timestamp format");
  }

  if (isNaN(date.getTime())) throw new Error("Invalid date");

  return date.toUTCString();
}`}
          </pre>
        </section>

        {/* FAQs */}
        <section className=" p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white mb-2">FAQs</h2>
          <ul className="list-disc pl-6 text-gray-400 space-y-1">
            <li><b>Accuracy:</b> Both UTC and local times are precise.</li>
            <li><b>Suitable for all timestamps:</b> Works for seconds and milliseconds.</li>
            <li><b>Ease of use:</b> Instant conversion; copy-ready output.</li>
            <li><b>Year 2038 issue:</b> Occurs on 32-bit timestamps; 64-bit avoids the problem.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
