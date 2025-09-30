"use client";

import { useState, useEffect } from "react";
import { Database, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SQLMinifier() {
  const [sqlInput, setSqlInput] = useState("");
  const [minifiedSQL, setMinifiedSQL] = useState("");
  const router = useRouter();

  // Automatically minify SQL on input change
  useEffect(() => {
    const minified = sqlInput
      .replace(/--.*$/gm, "")           // remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove block comments
      .replace(/\s+/g, " ")             // replace multiple whitespaces with single space
      .trim();
    setMinifiedSQL(minified);
  }, [sqlInput]);
      useEffect(() => {
      document.title = "SQL Minifier Converter";
    }, []);

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="max-w-7xl w-full space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="flex justify-center items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <Database className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            SQL Minifier
          </h1>
          <p className="text-gray-400 text-lg">
            Fast, free, open source, ad-free tool.
          </p>
        </section>

        {/* Input / Output */}
        <section className="bg-gray-200 p-6 rounded-2xl shadow-md  space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <textarea
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="Paste SQL here..."
              className="flex-1 p-4 border border-gray-600 focus:ring-2 focus:ring-[#9B4DF4] rounded-lg bg-white text-black resize-none h-40"
            />
            <textarea
              value={minifiedSQL}
              readOnly
              placeholder="Minified SQL"
              className="flex-1 p-4 border border-gray-600 focus:ring-2 focus:ring-[#9B4DF4] rounded-lg bg-white text-black resize-none h-40"
            />
          </div>
        </section>

        {/* Description */}
        <section className="space-y-2 text-black">
          <p>
            Free Online SQL Minifier. Compress & optimize SQL queries by removing comments, extra spaces, and line breaks.
          </p>
          <p>
            Works with MySQL, PostgreSQL, SQL Server, Oracle, SQLite, MariaDB, and Redshift.
          </p>
        </section>

        {/* Benefits */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Benefits of SQL Minification</h2>
          <ul className="list-disc list-inside text-black space-y-2">
            <li><strong>Improved Query Performance:</strong> Parse up to 20% faster.</li>
            <li><strong>Reduced Network Bandwidth:</strong> Compress SQL by 30-50%.</li>
            <li><strong>Supports Major Databases:</strong> MySQL, PostgreSQL, SQL Server, Oracle, SQLite, MariaDB, Redshift.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-black mb-4">SQL Minifier FAQs</h2>
          <ul className="space-y-3 text-black">
            <li><strong>What does SQL minification do?</strong> Removes comments, spaces, tabs, and line breaks while preserving logic.</li>
            <li><strong>Performance improvement?</strong> 5-20% faster parsing, 30-50% bandwidth reduction.</li>
            <li><strong>Supported databases?</strong> MySQL, PostgreSQL, SQL Server, Oracle, SQLite, MariaDB, Redshift.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
