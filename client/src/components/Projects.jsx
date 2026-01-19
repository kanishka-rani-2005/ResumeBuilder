import React from 'react'
import { Plus, Trash2, Projector } from 'lucide-react'

const Projects = ({data,onChange}) => {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your project details
          </p>
        </div>

        <button
          onClick={addProject}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl
                     bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-10 border border-dashed rounded-xl bg-white">
          <Projector className="size-12 mx-auto text-gray-400" />
          <p className="text-gray-500 mt-2">No projects added yet.</p>
          <p className="text-sm text-gray-400">
            Click 'Add Project' to get started
          </p>
        </div>
      )}

      {data.length > 0 && (
        <div className="space-y-6">
          {data.map((pro, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Project #{index + 1}
                </h4>

                <button
                  onClick={() => removeProject(index)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                  type="button"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={pro.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <input
                  type="text"
                  placeholder="Project Type"
                  value={pro.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-violet-500"
                />


           <textarea
            rows={8}
            placeholder="Describe your project, tech used, and your role..."
            value={pro.description || ""}
            onChange={(e) => updateProject(index, "description", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm leading-relaxed
                        resize-none focus:outline-none focus:ring-2 focus:ring-violet-500
                        focus:border-violet-500 transition bg-white"
            />


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
