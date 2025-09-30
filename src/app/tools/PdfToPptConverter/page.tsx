"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Presentation, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PptxGenJS from "pptxgenjs";

export default function PdfToPptConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "PDF → PowerPoint Converter";
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be 10 MB or less");
      return;
    }

    setFileName(file.name);
    setLoading(true);

    try {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-8xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-2">
          <Presentation className="w-12 h-12 p-2 bg-purple-600 text-white rounded-3xl shadow-md" />
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600">
            PDF → PowerPoint Converter
          </h1>
        </div>
        <p className="text-gray-500">
          Creates a text-only slide for each PDF page.
        </p>
      </div>

      {/* Upload Card */}
      <div
        className={`mt-8 w-full max-w-7xl border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition ${
          loading
            ? "border-violet-300 bg-violet-50"
            : "border-gray-300 hover:border-purple-500 hover:bg-violet-50"
        }`}
        onClick={() => !loading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />
        {loading ? (
          <div className="flex items-center gap-3 text-violet-600">
            <Loader2 className="animate-spin w-6 h-6" />
            <span className="font-medium">Converting… please wait</span>
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-2 font-medium">
              Drag & drop your PDF here, or click to browse
            </p>
            <p className="text-gray-400 text-sm">(Max size 10 MB)</p>
            <p className="mt-3 text-gray-600">
              {fileName || "No file chosen"}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
