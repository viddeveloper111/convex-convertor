"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
import PptxGenJS from "pptxgenjs";

export default function PdfToPptConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setFileName(file.name);

    try {
      // Use the legacy build of pdf.js for client-side only
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const pptx = new PptxGenJS();

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        const strings = textContent.items.map((item: any) => item.str);
        const pageText = strings.join(" ");

        const slide = pptx.addSlide();
        slide.addText(pageText || "(Page empty)", {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 5,
          fontSize: 18,
          color: "363636",
          wrap: true,
        });
      }

      const outputName = file.name.replace(/\.[^/.]+$/, "") + ".pptx";
      await pptx.writeFile({ fileName: outputName });
    } catch (error) {
      console.error("Error processing PDF:", error);
      alert("Failed to convert PDF. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl  bg-gray-200 text-black hover:bg-gray-500  transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] flex items-center gap-2">
        <Presentation className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        PDF → PowerPoint Converter
      </h1>
      <p className="text-gray-400">Creates one text-only slide for each PDF page.</p>

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
    </div>
  );
}
