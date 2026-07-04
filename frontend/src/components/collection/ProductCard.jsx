import { Link } from "react-router-dom";
import "../../styles/productcard.css";

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-num">({rating})</span>
    </div>
  );
}

function ProductCard({ product }) {
  const {
    id, name, brand, price, finalPrice, discount, rating, image, stock
  } = product;

  return (
    <Link to={`/product/${id}`} className="pc-link">
      <div className="pc">
        <div className="pc-img-wrap">
          <img src={image} alt={name} className="pc-img" loading="lazy" />
          {discount > 0 && <span className="pc-badge">-{discount}%</span>}
          {!stock && <span className="pc-out">Out of Stock</span>}
          <div className="pc-hover-overlay">
            <span className="pc-view-text">View Product</span>
          </div>
        </div>
        <div className="pc-body">
          <p className="pc-brand">{brand}</p>
          <h3 className="pc-name">{name}</h3>
          <Stars rating={rating || 0} />
          <div className="pc-price">
            <span className="pc-final">${finalPrice}</span>
            {discount > 0 && <span className="pc-old">${price}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
