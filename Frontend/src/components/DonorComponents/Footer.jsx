import styles from "./Footer.module.css";

const Footer = () => {
  const contactUs = "Contect with Us    ";

  return (
    <>
      <div className={styles.footer_Container}>
        <div className={styles.footerContactInfo}>
          <div className={styles.infoTitle}>
            Contact Us
            <div className={styles.gradientBorder}></div>
          </div>
          <div>
            <b>Phone: </b> 121-325-135-135
          </div>
          <div>
            <b>Email:</b> abc@gmail.com
          </div>
        </div>
        <div className={styles.footerSocialMediaLinks}>
          <div className={styles.infoTitle}>
            Follow Us
            <div className={styles.gradientBorder}></div>
          </div>

          <div>
            <a href="#" target="_blank">
              Facebook
            </a>
          </div>

          <div>
            <a href="#" target="_blank">
              Twitter
            </a>
          </div>

          <div>
            <a href="#" target="_blank">
              Instagram
            </a>
          </div>
        </div>
        <div className={styles.footerContactForm}>
          <div className={styles.infoTitle}>
            Connect with Us
            <div className={styles.gradientBorder}></div>
          </div>
          <form
            action="mailto:carenect.info@gmail.com"
            method="post"
            encType="text/plain"
          >
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required></input>

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              required
              maxLength="250"
            ></textarea>

            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
