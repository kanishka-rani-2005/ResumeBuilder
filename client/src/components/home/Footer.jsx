import React from 'react'
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-violet-50 border-t border-violet-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          
          {/* LEFT LINKS */}
          <div className="flex flex-wrap gap-12 md:gap-20">
            
            <div>
              <p className="font-semibold text-black mb-3">Product</p>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-violet-600">Home</a></li>
                <li><a href="/" className="hover:text-violet-600">Support</a></li>
                <li><a href="/" className="hover:text-violet-600">Pricing</a></li>
                <li><a href="/" className="hover:text-violet-600">Affiliate</a></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-black mb-3">Resources</p>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-violet-600">Company</a></li>
                <li><a href="/" className="hover:text-violet-600">Blogs</a></li>
                <li><a href="/" className="hover:text-violet-600">Community</a></li>
                <li className="flex items-center gap-2">
                  <a href="/" className="hover:text-violet-600">Careers</a>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-violet-600 text-white">
                    We’re hiring
                  </span>
                </li>
                <li><a href="/" className="hover:text-violet-600">About</a></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-black mb-3">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-violet-600">Privacy</a></li>
                <li><a href="/" className="hover:text-violet-600">Terms</a></li>
              </ul>
            </div>

          </div>

          {/* RIGHT BRAND */}
          <div className="flex flex-col items-start lg:items-end gap-4 max-w-sm">
            <p className="text-sm text-gray-600 lg:text-right">
              Making every customer feel valued—no matter the size of your audience.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <a href="https://instagram.com/prebuiltui" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5 text-gray-500 hover:text-violet-600 transition" />
              </a>
              <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5 text-gray-500 hover:text-violet-600 transition" />
              </a>
              <a href="https://x.com/prebuiltui" target="_blank" rel="noreferrer">
                <Twitter className="w-5 h-5 text-gray-500 hover:text-violet-600 transition" />
              </a>
              <a href="https://www.youtube.com/@prebuiltui" target="_blank" rel="noreferrer">
                <Youtube className="w-6 h-6 text-gray-500 hover:text-violet-600 transition" />
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              © 2026 <span className="font-medium text-black">ResumeAI</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
