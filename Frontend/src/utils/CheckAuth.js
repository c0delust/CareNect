import axios from "axios";

const CheckAuth = async () => {
  try {
    const response = await axios.get("http://localhost:3000/donor/getDonor", {
      mode: "cors",
      withCredentials: true,
    });

    const responseData = response.data;

    if (!responseData) {
      return null;
    }

    return responseData;
  } catch (error) {
    return null;
  }
};

export default CheckAuth;
