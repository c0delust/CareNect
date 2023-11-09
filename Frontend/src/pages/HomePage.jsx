import styles from "./HomePage.module.css";
import UserRegistration from "../components/HomePage/UserRegistration.jsx";
import PhotoCarousel from "../components/HomePage/PhotoCarousel.jsx";
import ImageHeader from "../components/HomePage/ImageHeader.jsx";
import FocusAreas from "../components/HomePage/FocusAreas.jsx";
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
