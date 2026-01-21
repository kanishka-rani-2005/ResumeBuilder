import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  UploadCloudIcon,
  Pencil,
  Trash2Icon,
  XIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

import { pdfToText } from "react-pdftotext";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // ---------------- CREATE ----------------
  const createResume = async (event) => {
    try {
      event.preventDefault();

      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const pdfToText = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items.map(item => item.str).join(" ");
    text += pageText + "\n";
  }

  return text;
};

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resume);

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }

    setIsLoading(false);
  };

  // ---------------- LOAD ALL ----------------
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---------------- UPDATE TITLE ----------------
  const editTitle = async (e) => {
    try {
      e.preventDefault();

      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId: editResumeId,
          resumeData: JSON.stringify({ title }),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAllResumes((prev) =>
        prev.map((r) => (r._id === editResumeId ? { ...r, title } : r))
      );

      setTitle("");
      setEditResumeId("");
      setShowCreateResume(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ---------------- DELETE ----------------
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <section className="min-h-screen bg-purple-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-sm text-gray-600">Welcome back,</p>
            <h1 className="text-2xl font-semibold text-black">
              {user?.name}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateResume(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
            >
              <PlusIcon className="w-4 h-4" />
              Create Resume
            </button>

            <button
              onClick={() => setShowUploadResume(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-violet-300 bg-white hover:bg-violet-100 transition"
            >
              <UploadCloudIcon className="w-4 h-4 text-violet-600" />
              Upload Resume
            </button>
          </div>
        </div>

        <hr className="border-violet-200 my-8" />

        {/* CARDS — SAME AS BEFORE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allResumes.map((resume) => (
            <div
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="bg-white rounded-xl border border-violet-200 p-5 hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex items-center gap-4">
                {resume.personal_info?.image && (
                  <img
                    src={resume.personal_info.image}
                    alt={resume.personal_info.full_name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                )}

                <div>
                  <p className="font-semibold text-black">{resume.title}</p>
                  <p className="text-sm text-gray-500">
                    {resume.personal_info?.profession}
                  </p>
                </div>
              </div>

              {/* META */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: resume.accent_color }}
                >
                  {resume.template}
                </span>

                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-violet-600">
                  {resume.public ? "Public" : "Private"}
                </span>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-xs text-gray-500">
                  Updated On {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-3"
                >
                  <button
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                      setShowCreateResume(true);
                    }}
                    className="flex items-center gap-1 text-sm text-violet-600 hover:underline"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                  >
                    <Trash2Icon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CREATE / EDIT MODAL */}
        {showCreateResume && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowCreateResume(false)}
          >
            <form
              onSubmit={editResumeId ? editTitle : createResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg border border-violet-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-black">
                  {editResumeId ? "Edit Resume Title" : "Create Resume"}
                </h2>
                <XIcon
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => {
                    setShowCreateResume(false);
                    setEditResumeId("");
                    setTitle("");
                  }}
                />
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
              >
                {editResumeId ? "Update" : "Create Resume"}
              </button>
            </form>
          </div>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowUploadResume(false)}
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg border border-violet-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-black">
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </h2>
                <XIcon
                  className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                    setResume(null);
                  }}
                />
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              />

              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setResume(e.target.files[0])}
                className="mb-4"
              />

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
              >
                Upload Resume
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
