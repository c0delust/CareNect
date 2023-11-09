import styles from "./ContributePage.module.css";
import SearchBar from "../components/ContributePage/SearchBar";
import NeedCard from "../components/ContributePage/NeedCard";
import { useEffect, useState } from "react";
import axios from "axios";
import EastIcon from "@mui/icons-material/East";
import { TailSpin, ThreeDots } from "react-loader-spinner";

const ContributePage = () => {
  const [originalNeeds, setOriginalNeeds] = useState([]);
  const [filteredNeeds, setFilteredNeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [loadCount, setLoadCount] = useState(8);

  const fetchNeeds = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/data/getNeeds?count=" + loadCount,
        {
          mode: "cors",
          withCredentials: true,
        }
      );
      const data = response.data.map((item, index) => {
        return <NeedCard key={index} needData={item} />;
      });

      setOriginalNeeds(data);
      setFilteredNeeds(data);
    } catch (e) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    setActiveCategory("All Categories");
    fetchNeeds();
  }, []);

  const onCategorySelect = (e) => {
    const category = e.target.innerText;
    setActiveCategory(category);

    if (category === "All Categories") {
      setFilteredNeeds(originalNeeds);
    } else {
      console.log(activeCategory);
      const filteredNeeds = originalNeeds.filter((item) => {
        return item.props.needData.category === category;
      });
      setFilteredNeeds(filteredNeeds);
    }
  };

  return (
    <>
      <div className={styles.contributePageContainer}>
        <div className={styles.title}>Opportunities to Make a Difference</div>

        <div className={styles.mainContainer}>
          <div className={styles.categoriesContainer}>
            <div className={styles.cateogoryLabel} onClick={onCategorySelect}>
              {" "}
              CATEGORIES{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "All Categories" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              All Categories
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Education" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              Education{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Medical" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              Medical{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Women & Girls" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              Women & Girls{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Animals" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              Animals{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Creative" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              Creative
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Food & Hunger" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              Food & Hunger
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Environment" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              Environment{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Children" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              Children{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Memorial" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              Memorial{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Community Development"
                  ? styles.activeCategory
                  : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              Community Development{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Others" ? styles.activeCategory : ""
              }`}
              onClick={onCategorySelect}
            >
              {" "}
              Others
            </div>
          </div>
          <div className={styles.searchAndNeedContainer}>
            <SearchBar />

            {isLoading ? (
              <div className={styles.spinner}>
                <ThreeDots color="#fca311" />
              </div>
            ) : (
              <div>
                <div className={styles.needsCardContainer}>{filteredNeeds}</div>
                {filteredNeeds.length != 0 ? (
                  <div
                    className={styles.loadMoreLink}
                    onClick={() => {
                      setLoadCount(loadCount + 8);
                    }}
                  >
                    Load More
                    <EastIcon className={styles.icon} />
                  </div>
                ) : (
                  <div>No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContributePage;
