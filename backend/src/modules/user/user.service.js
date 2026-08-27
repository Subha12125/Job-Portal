// Import the User model schema to perform MongoDB queries
import { User } from './user.model.js';

/**
 * Service: Creates a new user record in the database.
 * Checks for mandatory fields and ensures email uniqueness.
 */
export const createUser = async (userData) => {
  // Validate basic required credentials
  if (!userData.name || !userData.email || !userData.password || !userData.phone) {
    throw new Error('Please provide all required fields');
  }

  // Ensure no duplicate user exists with the same email
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Save the new user document (password will automatically be hashed by Mongoose pre-save hook)
  const user = await User.create(userData);

  // Return the newly created user without exposing the password hash
  return await User.findById(user._id).select('-password');
};

/**
 * Service: Retrieves a user by their email address.
 */
export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  return user;
};

/**
 * Service: Retrieves a user by their unique database ID.
 * Omits the password field for security.
 */
export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

/**
 * Service: Retrieves all registered users from the system.
 */
export const getAllUsers = async () => {
  return await User.find().select('-password');
};

/**
 * Service: Updates profile fields for a user.
 * Strips password field to prevent unauthorized password overwrites.
 */
export const updateUserProfile = async (userId, updateData) => {
  // Prevent password updates through general profile update calls
  delete updateData.password;

  // Find user by ID and apply new fields, returning the updated document
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) throw new Error('User not found');
  return user;
};

