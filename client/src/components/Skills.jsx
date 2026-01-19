import { X } from "lucide-react";
import React, { useState } from "react";

const Skills = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
        <p className="text-sm text-gray-600 mt-1">
          Add 8–12 relevant skills
        </p>
      </div>

      {/* Input + Chips Box */}
      <div
        className="flex flex-wrap gap-2 p-3 rounded-xl border border-gray-300
                   focus-within:ring-2 focus-within:ring-violet-500 bg-white"
      >
        {data.map((skill, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-3 py-1 rounded-full
                       bg-violet-100 text-violet-700 text-sm font-medium"
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="hover:text-red-500 transition"
              type="button"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="flex-1 min-w-[150px] border-none outline-none text-sm py-1"
        />
      </div>

      {/* Tip */}
      <p className="text-xs text-gray-500">
        Tip: Add both technical skills (React, Node, SQL) and soft skills
        (communication, teamwork).
      </p>
    </div>
  );
};

export default Skills;
