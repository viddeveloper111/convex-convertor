"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ImageCompressor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [targetSize, setTargetSize] = useState<number | null>(null);
  const [unit, setUnit] = useState<"KB" | "MB">("KB");
  const [loading, setLoading] = useState<boolean>(false);

  // 📂 Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setOriginalSize(file.size);
      setCompressedImage(null);
      setCompressedSize(null);
      toast.success("✅ Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  // 🧮 Convert units when switching KB ↔ MB
  const handleUnitChange = (newUnit: "KB" | "MB") => {
    if (targetSize === null) {
      setUnit(newUnit);
      return;
    }

    if (unit === "KB" && newUnit === "MB") {
      setTargetSize(targetSize / 1024);
    } else if (unit === "MB" && newUnit === "KB") {
      setTargetSize(targetSize * 1024);
    }

    setUnit(newUnit);
  };

  // 🧠 Compress image to target size
  const compressImage = async () => {
    if (!originalImage || !targetSize || !originalSize) {
      toast.error("⚠️ Please upload an image and enter target size.");
      return;
    }

    const targetBytes = targetSize * (unit === "KB" ? 1024 : 1024 * 1024);
    if (targetBytes >= originalSize) {
      toast.error("⚠️ Target size must be smaller than the original image.");
      return;
    }

    setLoading(true);
    toast.loading("Compressing image...");

    try {
      const img = new Image();
      img.src = originalImage;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let quality = 0.9;
      let compressedBlob: Blob | null = null;
      let lastBlob: Blob | null = null;
      let iteration = 0;

      let low = 0.05;
      let high = 0.95;

      while (low <= high && iteration < 20) {
        iteration++;
        quality = (low + high) / 2;

        compressedBlob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
        });

        if (!compressedBlob) break;
        lastBlob = compressedBlob;

        if (compressedBlob.size > targetBytes) {
          high = quality - 0.02;
        } else if (compressedBlob.size < targetBytes * 0.98) {
          low = quality + 0.02;
        } else {
          break;
        }
      }

      if (!lastBlob) throw new Error("Compression failed");
      if (lastBlob.size >= originalSize) {
        setCompressedImage(null);
        setCompressedSize(null);
        toast.error("❌ Could not reduce image size further.");
      } else {
        setCompressedImage(URL.createObjectURL(lastBlob));
        setCompressedSize(lastBlob.size);
        toast.success("🎉 Image compressed successfully!");
      }
    } catch (err) {
      console.error("Compression error:", err);
      toast.error("⚠️ Something went wrong during compression.");
    } finally {
      setLoading(false);
      toast.dismiss(); // remove "Compressing..." toast
    }
  };

  // 💾 Download compressed image
  const downloadImage = () => {
    if (!compressedImage) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = "compressed-image.jpg";
    link.click();
    toast.success("📥 Image downloaded successfully!");
  };

  // 📏 Helpers
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
    document.title = "Image Compressor";
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

      {/* 📦 Main card */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-6">
          Image Compressor
        </h1>

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600
           file:mr-4 file:py-2 file:px-4
           file:rounded-full file:border-0
           file:text-sm file:font-semibold
           file:bg-purple-600 file:text-white
           hover:file:bg-purple-800 mb-6 transition"
        />

        {/* Original preview */}
        {originalImage && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Original Image:</p>
            <img
              src={originalImage}
              alt="Original"
              className="max-w-full rounded-lg shadow-md mb-2"
            />
            {originalSize && (
              <p className="text-gray-500 text-sm">
                Size: {formatSize(originalSize)}
              </p>
            )}
          </div>
        )}

        {/* Compression controls */}
        {originalImage && (
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

        {/* Compress button */}
        {originalImage && (
          <button
            onClick={compressImage}
            disabled={loading || !targetSize}
            className={`w-full ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-800"
            } text-white px-4 py-2 rounded-lg font-medium shadow transition transform hover:-translate-y-0.5 hover:scale-105 mb-6`}
          >
            {loading ? "Compressing..." : "Compress Image"}
          </button>
        )}

        {/* Compressed preview */}
        {compressedImage && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Compressed Image:</p>
            <img
              src={compressedImage}
              alt="Compressed"
              className="max-w-full rounded-lg shadow-md mb-2"
            />
            {compressedSize && (
              <p className="text-gray-500 text-sm">
                Size: {formatSize(compressedSize)} (Reduced{" "}
                {getReductionPercent()}%)
              </p>
            )}
            <button
              onClick={downloadImage}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow transition transform hover:-translate-y-0.5 hover:scale-105 mt-2"
            >
              Download Compressed Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
