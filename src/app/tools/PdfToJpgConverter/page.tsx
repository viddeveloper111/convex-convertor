"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, FileImage } from "lucide-react";
import { useRouter } from "next/navigation";
import type * as PDFJS from "pdfjs-dist"; 

export default function PdfToJpgConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [jpgUrl, setJpgUrl] = useState("");
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);
  const router = useRouter();

 useEffect(() => {
  (async () => {
    if (typeof window !== "undefined") {
      const pdfjs: typeof PDFJS = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      setPdfjsLib(pdfjs);
    }
  })();
}, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!pdfjsLib) return;

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const page = await pdf.getPage(1); // convert first page only
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      setJpgUrl(canvas.toDataURL("image/jpeg", 1.0));
    };

    reader.readAsArrayBuffer(file);
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
        <FileImage className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PDF → JPG Converter
      </h1>
      <p className="text-gray-400">Free, Open Source & Ad-free</p>

      <div
        className="mt-6 w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4] transition-colors"
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
          Drag and drop your PDF here, or click to select (Max size ~10 MB)
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {jpgUrl && (
        <>
          <div className="mt-6 w-full max-w-3xl border rounded-xl overflow-hidden shadow-md bg-white flex justify-center">
            <img src={jpgUrl} alt="Converted JPG" className="max-w-full h-auto" />
          </div>
          <a
            href={jpgUrl}
            download={fileName.replace(/\.[^/.]+$/, ".jpg")}
            className="mt-4 bg-[#9B4DF4] text-white px-6 py-3 rounded-xl hover:bg-[#7a35c9] transition-colors font-semibold"
          >
            Download JPG
          </a>
        </>
      )}
    </div>
  );
}
