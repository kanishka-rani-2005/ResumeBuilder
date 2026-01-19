import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import api from "../configs/api"
const Preview = () => {
  const { resumeId } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadResume = async() => {
    try{
      const {data}=await api.get('/api/resumes/public'+resumeId)
      setResume(data.resume)
    }
    catch(error){
      console.log(error.message)
    }
    finally{
      setLoading(false)
    }
    const found = dummyResumeData.find((r) => r._id === resumeId);
    setResume(found || null);
    setLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (loading) return <Loader />;

  return resume ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resume}
          template={resume.template}
          accentColor={resume.accent_color}
          
          className="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-center text-gray-600 text-xl">Resume not found</p>
      <a href="/" className="text-violet-600 underline ml-2">Go Home</a>

    </div>
  );
};

export default Preview;
