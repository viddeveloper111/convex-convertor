import React from "react";

type Template = {
  id: string;
  name: string;
  preview: string;
};

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden
                 rounded-xl border border-gray-200 bg-white
                 shadow-md transition hover:border-purple-500 hover:shadow-xl
                 focus-within:ring-2 focus-within:ring-purple-500"
      tabIndex={0}
      role="button"
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <img
        src={template.preview}
        alt={template.name}
        className="w-full object-cover rounded-t-xl"
      />

      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-3">{template.name}</h3>
        <button
          type="button"
          onClick={onSelect}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg
                     font-medium transition hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Use This Template
        </button>
      </div>

      <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-10 transition" />
    </div>
  );
}
