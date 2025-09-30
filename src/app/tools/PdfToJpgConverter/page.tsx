"use client";

import { useRef, useState, useEffect } from "react";
import { getDocument } from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { FileImage, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// ✅ Set PDF.js worker
// GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfToJpgConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validate
  if (file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert("File size must be less than 10MB.");
    return;
  }

  setFileName(file.name);
  setImages([]);

  try {
    const pdfjs = await import("pdfjs-dist"); // dynamic import
    // Optional: set worker
    // pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

    const tempImages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvas, canvasContext: context, viewport }).promise;

      tempImages.push(canvas.toDataURL("image/jpeg", 1.0));
    }

    setImages(tempImages);
  } catch (error) {
    console.error("PDF to JPG conversion error:", error);
    alert("Failed to convert PDF to JPG. Please try another file.");
  }
};


  useEffect(() => {
    document.title = "PDF to JPG Converter";
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
        <FileImage className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PDF → JPG Converter
      </h1>
      <p className="text-gray-400 mb-6">Free, Open Source & Ad-free</p>

      {/* Upload Area */}
      <div
        className="w-full max-w-7xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9B4DF4] transition-colors mb-6"
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

      {/* JPG Preview & Download */}
      {images.length > 0 && (
        <div className="w-full max-w-7xl flex flex-col gap-6">
          {images.map((img, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={img} alt={`Page ${index + 1}`} className="border rounded-xl mb-2 shadow-md" />
              <a
                href={img}
                download={`${fileName.replace(/\.[^/.]+$/, "")}-page-${index + 1}.jpg`}
                className="bg-[#9B4DF4] text-white px-6 py-2 rounded-xl hover:bg-[#7a35c9] transition-colors font-semibold"
              >
                Download Page {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Short Description */}
      <p className="text-black mt-6 text-center max-w-7xl">
        Convert your PDF pages into high-quality JPG images. Download each page individually.
      </p>
    </div>
  );
}
