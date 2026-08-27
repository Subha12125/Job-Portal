// Import database interaction methods from user.service.js
import {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUserProfile,
} from './user.service.js';

/**
 * Controller: Create a new user account manually
 * Handles POST request to create a user with provided body payload
 */
export const createUserController = async (req, res) => {
  try {
    // Pass the incoming user form data to our service layer
    const user = await createUser(req.body);
    // Return HTTP 201 (Created) with the newly created user data
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    // If validation fails or user exists, return HTTP 400 (Bad Request)
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Controller: Get a single user by their unique MongoDB ID
 * Handles GET request with ID parameter (e.g., /api/user/60d21b4667d0d8992e610c85)
 */
export const getUserByIdController = async (req, res) => {
  try {
    // Look up user using the ID from route URL parameters
    const user = await getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    // Return 404 (Not Found) if user does not exist
    res.status(404).json({ success: false, message: err.message });
  }
};

/**
 * Controller: Get user details using their email address
 * Handles GET request with email parameter (e.g., /api/user/email/john@example.com)
 */
export const getUserByEmailController = async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/**
 * Controller: Get a list of all registered users
 * Typically accessed by Admin users to view all platform accounts
 */
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Controller: Update profile of the currently logged-in user
 * Pulls userId directly from req.user (populated by auth middleware JWT token)
 */
export const updateProfileController = async (req, res) => {
  try {
    // Extract authenticated user ID attached by JWT auth middleware
    const userId = req.user._id;
    
    // Update user profile fields (bio, skills, experience, location, etc.)
    const updatedUser = await updateUserProfile(userId, req.body);
    
    res.status(200).json({ success: true, data: updatedUser, user: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};