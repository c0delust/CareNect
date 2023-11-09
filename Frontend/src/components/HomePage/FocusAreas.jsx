import styles from "./FocusAreas.module.css";

const FocusAreas = () => {
  return (
    <>
      <div className={styles.focusAreaContainer}>
        <div className={styles.focusAreaTitle}>Our Focus Areas</div>
        <div className={styles.focusTileContainer}>
          <div className={styles.focusAreaTileContainer}>
            <div className={styles.focusAreaTile}>
              <div className={styles.tileImg}>
                <img src="https://i.ibb.co/f1CTTQD/Empower-NGO.jpg" />
              </div>
              <div className={styles.titleTitle}>Empower NGOs</div>
              <div className={styles.titleDescription}>
                Your donations directly empower NGOs, enabling them to make a
                lasting impact on the lives of those in need.
              </div>
            </div>
          </div>
          <div className={styles.focusAreaTileContainer}>
            <div className={styles.focusAreaTile}>
              <div className={styles.tileImg}>
                <img src="https://i.ibb.co/y4nHH98/Transform-Lives.jpg" />
              </div>
              <div className={styles.titleTitle}>Transform Lives</div>
              <div className={styles.titleDescription}>
                Your contributions play a crucial role in transforming lives and
                communities, bringing hope to those in need.
              </div>
            </div>
          </div>
          <div className={styles.focusAreaTileContainer}>
            <div className={styles.focusAreaTile}>
              <div className={styles.tileImg}>
                <img src="https://i.ibb.co/WsgRnwy/maximize-impact.jpg" />
              </div>
              <div className={styles.titleTitle}>Maximize Your Impact</div>
              <div className={styles.titleDescription}>
                CareNect enhances the effectiveness of your donations, ensuring
                that every dollar goes further to make a difference.
              </div>
            </div>
          </div>

          <div className={styles.focusAreaTileContainer}>
            <div className={styles.focusAreaTile}>
              <div className={styles.tileImg}>
                <img src="https://i.ibb.co/HGVdR77/Community-Engagment-jpeg.jpg" />
              </div>
              <div className={styles.titleTitle}>Community Engagement</div>
              <div className={styles.titleDescription}>
                Be part of a caring donor community, connecting with like-minded
                individuals to create a better world for all.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FocusAreas;
