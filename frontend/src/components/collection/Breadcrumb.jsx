import { Link } from "react-router-dom";
import "../../styles/breadcrumb.css";
const LABELS = { men: "Men", women: "Women", topwear: "Top Wear", bottomwear: "Bottom Wear" };
function Breadcrumb({ filter }) {
  return (
    <nav className="breadcrumb">
      <Link to="/" className="bc-link">Home</Link>
      <span className="bc-sep"> › </span>
      <span className="bc-cur">{LABELS[filter] || "Collection"}</span>
    </nav>
  );
}
export default Breadcrumb;
