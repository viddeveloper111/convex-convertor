"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState("");
  const [utcDate, setUtcDate] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [copied, setCopied] = useState(false);

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
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto max-w-5xl p-6 space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-black">
            Timestamp to Date Converter
          </h1>
          <p className="text-black">Free, Open Source & Ad-free</p>
          <p className="text-sm text-gray-700">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Converter Tool */}
        <section className="dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6">
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
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 text-black bg-white font-mono text-sm"
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Date (UTC)
              </h2>
              <pre className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white text-green-400 font-mono text-sm overflow-x-auto">
                {utcDate || "—"}
              </pre>

              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Date (Local)
              </h2>
              <pre className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white text-green-400 font-mono text-sm overflow-x-auto">
                {localDate || "—"}
              </pre>

              <button
                onClick={() => handleCopy(localDate || utcDate)}
                className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
              >
                {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-3">
          <p className="text-black">
            Easily convert Unix timestamps into human-readable dates. Ideal for debugging logs, analyzing datasets, or working on web development projects.
          </p>
          <p className="text-black">
            Made with 💜 by the developers building Jam.
          </p>
        </section>

        {/* Features */}
        <section className="bg-white rounded-2xl shadow p-6 space-y-3">
          <h2 className="text-2xl font-bold text-black">Features</h2>
          <ul className="list-disc pl-6 space-y-1 text-black">
            <li><b>Instant Conversion:</b> Converts timestamps automatically.</li>
            <li><b>Accurate Results:</b> Shows both UTC and local time.</li>
            <li><b>Open Source:</b> Made with 💜 by Jam.dev.</li>
          </ul>
        </section>

        {/* How to Use */}
        <section className="bg-white  rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-black mb-2">
            How to Use Jam's Timestamp Converter
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-black">
            <li>Input the timestamp in seconds or milliseconds.</li>
            <li>Your date is displayed instantly in UTC and local time.</li>
            <li>Copy the result for further use.</li>
          </ol>
        </section>

        {/* Explanation */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-3">
          <h2 className="text-2xl font-bold text-black">What is a Unix Timestamp?</h2>
          <p className="text-black">
            A Unix timestamp represents the number of seconds since January 1st, 1970 UTC. It’s widely used for logging, file systems, and computing.
          </p>
          <p className="text-black">
            The Year 2038 problem affects 32-bit integers and can cause overflow; using 64-bit integers solves this limitation.
          </p>
        </section>

        {/* Code Snippet */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-black mb-2">Example Code (JS/TS)</h2>
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
        <section className="bg-white rounded-2xl shadow p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black mb-2">FAQs</h2>
          <ul className="list-disc pl-6 text-black space-y-1">
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
