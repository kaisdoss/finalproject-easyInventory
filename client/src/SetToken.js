import axios from "axios";

export const SetToken = () => {
  let token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};
export default SetToken;
