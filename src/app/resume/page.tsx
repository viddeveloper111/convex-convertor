"use client";

import { useState } from "react";
import TemplateCard from "./TemplateCard";
import ResumePreview from "./ResumePreview";
import ResumePDF from "./ResumePDF";

interface FormData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string;
  address: string;
}

const templates = [
  { id: "celestial", name: "Celestial", preview: "/templates/celestial.webp" },
  { id: "modern", name: "Modern", preview: "/templates/modern.webp" },
  { id: "classic", name: "Classic", preview: "/templates/classic.webp" },
  { id: "minimal", name: "Minimal", preview: "/templates/minimal.webp" },
  { id: "creative", name: "Creative", preview: "/templates/creative.webp" },
  { id: "two-column", name: "Two Column", preview: "/templates/elegant.webp" },
];

export default function ResumeBuilder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [template, setTemplate] = useState(templates[0].id);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
    address: "",
  });

  const selectedTemplate = templates.find((t) => t.id === template);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-sans text-gray-800">
      {/* STEP 1: Select Template */}
      {step === 1 && (
        <div className="space-y-8">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700">
              Select a Resume Template
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Choose a design that fits your profession.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onSelect={() => {
                  setTemplate(t.id);
                  setStep(2);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Form Input */}
      {step === 2 && (
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 space-y-8">
          <h2 className="text-3xl font-bold text-purple-700 border-b pb-4">
            Enter Your Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["name", "email", "phone"] as const).map((field) => (
              <input
                key={field}
                className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            ))}

            {(["education", "experience", "skills", "address"] as const).map(
              (field) => (
                <textarea
                  key={field}
                  className="border rounded-md p-3 w-full md:col-span-2 h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              )
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700"
            >
              Preview Resume →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Preview & Download */}
      {step === 3 && selectedTemplate && (
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-purple-700">
              Your Resume Preview
            </h2>
            <p className="mt-3 text-gray-600">
              Review your details. Download as PDF or go back to edit.
            </p>
          </div>

          <div
            id="resume-content"
            className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200"
          >
            {/* <ResumePreview template={selectedTemplate.id} data={form} /> */}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <ResumePDF targetId="resume-content" />
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300"
            >
              ← Edit Details
            </button>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700"
            >
              Change Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
