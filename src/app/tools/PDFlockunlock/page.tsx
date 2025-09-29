"use client";

import { useState, useRef ,useEffect} from "react";
import { Lock, Unlock, Upload, Download, Shield, FileText, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PdfLockUnlock() {
  const [activeTab, setActiveTab] = useState<"lock" | "unlock">("lock");
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setDownloadUrl("");
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleProcessPdf = () => {
    if (!file) {
      alert("Please select a PDF file first");
      return;
    }

    if (activeTab === "lock" && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (activeTab === "unlock" && !password) {
      alert("Please enter the password");
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      const resultBlob = new Blob(["Simulated PDF processing complete"], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(resultBlob);
      setDownloadUrl(url);
      setIsProcessing(false);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setDownloadUrl("");
    } else {
      alert("Please drop a PDF file");
    }
  };

  const resetForm = () => {
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setDownloadUrl("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
       useEffect(() => {
      document.title = "PDFLockunlock Converter";
    }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-3 mb-2">
          <Shield className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
          PDF Lock & Unlock Tool
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Secure or unlock your PDF files easily
        </p>

        {/* Tabs */}
        <div className="flex bg-gray-100/20 rounded-xl p-1 mb-8">
          <button
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl flex-1 transition-colors ${
              activeTab === "lock"
                ? "bg-[#9B4DF4] text-white"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("lock")}
          >
            <Lock className="w-5 h-5" />
            Lock PDF
          </button>
          <button
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl flex-1 transition-colors ${
              activeTab === "unlock"
                ? "bg-[#9B4DF4] text-white"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab("unlock")}
          >
            <Unlock className="w-5 h-5" />
            Unlock PDF
          </button>
        </div>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-purple-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all duration-300 mb-6"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,application/pdf"
            className="hidden"
          />
          <Upload className="w-12 h-12 text-purple-300 mb-4" />
          <p className="text-black text-center mb-2">
            Drag and drop your PDF here, or click to select
          </p>
          <p className="text-purple-300 font-medium mt-4">
            {fileName || "No file selected"}
          </p>
        </div>

        {/* Password Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-black mb-2">
              {activeTab === "lock" ? "Set Password" : "PDF Password"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter password"
            />
          </div>

          {activeTab === "lock" && (
            <div>
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-100 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Confirm password"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleProcessPdf}
            disabled={isProcessing || !file}
            className="flex-1 bg-[#9B4DF4] hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : activeTab === "lock" ? (
              <>
                <Lock className="w-5 h-5" />
                Lock PDF
              </>
            ) : (
              <>
                <Unlock className="w-5 h-5" />
                Unlock PDF
              </>
            )}
          </button>
          <button
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 text-black py-3 px-6 rounded-xl font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Download Section */}
        {downloadUrl && (
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-3 bg-green-500/20 border border-green-500 rounded-xl p-4 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-200">
                {activeTab === "lock"
                  ? "PDF successfully encrypted!"
                  : "PDF successfully decrypted!"}
              </p>
            </div>
            <a
              href={downloadUrl}
              download={
                activeTab === "lock"
                  ? `secured_${fileName}`
                  : `unlocked_${fileName}`
              }
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download {activeTab === "lock" ? "Secured" : "Unlocked"} PDF
            </a>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-4 bg-black/20 rounded-xl">
          <h3 className="text-black font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            How it works:
          </h3>
          <ul className="text-black text-sm list-disc list-inside space-y-1">
            {activeTab === "lock" ? (
              <>
                <li>Upload your PDF file</li>
                <li>Set a strong password to encrypt your PDF</li>
                <li>Download your password-protected PDF</li>
                <li>All processing happens in your browser</li>
              </>
            ) : (
              <>
                <li>Upload your password-protected PDF</li>
                <li>Enter the correct password to remove protection</li>
                <li>Download your unlocked PDF</li>
                <li>All processing happens locally</li>
              </>
            )}
          </ul>
        </div>

        {/* Notice */}
        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-xl">
          <p className="text-yellow-500 text-sm">
            <strong>Note:</strong> This is a demo interface. Real encryption/decryption
            requires proper libraries or server-side handling.
          </p>
        </div>
      </div>
    </div>
  );
}
