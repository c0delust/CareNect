import styles from "./NGOInfoCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";

const NGOInfoCard = ({ ngo }) => {
  return (
    <>
      <div className={styles.NGOInfoCardContainer}>
        <div className={styles.logoContainer}>
          <img src={ngo.logoUrl} alt="NGO Logo" className={styles.logoImg} />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            {ngo.name}{" "}
            <span
              style={{
                fontWeight: "normal",
                color: "var(--color1-extralight)",
                fontSize: "18px",
                opacity: "0.8",
              }}
            >
              {" "}
              |
            </span>{" "}
            <span className={styles.type}> {ngo.type}</span>
          </div>

          <div className={styles.parentOrganization}>
            Parent Organization: {ngo.parentOrganization}
          </div>

          <div className={styles.description}>{ngo.description}</div>

          <div className={styles.address}>
            {" "}
            <span className={styles.iconContainer}>
              {" "}
              <PlaceIcon />
            </span>
            {ngo.address}
          </div>

          <div className={styles.website}>
            {" "}
            <span className={styles.iconContainer}>
              {" "}
              <LanguageIcon />
            </span>
            <a href={ngo.website}>{ngo.website}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NGOInfoCard;
