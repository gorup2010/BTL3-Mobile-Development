export function isValidEmail(email) {
  // Define the regular expression pattern for a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValid = true;
  message = null;
  // Test the email against the regular expression
  if (!emailRegex.test(email)) {
    message = "Email không hợp lệ";
    isValid = false;
  }
  return { isValid, message };
}

export function isValidPassword(password, confirmedPassword) {
  isValid = true;
  message = null;
  isValidConfirm = true;
  confirmMessage = null;
  if (password.length < 6) {
    isValid = false;
    message = "Mật khẩu phải chứa ít nhất 6 ký tự";
  }
  if (confirmedPassword && password !== confirmedPassword) {
    isValidConfirm = false;
    confirmMessage = "Mật khẩu không trùng khớp";
  }
  return { isValid, message, isValidConfirm, confirmMessage };
}
