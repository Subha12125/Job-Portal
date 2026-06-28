import mongoose from "mongoose";

// define the job schema
// which contains the following fields ->
/* 
    1. title
    2. description
    3. company
    4. createdBy
    5. location
    6. jobType
    7. experience
    8. salaryMin
    9. salaryMax
    10. skills
    11. openings
    12. applicationDeadline
    13. status
*/

const jobSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
    },

    description:{
      type:String,
      required:true,
    },

    company:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Company",
      required:true,
    },

    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },

    location:{
      type:String,
      required:true,
    },

    jobType:{
      type:String,
      enum:["Full-Time", "Part-Time", "Internship", "Contract", "Remote"],
      required:true,
    },

    experience:{
      type:Number,
      default:0,
    },

    salaryMin:{
      type:Number,
    },

    salaryMax:{
      type:Number,
    },

    skills:[
      {
        type:String,
      },
    ],

    openings:{
      type:Number,
      default:1,
    },

    applicationDeadline:{
      type:Date,
    },

    status:{
      type:String,
      enum:["open", "closed"],
      default:"open",
    },
  },{ timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);