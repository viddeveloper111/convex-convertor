"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast, { Toaster } from "react-hot-toast";

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

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("⚠️ Please upload a valid PDF file.");
      return;
    }

    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedBlob(null);
    setCompressedSize(null);
    setCompressedURL(null);

    toast.success(`✅ ${file.name} uploaded`);
  };

  // Unit Toggle (KB/MB)
  const handleUnitChange = (newUnit: "KB" | "MB") => {
    if (targetSize !== null) {
      const newSize =
        unit === "KB" && newUnit === "MB"
          ? targetSize / 1024
          : unit === "MB" && newUnit === "KB"
          ? targetSize * 1024
          : targetSize;
      setTargetSize(Number(newSize.toFixed(2)));
    }
    setUnit(newUnit);
  };

  // Compress PDF safely
  const compressPdf = async () => {
    if (!originalFile || !targetSize || !originalSize) {
      toast.error("⚠️ Please upload a file and enter a target size.");
      return;
    }

    const targetBytes = targetSize * (unit === "KB" ? 1024 : 1024 * 1024);
    if (targetBytes >= originalSize) {
      toast.error("⚠️ Target size must be smaller than the original file.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Compressing PDF...");

    try {
      const arrayBuffer = await originalFile.arrayBuffer();

      // Validate PDF header
      const header = new Uint8Array(arrayBuffer.slice(0, 5));
      if (new TextDecoder().decode(header) !== "%PDF-") {
        toast.error("⚠️ Not a valid PDF", { id: toastId });
        setLoading(false);
        return;
      }

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      } catch (err) {
        console.error("Failed to parse PDF:", err);
        toast.error(
          "⚠️ This PDF cannot be compressed. It may be corrupted or use advanced features.",
          { id: toastId }
        );
        setLoading(false);
        return;
      }

// Compress PDF
const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

// Ensure proper ArrayBuffer
const blob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });

setCompressedBlob(blob);
setCompressedSize(blob.size);
setCompressedURL(URL.createObjectURL(blob));

toast.success("🎉 PDF successfully compressed!", { id: toastId });

if (blob.size > targetBytes) {
  toast("📏 Compressed file is slightly larger than target size.", { icon: "⚠️" });
}


    } catch (err: any) {
      console.error("Compression failed:", err);
      toast.error(`⚠️ Compression failed: ${err.message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Download Compressed PDF
  const downloadPdf = () => {
    if (!compressedBlob) {
      toast.error("⚠️ No compressed file available to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = "compressed.pdf";
    link.click();
    toast.success("✅ PDF downloaded successfully!");
  };

  // Helpers
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
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-400 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6">
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
              onChange={(e) => setTargetSize(Number(e.target.value) || null)}
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
              loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-800"
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
            <iframe
              src={compressedURL}
              className="w-full h-[500px] border rounded-lg mt-2"
            />
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
