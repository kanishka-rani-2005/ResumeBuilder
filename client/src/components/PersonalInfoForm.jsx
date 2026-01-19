import React from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Briefcase
} from 'lucide-react'

const PersonalInfoForm = ({ data, onChange, removeBG, setRemoveBG }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Contact Number", icon: Phone, type: "tel", required: true },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website Url", icon: Globe, type: "url" }
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-base text-gray-500 mt-1">
          Get started by adding your basic details
        </p>
      </div>

<div className="flex items-center gap-8">
  {/* IMAGE */}
  <label className="cursor-pointer">
    {data.image ? (
              <img
          src={
            typeof data.image === "string"
              ? data.image
              : URL.createObjectURL(data.image)
          }
          alt="user"
          className="w-28 h-28 rounded-full object-cover border shadow-md"
          style={{
            backgroundColor: removeBG ? "var(--accent)" : "transparent"
          }}
          />

    ) : (
      <div className="w-28 h-28 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-violet-500 hover:text-violet-500 transition">
        <User className="w-10 h-10" />
        <span className="text-sm mt-1">Upload</span>
      </div>
    )}
    <input
      type="file"
      accept="image/jpeg,image/png"
      className="hidden"
      onChange={(e) => handleChange('image', e.target.files[0])}
    />
  </label>

  {/* REMOVE BG TOGGLE (MOVED HERE) */}
  {typeof data.image === 'object' && (
    <div className="flex items-center gap-4">
      <span className="text-base font-medium text-gray-800">
        Remove Background
      </span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={removeBG}
          onChange={() => setRemoveBG(prev => !prev)}
        />
        <div className="w-12 h-5 bg-gray-300 rounded-full peer-checked:bg-violet-500 transition-colors"></div>
        <span className="absolute left-1 top-1 w-5 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
      </label>
    </div>
  )}
</div>



      {/* FORM FIELDS */}
      <div className="grid sm:grid-cols-2 gap-5">
        {fields.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.key} className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="w-4 h-4 text-gray-500" />
                {field.label}
                {field.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ''}
                onChange={(e) =>
                  handleChange(field.key, e.target.value)
                }
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
                className="h-11 w-full rounded-xl border border-gray-300 px-4 text-base
                           focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PersonalInfoForm
