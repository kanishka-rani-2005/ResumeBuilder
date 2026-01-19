
import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";

//controller for creating, fetching, updating, deleting resumes

//Post :/api/resumes/create
export const createResume=async (req,res)=>{
    try{
        const userId=req.userId;
        const {title}=req.body ;

        const newResume=await Resume.create({userId,title})
        return res.status(201).json({message:"Resume created successfully",resume:newResume} );

    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}


//Delete :/api/resumes/delete

export const deleteResume=async (req,res)=>{
    try{
        const userId=req.userId;
        const {resumeId}=req.params ;

        const deleted=await Resume.findOneAndDelete({ userId,_id: resumeId });
        if (!deleted) {
        return res.status(404).json({ message: "Resume not found" });
        }
        return res.status(201).json({message:"Resume deleted successfully"} );
    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}


//get resume by id
//GET :/api/resumes/get

export const getResumeById=async (req,res)=>{
    try{
        const userId=req.userId;
        const {resumeId}=req.params ;

        const resume=await Resume.findOne({ userId,_id: resumeId });
        if(!resume){
            return res.status(404).json({message:"Resume not found"} );
        }
        resume.__v=undefined;//hide __v in response
        resume.createdAt=undefined;//hide createdAt in response
        resume.updatedAt=undefined;//hide updatedAt in response

        return res.status(201).json({resume} );
    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}
   

//GET:/api/resumes/public

export const getPublicResumes=async (req,res)=>{
    try{
        const {resumeId}=req.params;
        const resume=await Resume.findOne({
            public:true,_id:resumeId
        })
        if(!resume){
            return res.status(404).json({message:"Resume not found or not public"});
        }
        return res.status(200).json({resume});

    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}

//PUT :/api/resumes/update

export const updateResume=async (req,res)=>{
    try{
        const userId=req.userId;
        const {resumeId,resumeData,removeBackground,accentColor}=req.body ;
        if(!resumeId){
        return res.status(400).json({ message: "resumeId is required" });
        }
        const image=req.file;


        let resumeDataCopy ;
        if(typeof resumeData==='string'){
            resumeDataCopy=await JSON.parse(resumeData);
        }else{
            resumeDataCopy=structuredClone(resumeData)
        }
       
        // console.log(removeBackground)

        if(image){
            const imageBufferData=fs.createReadStream(image.path);
            //upload image to imagekit
                const bgColor = accentColor ? accentColor.replace("#", "") : "000000";

                const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: "resume.png",
                folder: "user-resumes",
                transformation: {
                pre:
                "w-300,h-300,fo-face,z-0.75" +
                (removeBackground ? `,e-bgremove,bg-${bgColor}` : ""),
                },
                });
                resumeDataCopy.personal_info.image=response.url;
        }


        
        const resume=await Resume.findOneAndUpdate({ userId,_id: resumeId },resumeDataCopy,{new:true} );
        return res.status(201).json({message:"Resume updated successfully",resume} );
    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}

