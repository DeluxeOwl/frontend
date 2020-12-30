function getUser() {
  if (typeof localStorage === "undefined") {
    return false;
  }
  return JSON.parse(localStorage.getItem("user"));
}

export default getUser;
