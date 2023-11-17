import axios from "axios";
import { BACKEND_URL } from "./constants";
import Cookie from "js-cookie";

const CheckNGOAuth = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/ngo/getNGO`, {
      mode: "cors",
      withCredentials: true,
    });

    const responseData = response.data;

    if (!responseData) {
      Cookie.remove("token", { path: "/ngo" });
      return null;
    }

    return responseData;
  } catch (error) {
    // window.location.reload(false);
    Cookie.remove("token", { path: "/ngo" });
    return null;
  }
};

export default CheckNGOAuth;
