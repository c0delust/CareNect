import LoginForm from "../../components/NGOComponents/LoginForm";
import styles from "./DashboardPage.module.css";
import { useState, useEffect } from "react";
import CheckNGOAuth from "../../utils/CheckNGOAuth";
import NGOInfoCard from "../../components/NGOComponents/NGOInfoCard.jsx";
import StatusCard from "../../components/NGOComponents/StatusCard.jsx";
import DoneeDataTable from "../../components/NGOComponents/DoneeDataTable.jsx";
import Cookie from "js-cookie";
import * as JWT from "jwt-decode";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      setUser(await CheckNGOAuth());
    };
    checkAuth();

    const token = Cookie.get("token");

    if (token) {
      const decodedToken = JWT.jwtDecode(token);
      setTokenExpiration(decodedToken.exp * 1000);
      const timeToRefresh = decodedToken.exp * 1000 - Date.now();
      console.log(timeToRefresh);
      setTimeout(() => {
        Cookie.remove("token", { path: "/ngo" });
        window.location.reload();
      }, timeToRefresh);
    }
  }, []);

  return (
    <>
      {/* <div className={styles.dashboardContainer}>
        {user ? <NGOInfoCard ngo={user} /> : <LoginForm />}
      </div> */}

      {user ? (
        <div className={styles.dashboardContainer}>
          <div className={styles.infoRow}>
            <NGOInfoCard ngo={user} />
          </div>

          <div className={styles.statusCardRow}>
            <StatusCard
              // color={"#7367f0"}
              color={"#5bc0eb"}
              heading={"Total Donees"}
              image={"https://simpleicon.com/wp-content/uploads/multy-user.png"}
            />
            <StatusCard
              // color={"#00bcd4"}
              color={"#9bc53d"}
              heading={"Verified Donees"}
              image={
                "https://img.icons8.com/?size=256&id=7NeTR0fCAOdr&format=png"
              }
            />
            <StatusCard
              // color={"#ff9800"}
              color={"#ff5a5f"}
              heading={"Total Needs"}
              image={
                "https://img.icons8.com/?size=256&id=bGZAaBFybzhM&format=png"
              }
            />
            <StatusCard
              // color={"#e91e63"}
              color={"#9bc53d"}
              heading={"Verified Needs"}
              image={
                "https://img.icons8.com/?size=256&id=CiRY7D6pnanH&format=png"
              }
            />
          </div>

          <DoneeDataTable />
        </div>
      ) : (
        <div className={styles.dashboardContainerWithBackground}>
          <LoginForm />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
