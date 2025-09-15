"use client";

import { useState, useRef } from "react";
import { Lock, Unlock, Upload, Download, Shield, FileText } from "lucide-react";

export default function PdfLockUnlock() {
  const [activeTab, setActiveTab] = useState<"lock" | "unlock">("lock");
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileName, setFileName] = useState("");
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
      // In a real application, this would be actual PDF processing
      // For this demo, we're just creating a mock result
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center flex items-center justify-center gap-3 mb-2">
          <Shield className="w-10 h-10 p-2 bg-blue-500 text-white rounded-3xl" />
          PDF Lock & Unlock Tool
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Secure your PDF files with encryption or remove protection from locked PDFs
        </p>

        {/* Tabs */}
        <div className="flex bg-gray-800 rounded-lg p-1 mb-8">
          <button
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg flex-1 transition-colors ${
              activeTab === "lock"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("lock")}
          >
            <Lock className="w-5 h-5" />
            Lock PDF
          </button>
          <button
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg flex-1 transition-colors ${
              activeTab === "unlock"
                ? "bg-green-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab("unlock")}
          >
            <Unlock className="w-5 h-5" />
            Unlock PDF
          </button>
        </div>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-blue-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all duration-300 mb-6"
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
          <Upload className="w-12 h-12 text-blue-300 mb-4" />
          <p className="text-gray-300 text-center mb-2">
            Drag and drop your PDF file here, or click to select
          </p>
          <p className="text-blue-300 font-medium mt-4">
            {fileName || "No file selected"}
          </p>
        </div>

        {/* Password Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">
              {activeTab === "lock" ? "Set Password" : "PDF Password"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {activeTab === "lock" && (
            <div>
              <label className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Download Section */}
        {downloadUrl && (
          <div className="mt-8 p-4 bg-green-500/20 border border-green-500 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
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
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium w-full justify-center"
            >
              <Download className="w-5 h-5" />
              Download {activeTab === "lock" ? "Secured" : "Unlocked"} PDF
            </a>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500 rounded-xl">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            How it works:
          </h3>
          <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
            {activeTab === "lock" ? (
              <>
                <li>Upload your PDF file</li>
                <li>Set a strong password to encrypt your PDF</li>
                <li>Download your password-protected PDF</li>
                <li>Your file is processed securely in your browser</li>
              </>
            ) : (
              <>
                <li>Upload your password-protected PDF</li>
                <li>Enter the correct password to remove protection</li>
                <li>Download your unlocked PDF</li>
                <li>Your file never leaves your device</li>
              </>
            )}
          </ul>
        </div>

        {/* Security Notice */}
        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-xl">
          <p className="text-yellow-200 text-sm">
            <strong>Note:</strong> This is a demonstration interface. In a real
            application, PDF encryption/decryption would require server-side
            processing or specialized JavaScript libraries.
          </p>
        </div>
      </div>
    </div>
  );
}