import styles from "./PhotoCarousel.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PhotoCarousel = () => {
  return (
    <>
      <div className={styles.photoCarouselContainer}>
        <Carousel
          swipeable={true}
          emulateTouch={true}
          infiniteLoop={true}
          dynamicHeight={false}
          autoPlay={true}
          showStatus={false}
        >
          <div className={styles.carouselImage}>
            <img
              src="https://i.ibb.co/py4Q2Qg/Second.png"
              // src="http://manavkartavya.org/wp-content/uploads/2018/08/children.jpg"
              loading="lazy"
              draggable="false"
            />
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div className={styles.carouselImage}>
            <img
              src="https://i.ibb.co/mR7cYPZ/First.png"
              // src="https://www.pwc.com/gx/en/brand-simplified/hero-images-1600/people/damil-1138450812-1600.jpg"
              loading="lazy"
              draggable="false"
            />
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div className={styles.carouselImage}>
            <img
              src="https://i.ibb.co/TPVRWfb/Third.png"
              // src="https://www.smilefoundationindia.org/blog/wp-content/uploads/2022/11/Education-in-india-1024x606-1.jpg"
              loading="lazy"
              draggable="false"
            />
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>
      </div>
    </>
  );
};
export default PhotoCarousel;
