const data = {
  username() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1];

    if (!cookieValue) {
      return "";
    }

    return cookieValue;
  },
  setUsername(s) {
    document.cookie = `username=${s}; SameSite=None;`;
  },
};

export default data;
