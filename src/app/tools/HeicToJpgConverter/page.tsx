"use client";

import { useRef, useState ,useEffect} from "react";
import { Image, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeicToJpgConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
       useEffect(() => {
      document.title = "Heic to Jpg Converter";
    }, []);

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-bold text-[#9B4DF4] flex items-center gap-2 mb-4">
        <Image className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
        HEIC → JPG Converter
      </h1>
      <p className="text-gray-500 text-lg text-center max-w-2xl mb-6">
        Convert HEIC images to JPG quickly, free, and without ads.
      </p>

      {/* Upload Panel */}
      <div
        className="w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center cursor-pointer hover:border-[#9B4DF4] transition-colors mb-6 shadow-md"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".heic,image/heic"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-600 mb-2 text-center">
          Drag and drop your HEIC file here, or click to select
        </p>
        <p className="text-gray-400">{fileName || "No file chosen"}</p>
      </div>

      {/* Preview Panel */}
      {preview && (
        <div className="w-full max-w-4xl flex justify-center mb-6">
          <img
            src={preview}
            alt="HEIC Preview"
            className="max-h-96 rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Convert Button */}
      <button
        onClick={convertToJpg}
        className="bg-[#9B4DF4] px-6 py-3 rounded-xl font-semibold hover:bg-[#7a35c9] transition-colors disabled:opacity-50 mb-4"
        disabled={!preview || loading}
      >
        {loading ? "Converting..." : "Convert to JPG"}
      </button>

      {/* Download Button */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={fileName.replace(/\.[^/.]+$/, ".jpg")}
          className="bg-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Download JPG
        </a>
      )}

      {/* How to Use */}
      <section className="max-w-3xl w-full p-6 mt-6 bg-gray-100 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-black mb-4">How to Use</h2>
        <ul className="list-disc list-inside text-black space-y-2">
          <li>Upload your HEIC image file.</li>
          <li>Preview the image instantly in the browser.</li>
          <li>Click “Convert to JPG” to convert.</li>
          <li>Download the JPG when ready.</li>
        </ul>
      </section>
    </div>
  );
}
