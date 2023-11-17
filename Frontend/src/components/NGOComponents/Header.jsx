import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import dashboardIcon from "../../assets/dashboardIcon.png";
import Cookie from "js-cookie";

const Header = () => {
  const logout = () => {
    Cookie.remove("token", { path: "/ngo" });
    window.location.reload(false);
  };

  return (
    <>
      <div className={`${styles.navBar}`}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src={logo} />
          </div>
          <div className={styles.title}>NGO Dashboard</div>

          <span style={{ marginLeft: "auto" }}>
            {Cookie.get("token") && (
              <div className={styles.icon} onClick={logout}>
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/website-icons/logout-8.png"
                  width="25px"
                />
                <span>Logout</span>
              </div>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
