import { useEffect, useState } from "react";
import styles from "./StatusCard.module.css";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";

const StatusCard = ({ color, heading, image }) => {
  const [count, setCount] = useState(0);

  const getCount = async () => {
    try {
      const response = await axios.get(
        BACKEND_URL + "/ngo/getCount?heading=" + heading,
        {
          mode: "cors",
          withCredentials: true,
        }
      );

      setCount(response.data.count);
    } catch (error) {}
  };
  useEffect(() => {
    getCount();
  }, []);

  return (
    <>
      <div className={styles.statusCardContainer} style={{ background: color }}>
        <div className={styles.content}>
          <div className={styles.count}>{count}</div>
          <div className={styles.heading}>{heading}</div>
        </div>
        <div className={styles.assetContainer}>
          <img src={image} width="80px"></img>
        </div>
      </div>
    </>
  );
};

export default StatusCard;
