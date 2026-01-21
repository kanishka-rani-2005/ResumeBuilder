import React, { useState } from "react";
import { Layout, Check } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "Clean and professional resume layout",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Sleek design with smart use of colors",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Simple layout with clean typography",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Ultra-clean design with profile image",
    },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          {templates.map((temp) => {
            const isActive = selectedTemplate === temp.id;

            return (
              <button
                key={temp.id}
                type="button"
                onClick={() => {
                  onChange(temp.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-violet-50 transition ${
                  isActive ? "bg-violet-50" : ""
                }`}
              >
                {/* Check icon */}
                <div className="mt-1">
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-300" />
                  )}
                </div>

                {/* Text */}
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-gray-800">
                    {temp.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {temp.preview}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default TemplateSelector;
