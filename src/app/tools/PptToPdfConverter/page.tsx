"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { Presentation, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PptToPdfConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      const arrayBuffer = await file.arrayBuffer();

      const zip = await JSZip.loadAsync(arrayBuffer);
      const slideFiles = Object.keys(zip.files).filter((path) =>
        path.match(/^ppt\/slides\/slide\d+\.xml$/)
      );

      if (slideFiles.length === 0) {
        alert("No slides found in this PowerPoint file.");
        return;
      }

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      let firstPage = true;

      for (const slidePath of slideFiles) {
        const xmlText = await zip.file(slidePath)!.async("string");
        const matches = [...xmlText.matchAll(/<a:t>(.*?)<\/a:t>/g)];
        const textContent = matches.map((m) => m[1]).join("\n");

        if (!firstPage) pdf.addPage();
        firstPage = false;

        pdf.setFont("Times", "normal");
        pdf.setFontSize(16);

        const lines = pdf.splitTextToSize(textContent, 750);
        let y = 60;
        lines.forEach((line: string) => {
          if (y > 550) {
            pdf.addPage();
            y = 60;
          }
          pdf.text(line, 40, y);
          y += 22;
        });
      }

      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    } else {
      alert("Please upload a PPTX (PowerPoint) file.");
    }
  };

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

      {/* Header */}
      <h1 className="text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-2 mb-2">
        <Presentation className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PowerPoint → PDF Converter
      </h1>
      <p className="text-gray-400 text-lg text-center mb-6">
        Free, Open Source & Ad-free
      </p>

      {/* File Upload */}
      <div
        className="w-full max-w-5xl border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4] transition-colors mb-6"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pptx"
          className="hidden"
        />
        <p className="text-gray-600 mb-2 text-center">
          Drag and drop your PPTX file here, or click to select (Max size 10MB)
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* PDF Preview */}
      {pdfUrl && (
        <div className="w-full max-w-5xl h-[600px] border rounded-2xl overflow-hidden shadow-md mb-4">
          <iframe src={pdfUrl} width="100%" height="100%" />
        </div>
      )}

      {/* Download Button */}
      {pdfUrl && (
        <a
          href={pdfUrl}
          download={fileName.replace(/\.[^/.]+$/, ".pdf")}
          className="bg-[#9B4DF4] text-white px-6 py-3 rounded-xl hover:bg-[#7a35c9] transition-colors font-semibold mb-6"
        >
          Download PDF
        </a>
      )}

      {/* Description */}
      <p className="text-gray-500 max-w-5xl text-center mb-6">
        Convert your PowerPoint (PPTX) slides into PDF instantly. Each slide is exported as a separate PDF page (text only).
      </p>

      {/* How to Use */}
      <section className="max-w-5xl w-full p-6 mb-6 bg-gray-100 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-black mb-4">How to Use</h2>
        <ul className="list-disc list-inside text-black space-y-2">
          <li>Upload your PowerPoint file (.pptx).</li>
          <li>Preview the converted PDF instantly in the browser.</li>
          <li>Each slide’s text becomes one page in the PDF.</li>
          <li>Download the PDF when ready.</li>
        </ul>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl w-full p-6 bg-gray-100 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-black mb-4">Benefits</h2>
        <ul className="list-disc list-inside text-black space-y-2">
          <li>Quick conversion without installing software.</li>
          <li>Preview your PDF instantly.</li>
          <li>Preserve slide text formatting.</li>
          <li>Free and ad-free experience.</li>
        </ul>
      </section>
    </div>
  );
}
