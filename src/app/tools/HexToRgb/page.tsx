"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

export default function HexToRgbPage() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [copied, setCopied] = useState(false);

  // Convert HEX → RGB
  useEffect(() => {
    const hexValue = hex.replace("#", "");
    if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
      const r = parseInt(hexValue.substring(0, 2), 16);
      const g = parseInt(hexValue.substring(2, 4), 16);
      const b = parseInt(hexValue.substring(4, 6), 16);
      setRgb({ r, g, b });
    }
  }, [hex]);

  // Convert RGB → HEX whenever RGB changes
  useEffect(() => {
    const rHex = rgb.r.toString(16).padStart(2, "0");
    const gHex = rgb.g.toString(16).padStart(2, "0");
    const bHex = rgb.b.toString(16).padStart(2, "0");
    setHex(`#${rHex}${gHex}${bHex}`.toUpperCase());
  }, [rgb]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
    const clamped = Math.min(255, Math.max(0, value));
    setRgb((prev) => ({ ...prev, [channel]: clamped }));
  };

  return (
    <div className="bg-white min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-black">
            HEX to RGB Converter
          </h1>
          <p className="text-black">Free, Open Source & Ad-free</p>
        </header>

        {/* Converter */}
        <section className="dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="grid gap-6">
            {/* HEX Input */}
            <div className="space-y-2">
              <h2 className="font-semibold text-white">HEX Value</h2>
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#FF5733"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 text-black bg-white font-mono text-sm focus:ring-2 outline-none"
              />
            </div>

            {/* RGB Inputs */}
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">RGB Output</h2>
              <div className="flex gap-4 text-sm font-medium">
                <div>
                  <label className="block text-red-400">Red:</label>
                  <input
                    type="number"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange("r", Number(e.target.value))}
                    className="w-20 p-1 rounded border border-gray-400 text-black bg-white text-sm font-mono"
                    min={0}
                    max={255}
                  />
                </div>
                <div>
                  <label className="block text-green-400">Green:</label>
                  <input
                    type="number"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange("g", Number(e.target.value))}
                    className="w-20 p-1 rounded border border-gray-400 text-black bg-white text-sm font-mono"
                    min={0}
                    max={255}
                  />
                </div>
                <div>
                  <label className="block text-blue-400">Blue:</label>
                  <input
                    type="number"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange("b", Number(e.target.value))}
                    className="w-20 p-1 rounded border border-gray-400 text-black bg-white text-sm font-mono"
                    min={0}
                    max={255}
                  />
                </div>
              </div>
            </div>

            {/* CSS / Platform Codes with Copy */}
            <div>
              <h2 className="font-semibold text-black mb-2">CSS / Platform Codes</h2>
              <div className="flex items-start gap-4">
                <pre className="flex-1 max-h-40 overflow-y-auto p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white text-green-400 font-mono text-sm">
                  CSS: rgba({rgb.r}, {rgb.g}, {rgb.b}, 1){"\n"}
                  Obj C: [UIColor colorWithRed: {(rgb.r / 255).toFixed(2)} green: {(rgb.g / 255).toFixed(2)} blue: {(rgb.b / 255).toFixed(2)} alpha: 1.0]{"\n"}
                  Swift: UIColor(red: {(rgb.r / 255).toFixed(2)}, green: {(rgb.g / 255).toFixed(2)}, blue: {(rgb.b / 255).toFixed(2)}, alpha: 1.0){"\n"}
                  Android: Color.rgb({rgb.r}, {rgb.g}, {rgb.b})
                </pre>

                <button
                  onClick={() => handleCopy(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`)}
                  className="h-fit mt-1 flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* Intro */}
        <section className="bg-white  rounded-2xl shadow p-6">
          <p className="text-black">
            Easily convert HEX CSS/HTML color codes to RGB for CSS, Objective-C, Swift, or Android.
          </p>
        </section>

        {/* How to Use */}
        <section className="bg-white  rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-black mb-2">How to Use</h2>
          <ol className="list-decimal pl-6 space-y-2 text-black">
            <li>Enter your HEX color code.</li>
            <li>Copy the resulting RGB color code or platform-specific code.</li>
          </ol>
        </section>
        <div className="p-4 rounded-lg bg-white text-black">
  <p>
    The CSS color converter works by taking your hexadecimal color code (HEX) 
    and converting it into the corresponding RGB values, which represent the 
    red, green, and blue components ranging from 0 to 255. This allows you to 
    easily match HTML and CSS colors with design tools such as Figma, Photoshop, 
    or Sketch. For example, entering a HEX code from your CSS instantly gives you 
    the matching RGB values to ensure design consistency across platforms. 
    Need to convert the other way? You can use the 
    <a href="#" className="text-blue-600 underline"> RGB to HEX converter here</a>.
  </p>
</div>

      </div>
    </div>
  );
}
