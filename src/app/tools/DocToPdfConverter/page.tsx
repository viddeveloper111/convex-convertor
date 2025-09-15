"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import * as mammoth from "mammoth";
import { FileText } from "lucide-react";

export default function DocToPdfConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      const pdf = new jsPDF();
      pdf.setFontSize(12);
      pdf.text(text, 10, 10);

      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } else {
      alert("Please upload a DOCX file");
    }
  };

  return (
    <div className="min-h-screen bg-[#181023] p-6 flex flex-col items-center">
      {/* Title */}
   <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-2">
  <FileText className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
  DOCX → PDF Converter
</h1>
      <p className="text-gray-400">
          Free, Open Source & Ad-free
        </p>
      {/* File Upload */}
      <div
        className="mt-6 w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4] transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".docx"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">Drag and drop your DOCX file here, or click to select (Max size 10MB)</p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* PDF Preview */}
      {pdfUrl && (
        <div className="mt-6 w-full max-w-3xl h-[600px] border rounded-xl overflow-hidden shadow-md">
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
      <p className="text-gray-400 mt-5  ">
        Fast, free, open source, ad-free tool. Convert DOCX files to PDF instantly and preview them.
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-3xl w-full  p-6">
        <h2 className="text-xl font-semibold text-white mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Upload your DOCX file by clicking the upload area below.</li>
          <li>Preview the PDF directly on the page.</li>
          <li>Download the PDF if satisfied.</li>
        </ul>
      </div>

      {/* Benefits */}
      <div className="mt-4 max-w-3xl w-full p-6 ">
        <h2 className="text-xl font-semibold text-white mb-2">Benefits</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Quick conversion without installing software.</li>
          <li>Preview your PDF instantly.</li>
          <li>Keep your formatting consistent.</li>
          <li>Free and ad-free experience.</li>
        </ul>
      </div>
    </div>
  );
}
