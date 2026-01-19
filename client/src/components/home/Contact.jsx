import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="w-full bg-purple-50  py-10">
      <div className="max-w-5xl mx-auto px-6 text-black">
        
<span className="mx-auto w-fit  flex mb-10 justify-center mb-6 px-8 py-5 text-3xl border border-purple-300 rounded-full bg-white">
  Contact AI Resume Builder
</span>

        <h1 className="text-4xl font-bold mt-4">
          Let’s Build Your Career Together
        </h1>

        <p className="mt-4 max-w-2xl">
          Have questions about resumes, ATS optimization, or AI features?  
          Reach us directly at{" "}
          <a
            href="mailto:support@airesumebuilder.com"
            className="font-medium hover:underline"
          >
            support@airesumebuilder.com
          </a>
        </p>

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          
          <div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
              ✉️
            </div>
            <p className="text-lg font-semibold mt-4">
              Email Support
            </p>
            <p className="mt-1 mb-3">
              Get help with resume building & AI features.
            </p>
            <a
              href="mailto:support@airesumebuilder.com"
              className="font-semibold"
            >
              support@airesumebuilder.com
            </a>
          </div>

          <div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
              🏢
            </div>
            <p className="text-lg font-semibold mt-4">
              Our Office
            </p>
            <p className="mt-1 mb-3">
              Meet the team building smarter careers.
            </p>
            <span className="font-semibold">
              Remote-First · Global Team
            </span>
          </div>

          <div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
              📞
            </div>
            <p className="text-lg font-semibold mt-4">
              Talk to Us
            </p>
            <p className="mt-1 mb-3">
              Career guidance during working hours.
            </p>
            <span className="font-semibold">
              +1 (234) 567-8901
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
