import {User} from "./user.model.js";

// 1. Create a new user 
// Steps : 1. Validate the request body
//         2. Check if the user already exists
//         3. Create a new user

const createUser = async (userData) => {
    // Validate the request body
    if (!userData.name || !userData.email || !userData.password || !userData.phone) {
        throw new Error("Please provide all required fields");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Create a new user
    const user = User.create(userData);

    // Return user without password
    return await User.findById(user._id).select("-password");
};

// 2. Get a user by email
const getUserByEmail = async (email) => {
    const user = await User.findOne({ email }).select("+password");
    return user;
}

// 3. Get a user by id
const getUserById = async (id) => {
    const user = await User.findOne(id).select("-password");
    
    if(!user) throw new Error("User not exits");

    return user;
};

// 4. Get ALL users
const getAllUsers = async ()=>{
    return await User.find().select("-password");
};


