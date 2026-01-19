import React, { useState } from "react";
import { Loader, Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";
const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
  const {token}=useSelector(state=>state.auth)
  const [isGenerating ,setIsGenerating]=useState(false);

  const generateSummary=async()=>{
      try{
          setIsGenerating(true)
          const prompt=`Enhance my Professional Summary "${data}"`;

          const {response}=await api.post(`/api/ai/enhance-pro-sum`,{userContent:prompt},{headers:{
          Authorization: `Bearer ${token}`
          }})
          setResumeData(prev=>({...prev,professional_summary:response.data.enhancedContent}))
      
          toast.success(data.message)
    }catch(error){
      console.log(error.message)
      toast.error(error.message||"Not Saved")
    }
    finally{
      setIsGenerating(false)
    }
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-base text-gray-600 mt-1">
            Add a short overview of your experience and strengths
          </p>
        </div>

        <button
        disabled={isGenerating}
        onClick={generateSummary}
          type="button" className="inline-flex items-center gap-1 px-5 py-2 text-sm-center font-medium
                     rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 transition"
        >
          {isGenerating?(<Loader2 className="size-4 animate-spin"/>):(<Sparkles className="size-7" />)}
          {isGenerating?'Enhancing...':'Ai Enhance'}
        </button>
      </div>

      {/* Textarea */}
      <div className="space-y-7">
        <textarea
          rows={15}
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career goals..."
          className="w-full rounded-xl border border-gray-300 px-5 py-4 text-base
                     resize-none focus:outline-none focus:ring-2 focus:ring-violet-500
                     focus:border-violet-500 transition"
        />

        <p className="text-sm text-gray-500">
          💡 Tip: Keep it concise (3–4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
