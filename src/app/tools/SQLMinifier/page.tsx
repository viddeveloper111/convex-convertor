"use client";

import { useState, useEffect } from "react";

export default function SQLMinifier() {
  const [sqlInput, setSqlInput] = useState("");
  const [minifiedSQL, setMinifiedSQL] = useState("");

  // Automatically minify SQL on input change
  useEffect(() => {
    const minified = sqlInput
      .replace(/--.*$/gm, "")         // remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove block comments
      .replace(/\s+/g, " ")           // replace multiple whitespaces with single space
      .trim();
    setMinifiedSQL(minified);
  }, [sqlInput]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <section className="bg-white  py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
            <h1 className="text-4xl font-bold text-black">
              SQL Minifier
            </h1>
            <p className="text-black text-lg">
              Fast, free, open source, ad-free tools.
            </p>
            <p className="text-gray-700 ">
              by Jam.dev — One click bug reports devs love
            </p>
          </div>
        </section>

        {/* Input / Output */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <textarea
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="Paste SQL here..."
              className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50  text-black  resize-none h-40"
            />
            <textarea
              value={minifiedSQL}
              readOnly
              placeholder="Minified SQL"
              className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 text-black resize-none h-40"
            />
          </div>
        </section>

        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-6 w-full">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-black">
                Our tools are free and open source. Feel free to contribute.
              </p>
              <button className="px-4 py-2 border text-black border-gray-600 rounded-xl hover:bg-gray-800  hover:text-white transition">
                Contribute
              </button>
            </div>
            <div className=" p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-black">
                Auto-capture all the info engineers need to debug!
              </p>
              <button className="px-4 py-2 border border-gray-600 text-black rounded-xl hover:bg-gray-800 hover:text-white transition">
                Try Jam
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="space-y-2">
          <p className="text-black">
            Free Online SQL Minifier. Compress & Optimize SQL Queries. Instantly remove comments, unnecessary whitespace, and line breaks.
          </p>
          <p className="text-black">
            Works with MySQL, PostgreSQL, SQL Server, Oracle, and SQLite.
          </p>
        </section>

        {/* Benefits */}
        <section className="bg-white p-6 rounded-2xl shadow-md ">
          <h2 className="text-2xl font-bold text-black mb-4">
            Benefits of SQL Minification
          </h2>
          <ul className="list-disc list-inside text-black space-y-2">
            <li><strong>Improved Query Performance:</strong> Parse up to 20% faster.</li>
            <li><strong>Reduced Network Bandwidth:</strong> Compress SQL by 30-50%.</li>
            <li><strong>Supports Major Databases:</strong> MySQL, PostgreSQL, SQL Server, Oracle, SQLite, MariaDB, Redshift.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="bg-white  p-6 rounded-2xl shadow-md ">
          <h2 className="text-2xl font-bold text-black mb-4">
            SQL Minifier FAQs
          </h2>
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
