"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import toast, { Toaster } from "react-hot-toast";

export default function FileCompressor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [targetSize, setTargetSize] = useState<number | null>(null);
  const [unit, setUnit] = useState<"KB" | "MB">("KB");
  const [loading, setLoading] = useState<boolean>(false);

  // --- Handle File Change ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedFile(null);
    setCompressedSize(null);

    toast.success(`✅ ${file.name} selected`);
  };

  // --- Handle Unit Change ---
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

  // --- Compression Methods ---
  const compressWord = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      return await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 9 },
      });
    } catch {
      throw new Error("Invalid or corrupted Word file.");
    }
  };

  const compressPDF = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });
      return new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
    } catch {
      throw new Error("Invalid or corrupted PDF file.");
    }
  };

  // --- Main Compression ---
  const compressFile = async () => {
    if (!originalFile) return;

    const latestTargetSize = targetSize;
    const latestUnit = unit;
    const latestOriginalSize = originalFile.size;

    if (!latestTargetSize || latestTargetSize <= 0) {
      toast.error("⚠️ Please enter a valid target size.");
      return;
    }

    const targetBytes =
      latestTargetSize * (latestUnit === "KB" ? 1024 : 1024 * 1024);

    if (targetBytes >= latestOriginalSize) {
      toast.error("⚠️ Target size must be smaller than the original file size.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Compressing file...");

    try {
      let compressedBlob: Blob;

      if (originalFile.name.toLowerCase().endsWith(".pdf")) {
        compressedBlob = await compressPDF(originalFile);
      } else if (originalFile.name.toLowerCase().endsWith(".docx")) {
        compressedBlob = await compressWord(originalFile);
      } else {
        toast.error("⚠️ Only PDF and DOCX files are supported.");
        return;
      }

      setCompressedFile(compressedBlob);
      setCompressedSize(compressedBlob.size);

      toast.success("🎉 Compression complete!", { id: toastId });

      if (compressedBlob.size > targetBytes) {
        toast(`⚠️ File is still larger than target (${formatSize(targetBytes)}).`, {
          icon: "📏",
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "⚠️ Compression failed.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // --- Utilities ---
  const downloadFile = () => {
    if (!compressedFile || !originalFile) return;
    const link = document.createElement("a");
    const ext = originalFile.name.split(".").pop();
    link.href = URL.createObjectURL(compressedFile);
    link.download = originalFile.name.replace(/\.(docx|pdf)$/i, `-compressed.${ext}`);
    link.click();
    toast.success("✅ File downloaded!");
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

  useEffect(() => {
    document.title = "File Compressor";
  }, []);

  // --- UI ---
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-100 to-gray-200 p-6">
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
          File Compressor
        </h1>

        {/* Upload input */}
        <input
          type="file"
          accept=".docx,.pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full
                     file:border-0 file:font-semibold file:bg-purple-600 file:text-white
                     hover:file:bg-purple-800 mb-6 transition"
        />

        {/* File Info */}
        {originalFile && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Original File:</p>
            <p className="text-gray-500 text-sm">
              {originalFile.name} — {formatSize(originalSize!)}
            </p>
          </div>
        )}

        {/* Target Size Input */}
        {originalFile && (
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              min={1}
              value={targetSize ?? ""}
              onChange={(e) =>
                setTargetSize(e.target.value ? parseFloat(e.target.value) : null)
              }
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

        {/* Compress Button */}
        {originalFile && (
          <button
            onClick={compressFile}
            disabled={loading || !targetSize}
            className={`w-full ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-800"
            } text-white px-4 py-2 rounded-lg font-medium shadow transition transform hover:-translate-y-0.5 hover:scale-105 mb-6`}
          >
            {loading ? "Compressing..." : "Compress File"}
          </button>
        )}

        {/* Compressed Result */}
        {compressedFile && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Compressed File:</p>
            <p className="text-gray-500 text-sm">
              Size: {formatSize(compressedSize!)} (Reduced {getReductionPercent()}%)
            </p>
            <button
              onClick={downloadFile}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow transition transform hover:-translate-y-0.5 hover:scale-105 mt-2"
            >
              Download Compressed File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
