import React from 'react'

const Features = () => {
  return (
    <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            {/* SECTION WRAPPER */}
            <section
                id="features"
                className="bg-violet-50 py-24"
            >
                <h1 className="text-3xl font-semibold text-center mx-auto">
                    Build a Job-Winning Resume
                </h1>

                <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
                    Everything you need to create, customize, and download professional resumes that stand out.
                </p>
                
                <div className="flex items-center justify-center flex-wrap gap-6 mt-20 px-4 md:px-0">
                    
                    {/* Feature 1 */}
                    <div className="flex flex-col text-center items-center justify-center rounded-xl p-6 border border-violet-200 gap-6 max-w-sm bg-white">
                        <div className="p-6 aspect-square bg-violet-100 rounded-full">
                            {/* icon */}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-700">
                                Smart Resume Builder
                            </h3>
                            <p className="text-sm text-slate-600">
                                Create polished resumes with guided sections and real-time formatting.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col text-center items-center justify-center rounded-xl p-6 border border-green-200 gap-6 max-w-sm bg-white">
                        <div className="p-6 aspect-square bg-green-100 rounded-full">
                            {/* icon */}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-700">
                                ATS-Friendly Templates
                            </h3>
                            <p className="text-sm text-slate-600">
                                Optimized layouts that pass applicant tracking systems used by employers.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col text-center items-center justify-center rounded-xl p-6 border border-orange-200 gap-6 max-w-sm bg-white">
                        <div className="p-6 aspect-square bg-orange-100 rounded-full">
                            {/* icon */}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-700">
                                One-Click Export
                            </h3>
                            <p className="text-sm text-slate-600">
                                Download your resume instantly in PDF or DOCX format, ready to apply.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
  )
}

export default Features
