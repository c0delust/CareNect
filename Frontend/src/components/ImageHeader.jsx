import styles from "./ImageHeader.module.css";

const ImageHeader = () => {
  return (
    <>
      <div className={styles.imageHeader}>
        <div className={styles.tagline}>
          Donate, <br /> Connect & Transform
        </div>
        {/* <img src="https://i.ibb.co/bXGbL3s/4527960c-adb3-4d4f-b3dd-20e75ad1d06e.jpg" /> */}
      </div>
    </>
  );
};

export default ImageHeader;
