import mongoose from "mongoose";

/**
 * 1. job
 * 2. candidate
 * 3. resume
 * 4. coverLetter
 * 5. status
 * 6. appliedAt
 */
const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    resume:{
        type:String,
        default:""
    },

    coverLetter:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:["applied", "shortlisted", "rejected", "hired"],
        default:"applied",
        required:true
    },

    appliedAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);