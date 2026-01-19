import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Education</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your education details
          </p>
        </div>

        <button
          onClick={addEducation}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl
                     bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-10 border border-dashed rounded-xl bg-white">
          <GraduationCap className="size-12 mx-auto text-gray-400" />
          <p className="text-gray-500 mt-2">No education added yet.</p>
          <p className="text-sm text-gray-400">
            Click “Add Education” to get started
          </p>
        </div>
      )}

      {/* Education Cards */}
      {data.length > 0 && (
        <div className="space-y-6">
          {data.map((edu, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Education #{index + 1}
                </h4>

                <button
                  onClick={() => removeEducation(index)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                  type="button"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="month"
                  value={edu.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* GPA */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  GPA (if applicable)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="GPA"
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
