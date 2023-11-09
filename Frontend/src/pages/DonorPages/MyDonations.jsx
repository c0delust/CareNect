import styles from "./MyDonations.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CheckAuth from "../../utils/CheckAuth";

const MyDonations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await CheckAuth();
      console.log(response);
    };
    checkAuth();
  }, []);

  return (
    <>
      <div className={styles.ourPartnersPage}>No Donations Yet</div>
    </>
  );
};

export default MyDonations;
