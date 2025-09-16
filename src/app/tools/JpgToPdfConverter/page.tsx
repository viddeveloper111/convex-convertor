"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Image as ImageIcon } from "lucide-react";

export default function JpgToPdfConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target?.result as string;

        const pdf = new jsPDF();
        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;

          pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

          const pdfBlob = pdf.output("blob");
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPG or PNG file");
    }
  };

  return (
    <div className="min-h-screen bg-[#181023] p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-2">
        <ImageIcon className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        JPG → PDF Converter
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
          accept=".jpg,.jpeg,.png"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag and drop your JPG/PNG file here, or click to select (Max size 10MB)
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
        Convert JPG/PNG images to PDF instantly. Free, open source, ad-free tool.
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-3xl w-full p-6">
        <h2 className="text-xl font-semibold text-white mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Upload your JPG or PNG file by clicking the upload area below.</li>
          <li>Preview the converted PDF directly on the page.</li>
          <li>Download the PDF if satisfied.</li>
        </ul>
      </div>
    </div>
  );
}
