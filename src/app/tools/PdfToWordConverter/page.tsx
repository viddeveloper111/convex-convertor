"use client";

import { useRef, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function PdfToWordConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [docxUrl, setDocxUrl] = useState("");
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setFileName(file.name);
    const arrayBuffer = await file.arrayBuffer();

    // ✅ Dynamically import pdfjs only on client
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(" ") + "\n\n";
    }

    const doc = new Document({
      sections: [
        {
          children: [new Paragraph({ children: [new TextRun(fullText)] })],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    setDocxUrl(url);
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

      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] flex items-center gap-2">
        <FileText className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PDF → Word Converter
      </h1>
      <p className="text-gray-400">Free, Open Source & Ad-free</p>

      {/* Upload Area */}
      <div
        className="mt-6 w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4]"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag & drop your PDF here, or click to select (Max size 10 MB)
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* Download Button */}
      {docxUrl && (
        <a
          href={docxUrl}
          download={fileName.replace(/\.[^/.]+$/, ".docx")}
          className="mt-6 bg-[#9B4DF4] text-white px-6 py-3 rounded-xl hover:bg-[#7a35c9] font-semibold"
        >
          Download Word File
        </a>
      )}
    </div>
  );
}
