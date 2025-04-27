document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn form gửi đi nếu có lỗi

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessages = document.getElementById("errorMessages");

  let errors = [];

  // Kiểm tra email hợp lệ
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Email không hợp lệ.");
  }

  // Kiểm tra mật khẩu
  if (password.length < 8) {
    errors.push("Mật khẩu phải có độ dài tối thiểu 8 ký tự.");
  }

  // Hiển thị lỗi hoặc gửi form
  if (errors.length > 0) {
    errorMessages.innerHTML = errors.join("<br>");
  } else {
    errorMessages.innerHTML = "";
    alert("Đăng nhập thành công!");
    // Thực hiện gửi form (nếu cần)
    // this.submit();
  }
});