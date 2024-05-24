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

export function isValidUsername(username) {
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
  isValid = true;
  message = null;
  if (username.length < 8 || username.length > 30) {
    message = "Username phải chứa từ 8 đến 29 ký tự";
    isValid = false;
  }
  else if (!usernameRegex.test(username)) {
    message = `Username chỉ được chứa chữ cái, số và dấu "_".`;
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
