"use client";

import { useState, ChangeEvent } from "react";
import { FileImage } from "lucide-react";

export default function WebPConverterPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [autoDownload, setAutoDownload] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string }[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
      setConvertedFiles([]); // reset previous conversion
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    setConvertedFiles([]);
  };

  // Convert image to WebP using canvas
  const convertImageToWebP = (file: File, quality: number): Promise<{ name: string; url: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                resolve({ name: file.name.replace(/\.[^/.]+$/, ".webp"), url });
              }
            },
            "image/webp",
            quality / 100
          );
        };
        if (e.target?.result) img.src = e.target.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleConvert = async () => {
    if (!files.length) return alert("Please select files to convert.");
    const converted: { name: string; url: string }[] = [];
    for (const file of files) {
      const result = await convertImageToWebP(file, quality);
      converted.push(result);
      if (autoDownload) {
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.name;
        link.click();
      }
    }
    setConvertedFiles(converted);
  };

  return (
    <div className="bg-[#181023] min-h-screen flex flex-col items-center p-6">
      <div className="container mx-auto max-w-5xl flex flex-col space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
         <h1 className="flex justify-center items-center gap-2 text-4xl font-bold text-[#9B4DF4]">
      <FileImage className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      WebP Converter
    </h1>
          <p className="text-gray-400">Convert images to WebP format with batch processing.</p>
        </header>

        {/* File Upload Card */}
        <div className="bg-black shadow-lg rounded-xl p-6 flex flex-col gap-6">
          <label className="w-full h-40 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center text-gray-400 cursor-pointer hover:border-[#9B4DF4] transition">
            Drag and drop your images here, or click to select
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
            <p className="text-sm mt-2">Max size 40MB per file</p>
          </label>

          {/* Selected Files Preview */}
          {files.length > 0 && (
            <div className="bg-gray-900 p-4 rounded-lg text-gray-300 space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Selected Files ({files.length})</span>
                <button onClick={clearAllFiles} className="text-red-500 hover:underline text-sm">Clear All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {files.map((file, idx) => (
                  <div key={idx} className="bg-gray-800 p-2 rounded-lg flex flex-col items-center gap-1">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <span className="text-xs truncate">{file.name}</span>
                    <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Slider */}
          <div>
            <label className="text-gray-200 font-semibold">Quality: {quality}%</label>
            <input
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-white text-sm mt-1">
              Lower quality = smaller file size, higher quality = better image quality
            </p>
          </div>

          {/* Auto-download */}
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={autoDownload}
              onChange={() => setAutoDownload(!autoDownload)}
            />
            Automatically download after conversion
          </label>

          {/* Convert & Download */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleConvert}
              className="px-6 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#592199] transition"
            >
              Convert to WebP
            </button>
            <button
              disabled={!convertedFiles.length}
              onClick={() => convertedFiles.forEach(file => {
                const link = document.createElement("a");
                link.href = file.url;
                link.download = file.name;
                link.click();
              })}
              className={`px-6 py-2 bg-green-600 text-white rounded-lg transition ${!convertedFiles.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'}`}
            >
              Download All
            </button>
          </div>

          {/* Conversion Results */}
          {convertedFiles.length > 0 && (
            <div className="text-gray-300 text-sm mt-4 space-y-1">
              {convertedFiles.map((file, idx) => (
                <p key={idx}>{file.name} converted successfully</p>
              ))}
            </div>
          )}
        </div>

        {/* Info / Contribution */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
         <div className="bg-black p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-white">
                Our tools are free and open source. Feel free to contribute.
              </p>
              <button className="px-4 py-2 border text-black border-gray-600 rounded-xl bg-[#9B4DF4] hover:bg-[#51119b]  hover:text-white transition">
                Contribute
              </button>
            </div>
           <div className=" bg-black p-6 rounded-2xl shadow-md border border-gray-700 flex flex-col items-start gap-3 hover:shadow-lg transition">
              <p className="text-white">
                Auto-capture all the info engineers need to debug!
              </p>
              <button className="px-4 py-2 border border-gray-600 text-black rounded-xl bg-[#9B4DF4] hover:bg-[#5a19a5] hover:text-white transition">
                Try Jam
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
