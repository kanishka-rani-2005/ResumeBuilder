import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
import { useState } from "react";

const ExperienceForm = ({ data = [], onChange }) => {

    const {token}=useSelector(state=>state.auth)
    const [generatingIndex ,setGeneratingIndex]=useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  
const generateDescription = async (index) => {
  setGeneratingIndex(index)
  const experience = data[index]

  const prompt = `Enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`

  try {
    const { data: resData } = await api.post(
      `/api/ai/enhance-job-desc`,
      { userContent: prompt },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    updateExperience(index, "description", resData.enhancedContent)
    toast.success("Description enhanced successfully")
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message || "Not Saved")
  } finally {
    setGeneratingIndex(-1)
  }
}


  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your work experience details
          </p>
        </div>

        <button
          onClick={addExperience}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl
                     bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-10 border border-dashed rounded-xl bg-white">
          <Briefcase className="size-12 mx-auto text-gray-400" />
          <p className="text-gray-500 mt-2">No experience added yet.</p>
          <p className="text-sm text-gray-400">
            Click “Add Experience” to get started
          </p>
        </div>
      )}

      {/* Experience Cards */}
      {data.length > 0 && (
        <div className="space-y-6">
          {data.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
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
                  placeholder="Company Name"
                  value={exp.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="month"
                  value={exp.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="month"
                  value={exp.end_date || ""}
                  disabled={exp.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Current Job Checkbox */}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={exp.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                Currently working here
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button 
                  onClick={()=>generateDescription(index)}
                  disabled={generatingIndex===index||!exp.position||!exp.company}
                    type="button"
                    className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700"
                  >
                    {generatingIndex===index?(
                      <Loader2 className="w-3 h-3 animate-spin"/>
                    ):
                     <Sparkles className="size-4" />
                    }                   
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={5}
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your role, responsibilities, and achievements..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                             resize-none focus:outline-none focus:ring-2 focus:ring-violet-500
                             transition"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
