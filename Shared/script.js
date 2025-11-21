document.addEventListener("DOMContentLoaded", () => {

  
  const toggleBtn = document.getElementById("toggleBtn");
  const sidePanel = document.getElementById("sidePanel");
  const icons = document.getElementById("icons");
  const bgLogo = document.getElementById("bgLogo");
  const message = document.getElementById("message");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidePanel.classList.toggle("open");
      icons.classList.toggle("move-left");
      bgLogo.classList.toggle("move-left");
      document.body.classList.toggle("move-left");
      toggleBtn.classList.toggle("move-left");
      toggleBtn.classList.toggle("opened");
    });
  }

  
  if (!localStorage.getItem("users")) {
    const initialUsers = {
      "Gabriel": { password: "abcd", role: "admin" },
      "Zedrick": { password: "abcd", role: "admin" },
      "Rolle": { password: "abcd", role: "user" },
      "Nat": { password: "abcd", role: "admin" }
    };
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }

  
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  
  window.registerUser = function() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      message.style.color = "red";
      message.innerText = "Please fill in both fields.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
      message.style.color = "red";
      message.innerText = "Username already exists.";
      return;
    }

    users[username] = {
      password: password,
      role: "user"
    };

    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.innerText = "Account created! You can now sign in.";

    usernameInput.value = "";
    passwordInput.value = "";
  };

  
  window.manualLogin = function() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!username || !password) {
      message.style.color = "red";
      message.innerText = "Please fill in both fields.";
      return;
    }

    if (!users[username]) {
      message.style.color = "red";
      message.innerText = "Username not found.";
      return;
    }

    if (users[username].password !== password) {
      message.style.color = "red";
      message.innerText = "Incorrect password.";
      return;
    }

    message.style.color = "green";
    message.innerText = "Login successful! Redirecting...";

  
    localStorage.setItem("currentUser", JSON.stringify({
      username: username,
      role: users[username].role
    }));

    setTimeout(() => {
      if (users[username].role === "admin") {
        window.location.href = "AdminPages/AdminHome.html";
      } else {
        window.location.href = "Pages/Homepage.html";
      }
    }, 1000);
  };


  const resetModal = document.getElementById("resetModal");
  const resetUsernameInput = document.getElementById("resetUsername");
  const newPasswordInput = document.getElementById("newPassword");
  const resetMessage = document.getElementById("resetMessage");

  window.openResetModal = function() {
    resetModal.style.display = "flex";
  };

  window.closeResetModal = function() {
    resetModal.style.display = "none";
    resetMessage.innerText = "";
    resetUsernameInput.value = "";
    newPasswordInput.value = "";
  };

  window.resetPassword = function() {
    const username = resetUsernameInput.value.trim();
    const newPassword = newPasswordInput.value.trim();

    if (!username || !newPassword) {
      resetMessage.style.color = "red";
      resetMessage.innerText = "Please fill in all fields.";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
      resetMessage.style.color = "red";
      resetMessage.innerText = "Username not found.";
      return;
    }

    users[username].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    resetMessage.style.color = "green";
    resetMessage.innerText = "Password reset successfully!";

    setTimeout(() => {
      closeResetModal();
    }, 1200);
  };

  
  window.checkLogin = function(redirect = true) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser && redirect) {
      window.location.href = "../index.html";
    }
    return currentUser;
  };

});
