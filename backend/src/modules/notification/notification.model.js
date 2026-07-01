import mongoose from "mongoose";

/**
 * 1. reciver
 * 2. title
 * 3. message
 * 4. isRead
 * 5. createdAt
 */

const notificationSchema = new mongoose.Schema({
    reciver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    isRead:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps:true });    

export const Notification = mongoose.model("Notification", notificationSchema);