import mongoose from 'mongoose';

// Define the user schema
// which contains the following fields ->
/* 
    1. name
    2. email
    3. password
    4. phone
    5. role
    6. profileImage
    7. resume
    8. skills
    9. bio
    10. headline
    11. experience
    12. education
    13. location
    14. isVerified
*/

const userSchema = new mongoose.Schema({
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

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },

    phone:{
        type:String,
        required:true,
        trim:true
    },

    role:{
        type:String,
        enum:["candidate", "recruiter", "admin"],
        default:"candidate"
    },

    profileImage:{
        type:String,
        default:""
    },

    resume:{
        type:String,
        default:""
    },

    skills:[
        {type:String}
    ],

    bio:{
        type:String,
        default:""
    },

    headline:{
        type:String,
        default:""
    },

    bio:{
        type:String,
        default:""
    },

    experience:{
        type:String,
        default:""
    },

    education:{
        type:String,
        default:""
    },

    location:{
        type:String,
        default:""
    },

    isVerified:{
        type:Boolean,
        default:false
    },
}, { timestamps:true });

export const User = mongoose.model('User', userSchema);