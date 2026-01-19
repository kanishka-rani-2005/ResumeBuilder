import React, { useState } from "react";
import { Check, Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Teal", value: "#14B8A6" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm"
      >
        <Palette size={16} />
        Accent
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg p-2">
          {colors.map((col) => (
            <button
              key={col.value}
              onClick={() => {
                onChange(col.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-left"
            >
              <div
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: col.value }}
              />

              <span className="text-sm text-gray-700 flex-1">
                {col.name}
              </span>

              {selectedColor === col.value && (
                <Check className="w-4 h-4 text-violet-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
