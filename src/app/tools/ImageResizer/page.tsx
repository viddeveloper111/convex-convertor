"use client";

import { useState, ChangeEvent } from "react";
import { Move } from "lucide-react";

export default function ImageResizerPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [preserveAspect, setPreserveAspect] = useState(true);
  const [format, setFormat] = useState("png");
  const [resizedUrl, setResizedUrl] = useState<string>("");

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
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0, w, h);

      setResizedUrl(canvas.toDataURL(`image/${format}`));
    };

    img.src = URL.createObjectURL(imageFile);
  };

  return (
    <div className="bg-[#181023] min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-4xl flex flex-col items-center space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="flex items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
  <Move className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" /> Image Resizer</h1>
          <p className="text-gray-400">Fast, free, open source, ad-free tools.</p>
        </header>

        {/* Upload & Resize Section */}
        <div className=" bg-black shadow-lg rounded-xl p-6 w-full flex flex-col gap-6">

          {/* File Input */}
          <label className="w-full h-40 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center text-gray-400 cursor-pointer hover:border-[#9B4DF4] transition">
            {imageFile ? imageFile.name : "Drag and drop your image here, or click to select"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <p className="text-sm mt-2">Max size 40MB</p>
          </label>

          {/* Width/Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="Enter width"
                className="w-full p-3 border rounded-lg bg-black text-white border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
              />
            </div>
            <div>
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="Enter height"
                className="w-full p-3 border rounded-lg bg-black text-white border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                checked={preserveAspect}
                onChange={() => setPreserveAspect(!preserveAspect)}
              />
              Preserve Aspect Ratio
            </label>
            <div>
              <label className="text-gray-800 dark:text-gray-200 font-semibold">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="p-2 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-[#9B4DF4] transition"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
          </div>

          {/* Resize Button */}
          <div>
          <button
            onClick={handleResize}
            className="px-6 py-2  bg-[#9B4DF4] text-white rounded-lg hover:bg-[#5916a5] transition"
          >
            Resize
          </button>
          <a
                href={resizedUrl}
                download={`resized-image.${format}`}
                className="px-6 py-2  bg-[#9B4DF4] text-white rounded-lg hover:bg-[#501396] transition float-end"
              >
                Download Image
              </a>
              </div>

          {/* Resized Image Preview & Download */}
          {resizedUrl && (
            <div className="flex flex-col gap-3 items-center">
              <img
                src={resizedUrl}
                alt="Resized Preview"
                className="border border-gray-700 rounded-lg max-w-full"
              />
              
              <div className="text-gray-300 text-sm">
                {format.toUpperCase()} - {width || "auto"} x {height || "auto"}
              </div>
            </div>
          )}

        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-white">
              Our tools are free and open source. Feel free to contribute.
            </p>
            <button className="px-4 py-2 border text-black border-gray-600 rounded-xl bg-[#9B4DF4] hover:bg-[#5b1ca3] hover:text-white transition">
              Contribute
            </button>
          </div>
          <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-800 flex flex-col items-start gap-3 hover:shadow-lg transition">
            <p className="text-white">
              Auto-capture all the info engineers need to debug!
            </p>
            <button className="px-4 py-2 border border-gray-600 text-black rounded-xl bg-[#9B4DF4] hover:bg-[#5d249e] hover:text-white transition">
              Try Jam
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
