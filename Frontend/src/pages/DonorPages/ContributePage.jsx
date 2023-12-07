import styles from "./ContributePage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import EastIcon from "@mui/icons-material/East";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import SearchBar from "../../components/DonorComponents/ContributePage/SearchBar";
import NeedCard from "../../components/DonorComponents/ContributePage/NeedCard";
import { BACKEND_URL } from "../../utils/constants";

const ContributePage = () => {
  const [originalNeeds, setOriginalNeeds] = useState([]);
  const [filteredNeeds, setFilteredNeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [pageCount, setPageCount] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const fetchNeeds = async () => {
    setActiveCategory("All Categories");
    setPageCount(1);
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/donor/getNeeds?page=1`, {
        mode: "cors",
        withCredentials: true,
      });
      const data = response.data.needsList.map((item, index) => {
        return <NeedCard key={index} needData={item} />;
      });
      setHasMoreItems(true);

      setOriginalNeeds(data);
      setFilteredNeeds(data);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async (event) => {
    const loadMoreLink = event.currentTarget;
    loadMoreLink.style.display = "none";

    try {
      setPageCount(pageCount + 1);
      const response = await axios.get(
        `${BACKEND_URL}/donor/getNeeds?page=` + (pageCount + 1),
        {
          mode: "cors",
          withCredentials: true,
        }
      );
      const data = originalNeeds;
      const newData = response.data.needsList.map((item, i) => {
        const index = data.length + i + 1;
        return <NeedCard key={index} needData={item} />;
      });

      setOriginalNeeds((prevNeeds) => [...prevNeeds, ...newData]);
      setFilteredNeeds((prevNeeds) => [...prevNeeds, ...newData]);

      if (!response.data.hasMoreItems) {
        setHasMoreItems(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (activeCategory != "All Categories") {
        onCategorySelect(activeCategory);
      }

      loadMoreLink.style.display = "inline";

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const onCategorySelect = (category) => {
    setActiveCategory(category);

    if (category === "All Categories") {
      setFilteredNeeds(originalNeeds);
    } else {
      const filteredNeeds = originalNeeds.filter((item) => {
        return item.props.needData.category === category;
      });

      setFilteredNeeds(filteredNeeds);
    }
  };

  useEffect(() => {
    fetchNeeds();
  }, []);

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
              onClick={() => onCategorySelect("All Categories")}
            >
              {" "}
              All Categories
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Education" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Education")}
            >
              Education{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Medical" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Medical")}
            >
              Medical{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Women & Girls" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Women & Girls")}
            >
              Women & Girls{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Animals" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Animals")}
            >
              Animals{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Creative" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Creative")}
            >
              {" "}
              Creative
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Food & Hunger" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Food & Hunger")}
            >
              {" "}
              Food & Hunger
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Environment" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Environment")}
            >
              Environment{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Children" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Children")}
            >
              {" "}
              Children{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Memorial" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Memorial")}
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
              onClick={() => onCategorySelect("Community Development")}
            >
              {" "}
              Community Development{" "}
            </div>
            <div
              className={`${styles.categoryItem} ${
                activeCategory === "Others" ? styles.activeCategory : ""
              }`}
              onClick={() => onCategorySelect("Others")}
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
              <div className={styles.needsCardContainer}>{filteredNeeds}</div>
            )}
            {!filteredNeeds.length && !isLoading && <div>No results found</div>}
            {hasMoreItems && filteredNeeds.length > 0 && !isLoading && (
              <div
                className={styles.loadMoreLink}
                onClick={(event) => loadMore(event)}
              >
                Load More
                <EastIcon className={styles.icon} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContributePage;
