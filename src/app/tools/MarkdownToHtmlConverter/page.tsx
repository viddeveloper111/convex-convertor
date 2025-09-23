"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, DownloadCloud, Copy, Eye ,ArrowLeft } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";

/**
 * Markdown -> HTML Converter Component
 *
 * Features:
 * - Paste or edit Markdown
 * - Upload .md file (drag or click)
 * - Live sanitized preview (dangerouslySetInnerHTML with DOMPurify)
 * - Copy HTML to clipboard
 * - Download full .html file with boilerplate
 *
 * Drop this component into your Next.js app (client).
 */

export default function MarkdownToHtmlConverter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [markdown, setMarkdown] = useState<string>(
    `# Hello from Jam Tools\n\nWrite Markdown here and see HTML preview — **bold**, _italic_, \`code\`, lists, links, images, etc.\n\n- Item 1\n- Item 2\n\n\`\`\`js\nconsole.log("hello");\n\`\`\`\n`
  );
  const [html, setHtml] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("markdown.html");
  const [dragOver, setDragOver] = useState<boolean>(false);
    const router = useRouter();

  // Convert markdown to HTML and sanitize it
  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const rawHtml = await marked.parse(markdown || "");
        if (typeof rawHtml === "string" && !cancelled) {
          const clean = DOMPurify.sanitize(rawHtml, { ADD_TAGS: ["iframe"], ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"] });
          setHtml(clean);
        }
      } catch (err) {
        if (!cancelled) {
          setHtml("<p><em>Error rendering markdown</em></p>");
          console.error("Markdown render error:", err);
        }
      }
    };
    render();
    return () => {
      cancelled = true;
    };
  }, [markdown]);

  // Create downloadable .html file
  useEffect(() => {
    // Revoke previous URL
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl("");
    }

    const fullHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Converted Markdown</title>
  <style>
    body { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 28px; line-height: 1.6; color: #111827; background: #fff; }
    pre { background: #0f172a; color: #e6eef8; padding: 12px; border-radius: 8px; overflow:auto; }
    code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace; }
    img { max-width: 100%; height: auto; }
    blockquote { border-left: 4px solid #d1d5db; padding-left: 12px; color: #374151; margin: 0 0 12px; }
    h1,h2,h3,h4 { color: #0f172a; margin-top: 1.2em; }
    a { color: #7c3aed; text-decoration: none; }
  </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setFileName((prev) => prev.replace(/\.[^/.]+$/, ".html") || "markdown.html");

    // cleanup when component unmounts handled by revoke when next change occurs
    return () => {
      URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  // File input handler (upload .md)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".md") && file.type !== "text/markdown" && file.type !== "text/plain") {
      alert("Please upload a .md file");
      return;
    }
    const text = await file.text();
    setMarkdown(text);
    setFileName(file.name.replace(/\.[^/.]+$/, ".html"));
  };

  // Drag & drop
  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".md") && file.type !== "text/markdown" && file.type !== "text/plain") {
      alert("Please drop a .md file");
      return;
    }
    const text = await file.text();
    setMarkdown(text);
    setFileName(file.name.replace(/\.[^/.]+$/, ".html"));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      alert("HTML copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
      alert("Failed to copy HTML. You can select and copy manually.");
    }
  };

  const handleDownload = () => {
    // using generated downloadUrl from effect
    // anchor uses downloadFilename
  };

  return (
    <div className="min-h-screen bg-[#0b1020] p-6 flex flex-col items-center text-white">
         {/* Back Button */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9B4DF4] text-white hover:bg-purple-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      <header className="max-w-3xl w-full text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] flex items-center justify-center gap-3">
          <FileText className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
          Markdown → HTML
        </h1>
        <p className="text-gray-400 mt-2">Convert Markdown to sanitized HTML instantly — client-side, no uploads.</p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Editor + Controls */}
        <div>
          {/* Upload / Drag area */}
          <div
            className={`w-full border-2 rounded-xl p-4 mb-4 cursor-pointer transition-colors ${dragOver ? "border-dashed border-2 border-[#9B4DF4] bg-[#0f172a]" : "border-dashed border-gray-600"}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".md,text/markdown,text/plain"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">Drag & drop a .md file here or click to select</p>
                <p className="text-gray-400 text-sm mt-1">{fileName ? `Will download as: ${fileName}` : "Or paste your Markdown in the editor below."}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMarkdown("");
                    setFileName("markdown.html");
                  }}
                  className="px-3 py-2 bg-gray-700 rounded-md text-sm hover:bg-gray-600"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-3 py-2 bg-[#9B4DF4] rounded-md text-sm hover:bg-[#7a35c9] flex items-center gap-2"
                >
                  Upload .md
                </button>
              </div>
            </div>
          </div>

          {/* Markdown editor */}
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[420px] p-4 rounded-xl bg-[#07102a] border border-gray-700 text-white resize-none"
            placeholder="Write Markdown here..."
          />

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopyHtml}
              className="flex items-center gap-2 bg-[#111827] px-4 py-2 rounded-xl hover:bg-[#0f172a] transition"
            >
              <Copy className="w-4 h-4" />
              Copy HTML
            </button>

            <a
              href={downloadUrl}
              download={fileName}
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#9B4DF4] px-4 py-2 rounded-xl hover:bg-[#7a35c9] transition"
            >
              <DownloadCloud className="w-4 h-4" />
              Download .html
            </a>

            <button
              onClick={() => {
                // Quick convert to open html in new tab (preview full page)
                const fullHtml = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body>${html}</body></html>`;
                const blob = new Blob([fullHtml], { type: "text/html" });
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
                // optional: revoke after a delay
                setTimeout(() => URL.revokeObjectURL(url), 5000);
              }}
              className="flex items-center gap-2 bg-[#0b6b6b] px-4 py-2 rounded-xl hover:opacity-95 transition"
            >
              <Eye className="w-4 h-4" />
              Open HTML (new tab)
            </button>
          </div>

          <p className="text-gray-400 mt-3 text-sm max-w-xl">
            Tip: You can include images with Markdown `![](/path/to/image.jpg)` — if images use relative paths they won't be embedded in the downloaded HTML.
          </p>
        </div>

        {/* Right: Preview */}
        <div>
          <div className="w-full h-[80px] flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Preview (sanitized)</h2>
            <span className="text-sm text-gray-400">Rendered HTML</span>
          </div>

          <div className="bg-white text-black rounded-xl p-4 h-[560px] overflow-auto border border-gray-200">
            {/* Render sanitized HTML */}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </main>
    </div>
  );
}
