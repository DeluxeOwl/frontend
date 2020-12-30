function getUser() {
  if (typeof localStorage === "undefined") {
    return false;
  }
  return localStorage.getItem("user");
}

export default getUser;
