function logout() {
    localStorage.removeItem("user");
    location.reload();
  }
