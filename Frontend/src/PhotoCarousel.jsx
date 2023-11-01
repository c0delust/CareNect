import styles from "./PhotoCarousel.module.css";

const PhotoCarousel = () => {
  return (
    <>
      <div className={styles.photoCarouselContainer}>
        <img
          src="http://manavkartavya.org/wp-content/uploads/2018/08/children.jpg"
          draggable="false"
        ></img>
      </div>
    </>
  );
};
export default PhotoCarousel;
