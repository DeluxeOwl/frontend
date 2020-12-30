function logout() {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
}

export default logout;
