import styles from "./HomePage.module.css";
import UserRegistration from "../components/UserRegistration.jsx";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import ImageHeader from "../components/ImageHeader.jsx";
import FocusAreas from "../components/FocusAreas.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  return (
    <>
      <div className={styles.homePage}>
        <UserRegistration />
        <ImageHeader />
        <FocusAreas />
        <PhotoCarousel />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
