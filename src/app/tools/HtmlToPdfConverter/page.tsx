"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Code2 } from "lucide-react";

export default function HtmlToPdfConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const htmlContent = event.target?.result as string;

        const pdf = new jsPDF("p", "pt", "a4");

        // Render HTML into the PDF
        await pdf.html(htmlContent, {
          callback: (doc) => {
            const pdfBlob = doc.output("blob");
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
          },
          margin: [20, 20, 20, 20],
          autoPaging: "text",
          x: 10,
          y: 10,
          width: 550,
          windowWidth: 800,
        });
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid HTML file");
    }
  };

  return (
    <div className="min-h-screen bg-[#181023] p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-2">
        <Code2 className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        HTML → PDF Converter
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
          accept=".html,.htm"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag and drop your HTML file here, or click to select (Max size 10MB)
        </p>
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
      <p className="text-gray-400 mt-5">
        Convert your HTML files to PDF instantly. Maintain structure and text formatting inside a PDF.
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-3xl w-full p-6">
        <h2 className="text-xl font-semibold text-white mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Upload your HTML file by clicking the upload area above.</li>
          <li>Preview the converted PDF instantly in the browser.</li>
          <li>Download the PDF if satisfied.</li>
        </ul>
      </div>
    </div>
  );
}
