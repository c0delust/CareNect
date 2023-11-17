import axios from "axios";
import { BACKEND_URL } from "./constants";

const CheckDonorAuth = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/donor/getDonor`, {
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

export default CheckDonorAuth;
