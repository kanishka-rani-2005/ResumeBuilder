import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"

const Hero = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const {user}=useSelector(state=>state.auth)

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
          * {
            font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      <section className="flex flex-col items-center bg-linear-to-b from-[#EDE9FE] to-[#F8F3F9] px-4 py-6">
        <nav className="flex items-center justify-between gap-6 bg-white/70 border border-white rounded-full px-4 py-2.5 w-full max-w-4xl backdrop-blur">
          <a href="/" className="flex items-center gap-2 pl-2">
            <img src="/favicon.ico" alt="Logo" width="30px" />
            <span className="font-semibold text-gray-700 text-sm md:text-base">
              ResumeAI
            </span>
          </a>

          <div
            className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:h-screen max-md:bg-white/80 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center gap-8 flex-1 transition-all duration-300 ${
              mobileOpen ? "max-md:w-full" : "max-md:w-0 overflow-hidden"
            }`}
          >
            <a href="#" className="text-sm text-gray-600">
              Home
            </a>
            <a href="#features" className="text-sm text-gray-600">
              Features
            </a>
            <a href="#testimonials" className="text-sm text-gray-600">
              Testimonials
            </a>
            <a href="#contact" className="text-sm text-gray-600">
              Contact
            </a>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden bg-violet-600 text-white p-2 rounded-md"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              hidden={user}
              to="/app?state=register"
              className="hidden md:block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full text-sm"
            >
              Sign In
            </Link>
            <Link hidden={user}
              to="/app?state=login"
              className="hidden md:block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full text-sm"
            >
              Login
            </Link>

            <Link hidden={!user} to='/app' className="hidden md:block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full text-sm">Dashboard</Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2"
            >
              ☰
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-2 mt-10 px-4 py-2 rounded-full bg-white/60 border border-white">
          <span className="inline-flex size-2 rounded-full bg-green-500 animate-pulse"></span>
          <p className="text-xs md:text-sm text-gray-600">
            Trusted by 50,000+ job seekers worldwide
          </p>
        </div>

        <h1 className="text-4xl md:text-[64px] text-center max-w-3xl mt-8 font-semibold text-gray-800 leading-tight">
          Build a job-winning resume with AI in minutes
        </h1>

        <p className="text-sm md:text-base text-gray-600 text-center max-w-[680px] mt-4">
          Our AI resume builder creates ATS-optimized, recruiter-approved
          resumes tailored to your role, experience, and career goals.
        </p>

        {/* CTA */}
        <div className="flex gap-3 mt-10">
          <Link  to="/app?state=register" className="bg-violet-600 hover:bg-violet-700 text-white px-7 py-3 rounded-lg text-sm font-medium">
            Build My Resume
          </Link>
          <Link  to="/app?state=register" className="bg-white border border-violet-400 text-gray-700 px-6 py-3 rounded-lg text-sm">
            Upload Existing Resume
          </Link>
        </div>

        <div className="w-full max-w-[900px] h-[3px] mt-12 bg-linear-to-r from-white/10 via-violet-500 to-white/10"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 max-w-[950px] w-full">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              120k+
            </h2>
            <p className="text-xs md:text-sm text-gray-500">Resumes Created</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              3×
            </h2>
            <p className="text-xs md:text-sm text-gray-500">Interview Rate</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              98%
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              ATS Compatibility
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              40+
            </h2>
            <p className="text-xs md:text-sm text-gray-500">Countries</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
