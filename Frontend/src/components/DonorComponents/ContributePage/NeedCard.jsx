import styles from "./NeedCard.module.css";

const NeedCard = ({ needData }) => {
  return (
    <>
      <div className={styles.needCardContainer}>
        <div className={styles.needCard}>
          <div className={styles.needImageContainer}>
            <img src={needData.needImage} />
          </div>
          <div className={styles.needContent}>
            <div className={styles.needCardCategory}>{needData.category}</div>
            <div className={styles.needCardTitle}>{needData.title}</div>
            <div className={styles.needCardQuantity}>{needData.quantity}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NeedCard;
