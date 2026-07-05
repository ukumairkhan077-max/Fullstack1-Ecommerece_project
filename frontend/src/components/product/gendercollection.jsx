import { Link } from "react-router-dom";
import mencollection   from "../../assets/images/mens-collection.webp";
import womencollection from "../../assets/images/womens-collection.webp";

function GenderSection() {
  return (
    <section className="gender-section">

      <div className="gender-card">
        <Link to="/collection/men">
          <img src={mencollection} alt="Men Collection" />
        </Link>
        <div className="gender-content">
          <h2>Men Collection</h2>
          <Link to="/collection/men" className="gender-shop-link">Shop Now →</Link>
        </div>
      </div>

      <div className="gender-card">
        <Link to="/collection/women">
          <img src={womencollection} alt="Women Collection" />
        </Link>
        <div className="gender-content">
          <h2>Women Collection</h2>
          <Link to="/collection/women" className="gender-shop-link">Shop Now →</Link>
        </div>
      </div>

    </section>
  );
}

export default GenderSection;
