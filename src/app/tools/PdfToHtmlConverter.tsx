"use client";

import { useRef, useState, useEffect } from "react";
import { FileCode, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDocument } from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

// ✅ Set PDF.js worker
// GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfToHtmlConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [htmlUrl, setHtmlUrl] = useState<string>("");
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Validate file type
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    // ✅ Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setFileName(file.name);

    try {
      const pdfData = await file.arrayBuffer();
      const pdf = await getDocument({ data: pdfData }).promise;

      let htmlContent = `<html><head><meta charset="UTF-8"><title>${file.name}</title></head><body>`;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => (item.str ? item.str : ""))
          .filter(Boolean)
          .join(" ");

        htmlContent += `<h3 style="margin-top:20px;">Page ${i}</h3><p style="margin-bottom:30px; line-height:1.5;">${pageText}</p>`;
      }

      htmlContent += `</body></html>`;

      // ✅ Create Blob and URL for download
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setHtmlUrl(url);
    } catch (error) {
      console.error("PDF to HTML conversion error:", error);
      alert("Failed to convert PDF to HTML. Please try another file.");
    }
  };

  useEffect(() => {
    document.title = "PDF to HTML Converter";
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] flex items-center gap-2">
        <FileCode className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PDF → HTML Converter
      </h1>
      <p className="text-gray-400">Free, Open Source & Ad-free</p>

      {/* Upload Area */}
      <div
        className="mt-6 w-full max-w-7xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4] transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
        <p className="text-black mb-2">
          Drag and drop your PDF file here, or click to select (Max size 10MB)
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* Download Button */}
      {htmlUrl && (
        <a
          href={htmlUrl}
          download={fileName.replace(/\.[^/.]+$/, ".html")}
          className="mt-6 bg-[#9B4DF4] text-white px-6 py-3 rounded-xl hover:bg-[#7a35c9] transition-colors font-semibold"
        >
          Download HTML
        </a>
      )}

      {/* Short Description */}
      <p className="text-black mt-5">
        Extract text from PDF and save it as a simple HTML file.
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-7xl w-full p-6">
        <h2 className="text-xl font-semibold text-black mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-black space-y-1">
          <li>Upload a PDF file.</li>
          <li>The app extracts all text from each page.</li>
          <li>Download the generated HTML file.</li>
        </ul>
      </div>
    </div>
  );
}
