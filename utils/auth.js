function isAuthenticated() {
  if (typeof localStorage === "undefined") {
    return false;
  }

  return localStorage.getItem("auth") !== null;
}

export default isAuthenticated;
