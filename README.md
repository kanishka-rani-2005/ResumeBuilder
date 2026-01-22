# 🚀 AI Resume Builder

An intelligent, full-stack platform that transforms the way job seekers create resumes. By leveraging **Llama-3 via Groq**, this app provides near-instant data extraction and professional content enhancement.



## 🌐 Live Demo
Check out the deployed application here: 
**[Resume Builder Live](https://resume-builder-nine-umber.vercel.app?_vercel_share=uJDHezBd5zEMjSqWP2zW2hwhmzdjK739)**

---

## ✨ Features

- **🧠 Instant Resume Parsing:** Extract names, contact info, experience, and education from raw text into structured data using Groq's LPU™ Inference Engine.
- **✍️ AI Summary Enhancer:** Turn basic summaries into high-impact, professional narratives designed for executive roles.
- **🛠️ ATS-Driven Job Descriptions:** Automatically rewrites bullet points using the STAR method and action-oriented verbs.
- **📄 Dynamic Templates:** Professional, clean, and ATS-friendly layouts that ensure your resume passes through screening software.
- **🔐 Secure Persistence:** Save, edit, and manage multiple resumes with a secure MongoDB backend.

---

## 🛠️ Tech Stack

### Backend (The Brain)
- **Node.js & Express:** Robust server architecture.
- **Groq API (Llama-3.3-70b):** Ultra-fast inference for resume parsing and enhancement.
- **MongoDB & Mongoose:** Scalable NoSQL database for resume storage.

### Frontend (The Face)
- **React.js (Vite):** Fast, modern UI development.
- **Tailwind CSS:** Responsive and clean professional styling.
- **Axios:** Streamlined API communication between client and server.

---

## 🚀 Installation & Local Setup

### 1. Clone the repo
```bash
git clone 
cd resume-builder

```

### 2. Configure Backend
```bash
cd server
npm install
```



### 3. Create a .env file in the /server folder:
```bash
JWT_SECRET=''
MONGODB_URI=''
IMAGEKIT_PRIVATE_KEY=''
OPENAI_BASE_URL=''
OPENAI_MODEL=llama-3.3-70b-versatile
GROQ_API_KEY=''
```




### 4. Configure Frontend
```bash
cd ../client
npm install
npm run dev
```

Developed with ❤️ by Kanishka Rani
