import "../../styles/searchbar.css";
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="sb-icon">🔍</span>
      <input type="text" className="sb-input" placeholder="Search products..." value={value} onChange={e => onChange(e.target.value)} />
      {value && <button className="sb-clear" onClick={() => onChange("")}>✕</button>}
    </div>
  );
}
export default SearchBar;
