export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validatePhone = (phone) => {
  // Simple validation for phone numbers (e.g. 10 digits)
  const re = /^\+?[1-9]\d{1,14}$|^[0-9]{10}$/;
  return re.test(String(phone));
};
