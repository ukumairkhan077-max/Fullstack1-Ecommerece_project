import "../../styles/sortdropdown.css";
const OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Popularity" },
];
function SortDropdown({ value, onChange }) {
  return (
    <select className="sort-select" value={value} onChange={e => onChange(e.target.value)}>
      {OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
export default SortDropdown;
