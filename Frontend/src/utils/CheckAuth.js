import axios from "axios";

const CheckAuth = async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth/userExists", {
      mode: "cors",
      withCredentials: true,
    });

    const responseData = response.data;

    if (responseData.userData != null) {
      return responseData.userData;
    }

    return null;
  } catch (error) {
    return null;
    // console.log(error);
  }
};

export default CheckAuth;
