import { registerUser, loginUser } from './auth.service.js';

export const registerController = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result.user,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: result.user,
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const getMeController = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'If the email exists, a password reset link has been sent.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
