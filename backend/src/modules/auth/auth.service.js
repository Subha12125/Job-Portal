import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';
import { config } from '../../config/env.js';

export const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

export const registerUser = async (userData) => {
  const { name, email, password, phone, role } = userData;

  if (!name || !email || !password || !phone) {
    throw new Error('Please provide all required fields');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'candidate'
  });

  const token = generateToken(user._id);

  const userObject = user.toObject();
  delete userObject.password;

  return { user: userObject, token };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  const userObject = user.toObject();
  delete userObject.password;

  return { user: userObject, token };
};
