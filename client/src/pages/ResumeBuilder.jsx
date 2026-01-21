import React, { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import toast from 'react-hot-toast'
import api from '../configs/api'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Download,
  Save,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import {useSelector} from 'react-redux'

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const {token}=useSelector(state=>state.auth)

  const [removeBG, setRemoveBG] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const progress =
    sections.length > 1
      ? (activeSectionIndex * 100) / (sections.length - 1)
      : 0;

  const loadExistingResume=async()=>{
     try{
      const {data}=await api.get(`/api/resumes/get/${resumeId}`,{headers:{
        Authorization: `Bearer ${token}`
      }})
      if(data.resume){
        setResumeData(data.resume)
        document.title=data.resume.title
      }
     }
     catch(error){
      console.log(error.message)

     }
  }

  useEffect(() => {
   loadExistingResume()
  }, [resumeId]);


  const changeResumeVisibility = async()=>{
    try{
      const formData=new FormData()
      formData.append("resumeId",resumeId)
      formData.append("resumeData",JSON.stringify({public:!resumeData.public}))
      const {data}=await api.put(`/api/resumes/update`,formData,{headers:{
        Authorization: `Bearer ${token}`
      }})
      setResumeData({...resumeData,public:!resumeData.public})
      toast.success(data.message)

    }
    catch(error){
      console.log(error.message)
    }
}

const handleShare = async () => {
  const baseUrl = window.location.origin;
  const resumeUrl = `${baseUrl}/view/${resumeData._id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Check out my resume",
        text: "Here is my resume",
        url: resumeUrl,
      });
    } else {
      await navigator.clipboard.writeText(resumeUrl);
      alert("Resume link copied to clipboard");
    }
  } catch (err) {
    console.error("Share failed:", err);
    alert("Unable to share. Link copied instead.");
    await navigator.clipboard.writeText(resumeUrl);
  }
};


const downloadResume = () => {
    window.print();
}

const saveResume=async ()=>{
    try{
      let updatedResumeData=structuredClone(resumeData)
      ///remove image to send it seprately
      if(typeof resumeData.personal_info.image==='object'){
        delete updatedResumeData.personal_info.image
      }
      const formData=new FormData()
      formData.append('resumeId',resumeId)
      formData.append('resumeData',JSON.stringify(updatedResumeData))
      // formData.append("accentColor", resumeData.accent_color)

      removeBG && formData.append("removeBackground","yes")
      typeof resumeData.personal_info.image==='object' && formData.append('image',resumeData.personal_info.image)

      const {data}=await api.put(`/api/resumes/update`,formData,{headers:{
       Authorization: `Bearer ${token}`
      }})
      setResumeData(data.resume)
      
      toast.success(data.message)
    }catch(error){
      console.log(error.message)
      toast.error(error.message||"Not Saved")
    }
}



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-3 py-4">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-3 pb-10">
        <div className="grid grid-cols-16 gap-4">
          {/* LEFT PANEL */}
          <div className="col-span-16 lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col">
              {/* Progress */}
              <div className="px-4 pt-4">
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveSectionIndex((p) => Math.max(p - 1, 0))
                    }
                    disabled={activeSectionIndex === 0}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs border hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setActiveSectionIndex((p) =>
                        Math.min(p + 1, sections.length - 1)
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs border hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Area */}
              <div className="px-4 py-5 space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBG={removeBG}
                    setRemoveBG={setRemoveBG}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <Projects
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>

              <button
              onClick={()=>{toast.promise(saveResume,{loading : 'Saving'})}}
                className="px-6 py-2 rounded-lg text-white font-medium
             bg-gradient-to-r from-violet-500 to-indigo-500
             hover:from-violet-600 hover:to-indigo-600
             transition shadow-md hover:shadow-lg
             disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-16 lg:col-span-9">
            <div className="lg:sticky lg:top-4">
              {/* Preview Header */}
              <div className="bg-white rounded-xl shadow-sm px-4 py-3 mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">
                  Resume Preview
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  {resumeData.public && (
                    <button onClick={handleShare}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                 rounded-full bg-green-100 text-green-700
                 hover:bg-green-200 transition"
                    >
                      <Share2Icon className="size-3.5" />
                      Share
                    </button>
                  )}

                  <button onClick={changeResumeVisibility}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
               rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  >
                    {resumeData.public ? (
                      <EyeIcon className="size-3.5 text-yellow-500" />
                    ) : (
                      <EyeOffIcon className="size-3.5 text-gray-400" />
                    )}
                    {resumeData.public ? "Public" : "Private"}
                  </button>

                  {/* Download */}
                  <button onClick={downloadResume}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
               rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                  >
                    <Download className="size-4" />
                    Download
                  </button>

                  {/* Save
                  <button
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium
               rounded-lg text-white
               bg-gradient-to-r from-violet-500 to-indigo-500
               hover:from-violet-600 hover:to-indigo-600
               transition shadow-sm"
                  >
                    <Save className="size-4" />
                    Save
                  </button> */}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center">
                <div className="w-full">
                  <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
