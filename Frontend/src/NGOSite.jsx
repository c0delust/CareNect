import react from "react";
import Header from "./components/NGOComponents/Header";
import DashboardPage from "./pages/NGOPages/DashboardPage.jsx";
import styles from "./NGOSite.module.css";

const NGOSite = () => {
  return (
    <>
      <div className={styles.NGOSiteContainer}>
        <Header />
        <DashboardPage />
      </div>
    </>
  );
};

export default NGOSite;
