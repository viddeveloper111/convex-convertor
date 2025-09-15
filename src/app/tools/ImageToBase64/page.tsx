"use client";

import { useState } from "react";
import { Image } from "lucide-react";

export default function ImageToBase64Page() {
  const [base64, setBase64] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#181023] min-h-screen p-6 flex justify-center">
      {/* Container */}
      <div className="w-full max-w-5xl space-y-8 mt-5">
        {/* Header */}
        <header className="text-center space-y-2">
             <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-[#9B4DF4]">
      <Image className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
      Image to Base64 Converter
    </h1>
          <p className="text-gray-400">
            Fast, free, open source, ad-free tools.
          </p>
        </header>

        {/* Upload Section */}
        <section className="space-y-2">
          <label className="font-semibold text-white">
            Drag and drop your image here, or click to select (Max size 4MB)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full p-3 border border-gray-300  rounded-lg bg-black text-white font-mono text-sm focus:ring-2 focus:ring-[#9B4DF4]"
          />
        </section>

        {/* Base64 Output */}
        {base64 && (
          <section className="space-y-2">
            <label className="font-semibold text-gray-800 dark:text-gray-200">
              Base64 Output
            </label>
            <textarea
              value={base64}
              readOnly
              rows={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-black text-green-400 font-mono text-sm"
            />
            <p className="text-black">
              Use in <code>&lt;img src="" alt="Base64 Image" /&gt;</code> or CSS{" "}
              <code>background-image: url();</code>
            </p>
          </section>
        )}

        {/* Description */}
        <section className=" p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Convert Image to Data URI
          </h2>
          <p className="text-gray-400">
            Jam's free tool to convert images to Data URI comes in handy when you need to reduce HTTP requests. Convert images to Base64 so you can embed them directly into HTML, CSS, or JavaScript. This image to Data URI converter is simple and fast.
          </p>
        </section>

        {/* How to Use */}
        <section className=" p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">How to Use</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-400">
            <li>Upload your image file by dragging or selecting it.</li>
            <li>Copy the base64 encoded data that appears in the output box.</li>
            <li>Embed it directly into your HTML, CSS, or JavaScript code.</li>
          </ul>
          <p className="text-gray-400">
            Converting an image to base64 reduces HTTP requests, boosts performance, and keeps your image quality consistent.
          </p>
        </section>

        {/* Benefits */}
        <section className=" p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">Benefits</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong>Web optimization:</strong> Reduce HTTP requests by embedding the image directly into your code.</li>
            <li><strong>Simplified workflow:</strong> Manage your images easily without needing external files.</li>
            <li><strong>Flexibility:</strong> Use the Data URI format in HTML, CSS, JavaScript, and more.</li>
          </ul>
        </section>

        {/* Explanation */}
        <section className=" p-6 space-y-2">
          <h2 className="text-2xl font-bold text-white">Understanding Image to Base64 Data URI</h2>
          <p className="text-gray-400">
            Converting an image to Base64 lets you insert binary data into web pages. This treats the data as part of the document rather than as an external resource.
          </p>
          <p className="text-gray-400">
            Converting an image to Base64 changes the image data. You can include this format directly in your code. You can even use the <code>&lt;img src="" /&gt;</code> attribute with Base64-encoded data.
          </p>
          <p className="text-gray-400">
            This method helps small images, such as icons or logos, load faster by reducing HTTP requests. This improvement boosts overall performance.
          </p>
          <p className="text-gray-400">
            Converting an image to a Data URI keeps the quality of your image intact and helps your web content load faster. The content type remains consistent, ensuring smooth integration.
          </p>
        </section>
      </div>
    </div>
  );
}
