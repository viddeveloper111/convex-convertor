"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import JSZip from "jszip";

export default function WordCompressor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [targetSize, setTargetSize] = useState<number | null>(null);
  const [unit, setUnit] = useState<"KB" | "MB">("KB");
  const [loading, setLoading] = useState<boolean>(false);

  // 📂 Handle upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedFile(null);
    setCompressedSize(null);
  };

  // 🧮 Handle unit change
  const handleUnitChange = (newUnit: "KB" | "MB") => {
    if (targetSize !== null) {
      if (unit === "KB" && newUnit === "MB") setTargetSize(targetSize / 1024);
      else if (unit === "MB" && newUnit === "KB") setTargetSize(targetSize * 1024);
    }
    setUnit(newUnit);
  };

  // 🎯 Compress DOCX to target size
  const compressFile = async () => {
    if (!originalFile || !targetSize || !originalSize) return;

    const targetBytes = targetSize * (unit === "KB" ? 1024 : 1024 * 1024);
    if (targetBytes >= originalSize) {
      alert("⚠️ Target size must be smaller than the original file.");
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await originalFile.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      let level = 9; // start with maximum compression
      let low = 1;
      let high = 9;
      let iteration = 0;
      let finalBlob: Blob | null = null;

      while (low <= high && iteration < 10) {
        iteration++;
        level = Math.round((low + high) / 2);

        const compressedBlob = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level },
        });

        if (compressedBlob.size > targetBytes) {
          // Too large → increase compression
          low = level + 1;
        } else if (compressedBlob.size < targetBytes * 0.95) {
          // Too small → reduce compression slightly
          high = level - 1;
        } else {
          finalBlob = compressedBlob;
          break;
        }

        finalBlob = compressedBlob;
      }

      if (!finalBlob) throw new Error("Compression failed");

      setCompressedFile(finalBlob);
      setCompressedSize(finalBlob.size);
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong during compression.");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Download
  const downloadFile = () => {
    if (!compressedFile || !originalFile) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedFile);
    link.download = originalFile.name.replace(/\.docx$/i, "-compressed.docx");
    link.click();
  };

  // 📏 Format size
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
    document.title = "Word Compressor";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      {/* 🔙 Back button */}
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
          Word File Compressor
        </h1>

        {/* Upload */}
        <input
          type="file"
          accept=".docx"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-purple-600 file:text-white
                     hover:file:bg-purple-800 mb-6 transition"
        />

        {/* Original info */}
        {originalFile && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Original File:</p>
            <p className="text-gray-500 text-sm">
              {originalFile.name} — {formatSize(originalSize!)}
            </p>
          </div>
        )}

        {/* Target input */}
        {originalFile && (
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              min={1}
              value={targetSize ?? ""}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setTargetSize(isNaN(val) ? null : val);
              }}
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

        {/* Compress */}
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
            {loading ? "Compressing..." : "Compress Word File"}
          </button>
        )}

        {/* Result */}
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
