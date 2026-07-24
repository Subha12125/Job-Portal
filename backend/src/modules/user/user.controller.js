import { createUser, getUserById, getUserByEmail, getAllUsers } from './user.service.js';


// 1. Create a new user
export const createUserController = async(req, res) => {
    try{
        const user = await createUser(req.body);
        res.status(201).json({success:true, data:user});
    } catch(err){
        res.status(400).json({success:false, message:err.message});
    }
}

// 2. Get a user by id
export const getUserByIdController = async(req, res) => {
    try{
        const user = await getUserById(req.params.id);
        res.status(200).json({success:true, data:user});
    } catch(err){
        res.status(404).json({success:false, message:err.message});
    }
}

// 3. Get a user by email
export const getUserByEmailController = async(req, res) => {
    try{
        const user = await getUserByEmail(req.params.email);
        res.status(200).json({success:true, data:user});
    } catch(err){
        res.status(404).json({success:false, message:err.message});
    }
}

// 4. Get ALL users
export const getAllUsersController = async(req, res) => {
    try{
        const users = await getAllUsers();
        res.status(200).json({success:true, data:users});
    } catch(err){
        res.status(404).json({success:false, message:err.message});
    }
}    