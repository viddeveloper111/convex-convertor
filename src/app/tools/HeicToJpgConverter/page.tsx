"use client";

import { useRef, useState } from "react";
import { Image } from "lucide-react";

export default function HeicToJpgConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      file.type !== "image/heic" &&
      file.name.split(".").pop()?.toLowerCase() !== "heic"
    ) {
      alert("Please upload a HEIC file.");
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    setDownloadUrl("");
  };

  const convertToJpg = async () => {
    if (!fileName) return;
    setLoading(true);

    try {
      const fileBlob = await fetch(preview).then((res) => res.blob());

      // 👇 Import only on client
      const heic2any = (await import("heic2any")).default;

      const result = await heic2any({
        blob: fileBlob,
        toType: "image/jpeg",
        quality: 0.9,
      });

      const jpgBlob = result as Blob;
      const url = URL.createObjectURL(jpgBlob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      alert("Failed to convert HEIC to JPG.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#181023] p-6 flex flex-col items-center text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] flex items-center gap-2">
        <Image className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        HEIC → JPG Converter
      </h1>

      <div
        className="mt-6 w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:border-[#9B4DF4]"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".heic,image/heic"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-600 mb-2">
          Drag and drop your HEIC file here, or click to select
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {preview && (
        <div className="mt-6 w-full max-w-4xl flex justify-center">
          <img
            src={preview}
            alt="HEIC Preview"
            className="max-h-96 rounded-md shadow-lg"
          />
        </div>
      )}

      <button
        onClick={convertToJpg}
        className="mt-6 bg-[#9B4DF4] px-6 py-3 rounded-xl font-semibold hover:bg-[#7a35c9] transition-colors disabled:opacity-50"
        disabled={!preview || loading}
      >
        {loading ? "Converting..." : "Convert to JPG"}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download={fileName.replace(/\.[^/.]+$/, ".jpg")}
          className="mt-4 bg-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Download JPG
        </a>
      )}
    </div>
  );
}
