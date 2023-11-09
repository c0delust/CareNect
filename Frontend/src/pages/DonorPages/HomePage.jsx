import styles from "./HomePage.module.css";
import UserRegistration from "../../components/DonorComponents/HomePage/UserRegistration.jsx";
import PhotoCarousel from "../../components/DonorComponents/HomePage/PhotoCarousel.jsx";
import ImageHeader from "../../components/DonorComponents/HomePage/ImageHeader.jsx";
import FocusAreas from "../../components/DonorComponents/HomePage/FocusAreas.jsx";
import Footer from "../../components/DonorComponents/Footer.jsx";

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
