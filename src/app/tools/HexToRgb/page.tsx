"use client";

import { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck, Palette, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HexToRgbPage() {
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // HEX → RGB
  useEffect(() => {
    const hexValue = hex.replace("#", "");
    if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
      const r = parseInt(hexValue.slice(0, 2), 16);
      const g = parseInt(hexValue.slice(2, 4), 16);
      const b = parseInt(hexValue.slice(4, 6), 16);
      setRgb({ r, g, b });
    }
  }, [hex]);

  // RGB → HEX
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
      useEffect(() => {
      document.title = "HEX to RGB Converter";
    }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* ✅ Back button pinned left */}
      <div className="mb-6 flex justify-start">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

       <div className="flex justify-center"> 
    <div className="w-full max-w-7xl space-y-12">
          {/* Header */}
          <header className="text-center space-y-2">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-[#9B4DF4]">
              <Palette className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
              HEX to RGB Converter
            </h1>
            <p className="text-black">Free, Open Source & Ad-free</p>
          </header>

        {/* Converter */}
        <section className="bg-gray-200 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="grid gap-6">
            {/* HEX Input */}
            <div className="space-y-2">
              <h2 className="font-semibold text-black">HEX Value</h2>
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#FF5733"
                className="w-full p-3 rounded-lg border  bg-white text-black font-mono text-sm  outline-none "
              />
            </div>

            {/* RGB Inputs */}
            <div className="space-y-4">
              <h2 className="font-semibold text-black mb-2">RGB Output</h2>
              <div className="flex gap-4 text-sm font-medium">
                <div>
                  <label className="block text-red-400">Red:</label>
                  <input
                    type="number"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange("r", Number(e.target.value))}
                    className="w-20 p-1 rounded border  bg-white text-black text-sm font-mono"
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
                    className="w-20 p-1 rounded border  bg-white text-black text-sm font-mono"
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
                    className="w-20 p-1 rounded border bg-white text-black text-sm font-mono "
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
                <pre className="flex-1 max-h-40 overflow-y-auto p-3 rounded-lg border bg-white text-[#9B4DF4] font-mono text-sm">
                  CSS: rgba({rgb.r}, {rgb.g}, {rgb.b}, 1){"\n"}
                  Obj C: [UIColor colorWithRed: {(rgb.r / 255).toFixed(2)} green: {(rgb.g / 255).toFixed(2)} blue: {(rgb.b / 255).toFixed(2)} alpha: 1.0]{"\n"}
                  Swift: UIColor(red: {(rgb.r / 255).toFixed(2)}, green: {(rgb.g / 255).toFixed(2)}, blue: {(rgb.b / 255).toFixed(2)}, alpha: 1.0){"\n"}
                  Android: Color.rgb({rgb.r}, {rgb.g}, {rgb.b})
                </pre>

                <button
                  onClick={() => handleCopy(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`)}
                  className="h-fit mt-1 flex items-center gap-2 px-4 py-2 bg-[#9B4DF4] text-white rounded-lg hover:bg-[#5d17ae] transition"
                >
                  {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* Intro */}
        <section className="p-6">
          <p className="text-black">
            Easily convert HEX CSS/HTML color codes to RGB for CSS, Objective-C, Swift, or Android.
          </p>
        </section>

        {/* How to Use */}
        <section className=" p-6">
          <h2 className="text-2xl font-bold text-black mb-2">How to Use</h2>
          <ol className="list-decimal pl-6 space-y-2 text-black">
            <li>Enter your HEX color code.</li>
            <li>Copy the resulting RGB color code or platform-specific code.</li>
          </ol>
        </section>
        <div className="p-4 rounded-lg text-black">
  <p>
    The CSS color converter works by taking your hexadecimal color code (HEX) 
    and converting it into the corresponding RGB values, which represent the 
    red, green, and blue components ranging from 0 to 255. This allows you to 
    easily match HTML and CSS colors with design tools such as Figma, Photoshop, 
    or Sketch. For example, entering a HEX code from your CSS instantly gives you 
    the matching RGB values to ensure design consistency across platforms. 
    Need to convert the other way? You can use the 
    <a href="#" className="text-[#9B4DF4] underline"> RGB to HEX converter here</a>.
  </p>
</div>

      </div>
      </div>
    </div>
  );
}
