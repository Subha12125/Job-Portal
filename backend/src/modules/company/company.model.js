import mongoose from 'mongoose';

// Define the company schema
// which contains the following fields ->
/* 
    1. name
    2. email
    3. phone
    4. companyLogo
    5. website
    6. description
    7. location
    8. industry
    9. size
    10. owner
*/

const companySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },

    phone:{
        type:String,
        required:true,
        trim:true
    },

    companyLogo:{
        type:String,
        default:""
    },

    website:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    location:{
        type:String,
        default:""
    },

    industry:{
        type:String,
        default:""
    },

    size:{
        type:String,
        default:""
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

}, { timestamps:true });

export const Company = mongoose.model('Company', companySchema);