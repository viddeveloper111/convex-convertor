"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { Presentation,ArrowLeft  } from "lucide-react";
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

      // unzip pptx file
      const zip = await JSZip.loadAsync(arrayBuffer);

      // slides are inside ppt/slides/slideN.xml
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

        // extract text inside <a:t> tags
        const matches = [...xmlText.matchAll(/<a:t>(.*?)<\/a:t>/g)];
        const textContent = matches.map((m) => m[1]).join("\n");

        if (!firstPage) {
          pdf.addPage();
        }
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
        <Presentation className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PowerPoint → PDF Converter
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
          accept=".pptx"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag and drop your PPTX file here, or click to select (Max size 10MB)
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
        Convert your PowerPoint (PPTX) slides into PDF instantly. Each slide is
        exported as a separate PDF page (text only).
      </p>

      {/* How to Use */}
      <div className="mt-6 max-w-3xl w-full p-6">
        <h2 className="text-xl font-semibold text-white mb-2">How to Use</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Upload your PowerPoint file (.pptx).</li>
          <li>Preview the converted PDF instantly in the browser.</li>
          <li>Each slide’s text becomes one page in the PDF.</li>
          <li>Download the PDF when ready.</li>
        </ul>
      </div>
    </div>
  );
}
