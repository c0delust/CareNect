import styles from "./OurPartners.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const OurPartners = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data/getNGOs", {
        mode: "cors",
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {}
  };

  fetchData();

  useEffect(() => {}, []);

  return (
    <>
      <div className={styles.ourPartnersPage}>
        {/* {data} */}
        {data.map((item) => (
          <div className={styles.ngoCard}>
            <div className={styles.ngoCardContentImg}>
              <img src={item["logoUrl"]} />
            </div>
            <div>
              {" "}
              <div>
                <b>Registration No: </b>
                {item["registrationNo"]}
              </div>
              <div>
                <b>Name: </b>
                {item["name"]}
              </div>
              <div>{item["description"]}</div>
              <div>
                <b>Type: </b>Type: {item["type"]}
              </div>
              <div>
                <b>Address: </b>Address: {item["address"]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OurPartners;
