import styles from "./AboutUsPage.module.css";
import Footer from "../../components/DonorComponents/Footer.jsx";

const AboutUs = () => {
  return (
    <>
      <div className={styles.aboutusPageContainer}>
        <div className={styles.contentRow}>
          <div className={styles.contentRowText}>
            <div className={styles.contentRowTextTitle}>
              Our Mission & Vision
            </div>
            <div className={styles.contentRowTextContent}>
              CareNect is dedicated to fostering a compassionate community by
              seamlessly connecting NGOs, donors, and individuals. Our mission
              is to create a transparent and responsive system, ensuring
              everyone has access to needed assistance. We envision a world
              where communication and aid distribution are efficient and
              effective, backed by rigorous verification processes conducted by
              local NGOs. Together, we aspire to build a brighter future marked
              by trust, accountability, and universal access to support.
            </div>
          </div>
          <div className={styles.contentRowImage}>
            <img src="https://i.imgur.com/j0cTf74.jpeg" alt="" />
          </div>
        </div>
        <div className={styles.contentRow}>
          <div className={styles.contentRowImage}>
            <img
              src="https://www.shutterstock.com/image-illustration/creative-illustration-blue-round-shaped-600nw-2287676475.jpg"
              alt=""
            />
          </div>
          <div className={styles.contentRowText}>
            <div className={styles.contentRowTextTitle}>Our Aim</div>
            <div className={styles.contentRowTextContent}>
              • Efficient Aid Distribution: Visualize geographical locations of
              individuals in need for transparent and effective aid
              distribution. <br />• Privacy and Security: Ensure the privacy and
              security of individuals while effectively communicating their
              needs to potential donors. <br /> • Transparent NGO Engagement:
              Empower NGOs with profiles to showcase their work, fostering
              direct connections with donors and those in need. <br />•
              Efficient Communication: Facilitate direct communication between
              donors and NGOs for prompt and targeted aid delivery.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
