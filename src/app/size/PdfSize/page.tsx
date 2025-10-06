"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function PdfCompressor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [compressedURL, setCompressedURL] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState<number | null>(null);
  const [unit, setUnit] = useState<"KB" | "MB">("KB");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedBlob(null);
    setCompressedSize(null);
    setCompressedURL(null);
  };

  const handleUnitChange = (newUnit: "KB" | "MB") => {
    if (targetSize === null) {
      setUnit(newUnit);
      return;
    }
    if (unit === "KB" && newUnit === "MB") setTargetSize(targetSize / 1024);
    else if (unit === "MB" && newUnit === "KB") setTargetSize(targetSize * 1024);
    setUnit(newUnit);
  };

  const compressPdf = async () => {
    if (!originalFile || !targetSize || !originalSize) return;

    const targetBytes = targetSize * (unit === "KB" ? 1024 : 1024 * 1024);
    if (targetBytes >= originalSize) {
      alert("⚠️ Target size must be smaller than the original PDF.");
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await originalFile.arrayBuffer();
      let pdfDoc = await PDFDocument.load(arrayBuffer);

      // Initial compression attempt
      let compressedBytes = await pdfDoc.save({ useObjectStreams: true });
      let currentSize = compressedBytes.length;

      let minQuality = 0.1;
      let maxQuality = 1.0;
      let bestMatch = compressedBytes;

      let attempts = 0;
      const maxAttempts = 10;
      const tolerance = targetBytes * 0.05; // ±5% of target

      while (attempts < maxAttempts) {
        attempts++;

        const midQuality = (minQuality + maxQuality) / 2;

        // Reload the PDF from current bytes
        pdfDoc = await PDFDocument.load(arrayBuffer);

        // Save with object streams enabled (lightweight compression)
        const tempBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
        });

        const tempSize = tempBytes.length;

        if (Math.abs(tempSize - targetBytes) <= tolerance) {
          bestMatch = tempBytes;
          break;
        }

        if (tempSize > targetBytes) {
          maxQuality = midQuality;
        } else {
          minQuality = midQuality;
          bestMatch = tempBytes;
        }
      }

      const blob = new Blob([new Uint8Array(bestMatch)], {
        type: "application/pdf",
      });

      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      setCompressedURL(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong during PDF compression.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!compressedBlob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = "compressed.pdf";
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  const getReductionPercent = () => {
    if (!originalSize || !compressedSize) return "0";
    return ((1 - compressedSize / originalSize) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-400 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-6">
          PDF Compressor
        </h1>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-800 mb-6 transition"
        />

        {originalFile && originalSize && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Original PDF:</p>
            <p className="text-gray-500 text-sm">Size: {formatSize(originalSize)}</p>
          </div>
        )}

        {originalFile && (
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              min={1}
              value={targetSize ?? ""}
              onChange={(e) => setTargetSize(parseFloat(e.target.value))}
              placeholder="Enter target size"
              className="flex-1 px-4 py-2 border rounded-lg text-gray-700"
            />
            <select
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value as "KB" | "MB")}
              className="px-4 py-2 border rounded-lg text-gray-700"
            >
              <option value="KB">KB</option>
              <option value="MB">MB</option>
            </select>
          </div>
        )}

        {originalFile && (
          <button
            onClick={compressPdf}
            disabled={loading || !targetSize}
            className={`w-full ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-800"
            } text-white px-4 py-2 rounded-lg font-medium shadow transition transform hover:-translate-y-0.5 hover:scale-105 mb-6`}
          >
            {loading ? "Compressing..." : "Compress PDF"}
          </button>
        )}

        {compressedURL && compressedSize && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Compressed PDF:</p>
            <p className="text-gray-500 text-sm">
              Size: {formatSize(compressedSize)} (Reduced {getReductionPercent()}%)
            </p>
            <iframe src={compressedURL} className="w-full h-[500px] border rounded-lg mt-2" />
            <button
              onClick={downloadPdf}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow transition transform hover:-translate-y-0.5 hover:scale-105 mt-2"
            >
              Download Compressed PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
