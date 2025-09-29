"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

export default function PdfToExcelConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);
  const [fileName, setFileName] = useState("");
  const [excelUrl, setExcelUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Only import pdfjs-dist in browser
    import("pdfjs-dist").then((mod) => {
      mod.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${mod.version}/pdf.worker.min.js`;
      setPdfjsLib(mod);
    });
     document.title = "Pdf to Excel Converter";
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!pdfjsLib) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const allText: string[][] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        // Extract text items and join as a single string
        const pageText = content.items.map((item: any) => item.str).join(" ");
        allText.push([`Page ${i}`, pageText]);
      }

      // Create Excel workbook
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(allText);
      XLSX.utils.book_append_sheet(wb, ws, "PDF Text");

      // Generate Excel file URL
      const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      setExcelUrl(url);
    };

    reader.readAsArrayBuffer(file);
  };

  if (!pdfjsLib) return <p>Loading PDF.js...</p>;

    //    useEffect(() => {
    //   document.title = "Pdf to Excel Converter";
    // }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl  bg-gray-200 text-black hover:bg-gray-500  transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-2">
        <FileSpreadsheet className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PDF → Excel Converter
      </h1>
      <p className="text-gray-400">Free, Open Source & Ad-free</p>

      {/* File Upload */}
      <div
        className="mt-6 w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4] transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag and drop your PDF file here, or click to select (Max size 10 MB)
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* Download Button */}
      {excelUrl && (
        <a
          href={excelUrl}
          download={fileName.replace(/\.[^/.]+$/, ".xlsx")}
          className="mt-6 bg-[#9B4DF4] text-white px-6 py-3 rounded-xl hover:bg-[#7a35c9] transition-colors font-semibold"
        >
          Download Excel
        </a>
      )}

      {/* Short Description */}
      <p className="text-black mt-5">
        Extract all text from a PDF and export each page’s content into an Excel sheet.
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-3xl w-full p-6">
        <h2 className="text-xl font-semibold text-black mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-black space-y-1">
          <li>Upload a PDF file.</li>
          <li>The app extracts text from every page.</li>
          <li>Download the generated Excel file.</li>
        </ul>
      </div>
    </div>
  );
}
