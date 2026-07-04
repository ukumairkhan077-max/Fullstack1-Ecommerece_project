import "../../styles/sidebar.css";

const COLORS = [
  { name: "Black", hex: "#222222" },
  { name: "White", hex: "#f0f0f0" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Green", hex: "#16a34a" },
  { name: "Red", hex: "#dc2626" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Gray", hex: "#6b7280" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function Sidebar({ filters, onFilterChange, maxPrice, allBrands, onClose }) {
  const toggleArray = (key, value) => {
    const current = filters[key];
    onFilterChange(key, current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-heading-row">
        <h3 className="sidebar-heading">Filter</h3>
        {onClose && (
          <button type="button" className="sidebar-close-btn" onClick={onClose} aria-label="Close filters">
            ✕
          </button>
        )}
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Category</h4>
        {["Top Wear", "Bottom Wear"].map(cat => (
          <label key={cat} className="filter-label">
            <input type="checkbox" checked={filters.category.includes(cat)} onChange={() => toggleArray("category", cat)} />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Gender</h4>
        {["Men", "Women"].map(g => (
          <label key={g} className="filter-label">
            <input type="checkbox" checked={filters.gender.includes(g)} onChange={() => toggleArray("gender", g)} />
            <span>{g}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Color</h4>
        <div className="color-grid">
          {COLORS.map(color => (
            <button
              key={color.name}
              title={color.name}
              className={`color-btn${filters.colors.includes(color.name) ? " color-btn--active" : ""}`}
              style={{ background: color.hex, border: color.name === "White" ? "1px solid #ddd" : "none" }}
              onClick={() => toggleArray("colors", color.name)}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Size</h4>
        {SIZES.map(size => (
          <label key={size} className="filter-label">
            <input type="checkbox" checked={filters.sizes.includes(size)} onChange={() => toggleArray("sizes", size)} />
            <span>{size}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Price Range</h4>
        <div className="price-display">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
        <input
          type="range" className="price-slider"
          min={0} max={maxPrice || 200}
          value={filters.maxPrice}
          onChange={e => onFilterChange("maxPrice", Number(e.target.value))}
        />
        <div className="price-inputs">
          <input type="number" className="price-input" value={filters.minPrice} min={0} max={filters.maxPrice}
            onChange={e => onFilterChange("minPrice", Number(e.target.value))} placeholder="Min" />
          <span>–</span>
          <input type="number" className="price-input" value={filters.maxPrice} min={filters.minPrice} max={maxPrice || 200}
            onChange={e => onFilterChange("maxPrice", Number(e.target.value))} placeholder="Max" />
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Brand</h4>
        {allBrands.map(brand => (
          <label key={brand} className="filter-label">
            <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleArray("brands", brand)} />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Availability</h4>
        <label className="filter-label">
          <input type="checkbox" checked={filters.inStock} onChange={e => onFilterChange("inStock", e.target.checked)} />
          <span>In Stock</span>
        </label>
        <label className="filter-label">
          <input type="checkbox" checked={filters.outOfStock} onChange={e => onFilterChange("outOfStock", e.target.checked)} />
          <span>Out of Stock</span>
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
