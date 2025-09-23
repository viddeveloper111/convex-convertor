"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FileSpreadsheet,ArrowLeft  } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExcelToPdfConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");  const router = useRouter();


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    ) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      // Take the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const sheetData: (string | number)[][] = XLSX.utils.sheet_to_json(
        worksheet,
        { header: 1 }
      );

      if (sheetData.length === 0) {
        alert("Excel file is empty.");
        return;
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      pdf.setFont("Times", "normal");
      pdf.setFontSize(12);

      autoTable(pdf, {
        head: [sheetData[0] as string[]],
        body: sheetData.slice(1) as (string | number)[][],
        startY: 40,
        styles: { fontSize: 10, cellPadding: 4 },
        headStyles: { fillColor: [155, 77, 244] },
      });

      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } else {
      alert("Please upload an Excel file (.xlsx or .xls)");
    }
  };

  return (
    <div className="min-h-screen bg-[#181023] p-6 flex flex-col items-center">
         {/* Back Button */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-2">
        <FileSpreadsheet className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        Excel → PDF Converter
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
          accept=".xlsx,.xls"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag and drop your Excel file here, or click to select (Max size 10MB)
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* PDF Preview */}
      {pdfUrl && (
        <div className="mt-6 w-full max-w-4xl h-[600px] border rounded-xl overflow-hidden shadow-md">
          <iframe src={pdfUrl} width="100%" height="100%" />
        </div>
      )}

      {/* Download Button */}
      {pdfUrl && (
        <a
          href={pdfUrl}
          download={fileName.replace(/\.[^/.]+$/, ".pdf")}
          className="mt-4 bg-[#9B4DF4] text-white px-6 py-3 rounded-xl hover:bg-[#7a35c9] transition-colors font-semibold"
        >
          Download PDF
        </a>
      )}

      {/* Short Description */}
      <p className="text-gray-400 mt-5">
        Convert your Excel sheets into PDF instantly. Tables are preserved inside a clean PDF format.
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-3xl w-full p-6">
        <h2 className="text-xl font-semibold text-white mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Upload your Excel file (.xlsx or .xls).</li>
          <li>Preview the converted PDF instantly in the browser.</li>
          <li>Download the PDF if satisfied.</li>
        </ul>
      </div>
    </div>
  );
}
