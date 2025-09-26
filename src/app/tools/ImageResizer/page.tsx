"use client";

import { useState, ChangeEvent } from "react";
import { Move, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImageResizerPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [preserveAspect, setPreserveAspect] = useState(true);
  const [format, setFormat] = useState("png");
  const [resizedUrl, setResizedUrl] = useState<string>("");
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setResizedUrl(URL.createObjectURL(file));
    }
  };

  const handleResize = () => {
    if (!imageFile) return alert("Please select an image!");

    const img = new Image();
    img.onload = () => {
      let w = width || img.width;
      let h = height || img.height;

      if (preserveAspect) {
        const ratio = img.width / img.height;
        if (width && !height) h = width / ratio;
        else if (!width && height) w = height * ratio;
        else if (width && height) h = width / ratio; // prioritize width
      }

      const canvas = document.createElement("canvas");
      canvas.width = w as number;
      canvas.height = h as number;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0, w as number, h as number);

      setResizedUrl(canvas.toDataURL(`image/${format}`));
    };

    img.src = URL.createObjectURL(imageFile);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-400 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
            <Move className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
            Image Resizer
          </h1>
          <p className="text-gray-500">Fast, free, open source, ad-free tool.</p>
        </header>

        {/* Upload & Resize Section */}
        <div className="bg-gray-100 shadow rounded-2xl p-6 w-full flex flex-col gap-6">
          {/* File Input */}
          <label className="w-full h-40 border-2 border-dashed border-gray-400 rounded-lg flex flex-col justify-center items-center text-gray-600 cursor-pointer hover:border-[#9B4DF4] transition">
            {imageFile ? imageFile.name : "Drag and drop your image here, or click to select"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <p className="text-sm mt-2">Max size 40 MB</p>
          </label>

          {/* Width / Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-black font-semibold">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="Enter width"
                className="w-full p-3 border rounded-lg bg-white text-black border-gray-300 focus:ring-2 focus:ring-[#9B4DF4]"
              />
            </div>
            <div>
              <label className="text-black font-semibold">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="Enter height"
                className="w-full p-3 border rounded-lg bg-white text-black border-gray-300 focus:ring-2 focus:ring-[#9B4DF4]"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={preserveAspect}
                onChange={() => setPreserveAspect(!preserveAspect)}
              />
              Preserve Aspect Ratio
            </label>
            <div>
              <label className="text-black font-semibold">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="p-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-[#9B4DF4]"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
          </div>

          {/* Resize & Download */}
          <div className="flex gap-4">
            <button
              onClick={handleResize}
              className="px-6 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#6d28d9] transition"
            >
              Resize
            </button>
            {resizedUrl && (
              <a
                href={resizedUrl}
                download={`resized-image.${format}`}
                className="px-6 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#6d28d9] transition"
              >
                Download Image
              </a>
            )}
          </div>

          {/* Preview */}
          {resizedUrl && (
            <div className="flex flex-col gap-3 items-center">
              <img
                src={resizedUrl}
                alt="Resized Preview"
                className="border border-gray-300 rounded-lg max-w-full"
              />
              <div className="text-gray-600 text-sm">
                {format.toUpperCase()} – {width || "auto"} × {height || "auto"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
