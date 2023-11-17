import styles from "./AboutUsPage.module.css";

const AboutUs = () => {
  return (
    <>
      <div className={styles.aboutusPage}>
        <div className={styles.cards_container}>
          <div className={styles.card}>
            <h2>Our Mission</h2>
            <p>
              We are dedicated to connecting NGOs, donors, and individuals to
              create a transparent and responsive system for aiding those in
              need.{" "}
            </p>
          </div>
          <div className={styles.card}>
            <h2>Our Vision</h2>
            <p>
              We envision a world where everyone has access to the help they
              need and where communication and aid distribution are efficient.
            </p>
          </div>
          <div className={styles.card}>
            <h2>Our Values</h2>
            <p>
              Our core values include transparency, efficiency, and empathy. We
              are committed to making a positive impact on people's lives.{" "}
            </p>
          </div>
        </div>
        <div className={styles.aim_section}>
          <div className={styles.aim_text}>
            <h2>Our Aim</h2>
            <ol>
              <li>Efficient Aid Distribution</li>
              <p>
                Facilitate efficient and transparent aid distribution by
                visually representing the geographical locations of individuals
                in need on a map.
              </p>
              <li>Privacy and Security</li>
              <p>
                Maintain the privacy and security of individuals in need while
                ensuring their needs are effectively communicated to potential
                donors.
              </p>
              <li>Transparent NGO Engagement</li>
              <p>
                Enable NGOs to create profiles, showcase their work, and connect
                directly with donors or needy individuals.
              </p>
              <li>Efficient Communication</li>
              <p>
                Facilitate direct communication between donors and NGOs for
                prompt aid delivery.
              </p>
            </ol>
          </div>
          <div className={styles.aim_image}>
            <img src="https://i.ibb.co/MPx0mZq/logo.png" alt="Our Aim Image" />
          </div>
        </div>
        <div className={styles.scroll_section} id="autoScrollSection">
          <div className={styles.scroll_content} id="scrollContent">
            <h1>Our Purpose</h1>
            <p>
              Connecting NGOs, donors, and those in need via a user_friendly web
              platform, creating transparency in aid distribution.
            </p>
            <h2>Scope of Work</h2>
            <ul>
              <li>Centralized NGO database and profiles.</li>
              <li>Two login interfaces for NGOs and donors/individuals.</li>
              <li>Clearly categorizing individual needs.</li>
              <li>Facilitating direct donations and inquiries.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
