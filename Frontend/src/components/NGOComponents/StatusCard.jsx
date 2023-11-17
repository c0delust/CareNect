import styles from "./StatusCard.module.css";

const StatusCard = ({ color, heading, image }) => {
  const count = 1000;

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
