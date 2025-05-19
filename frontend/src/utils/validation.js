// Email validation
export const validateEmail = (email) => {
  if (!email) {
    return "Enter your Email";
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  // Domain validation (optional)
  const domain = email.split("@")[1];
  if (domain) {
    // Check for common typos in popular domains
    if (
      domain === "gmail.con" ||
      domain === "gmial.com" ||
      domain === "gmal.com"
    ) {
      return "Did you mean gmail.com?";
    }
    if (domain === "yaho.com" || domain === "yahooo.com") {
      return "Did you mean yahoo.com?";
    }
    if (domain === "hotmial.com" || domain === "hotmal.com") {
      return "Did you mean hotmail.com?";
    }
  }

  return "";
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return "Enter your Password";
  }

  const validations = [];

  if (password.length < 8) {
    validations.push("Password must be at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    validations.push("Include at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    validations.push("Include at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    validations.push("Include at least one number");
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    validations.push("Include at least one special character");
  }

  return validations.length > 0 ? validations[0] : "";
};

// Password strength calculation
export const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Character variety checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 1;

  // Return a value between 0 and 4
  return Math.min(4, Math.floor(strength / 1.5));
};

// Name validation
export const validateName = (name) => {
  if (!name) {
    return "Enter your name";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters";
  }

  if (/[0-9]/.test(name)) {
    return "Name should not contain numbers";
  }

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(name)) {
    return "Name should not contain special characters";
  }

  return "";
};

// Mobile number validation
export const validateMobile = (mobile) => {
  if (!mobile) {
    return "Enter your Contact Number";
  }

  // Remove spaces, dashes, and parentheses for validation
  const cleanedNumber = mobile.replace(/[\s\-()]/g, "");

  // Check if it's numeric
  if (!/^\+?[0-9]+$/.test(cleanedNumber)) {
    return "Phone number should contain only digits";
  }

  // Check length (international numbers can vary, but typically between 8 and 15 digits)
  if (cleanedNumber.length < 8 || cleanedNumber.length > 15) {
    return "Please enter a valid phone number";
  }

  return "";
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Confirm Password";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};
