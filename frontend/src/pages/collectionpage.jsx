import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Sidebar from "../components/collection/Sidebar";
import ProductGrid from "../components/collection/ProductGrid";
import SearchBar from "../components/collection/SearchBar";
import SortDropdown from "../components/collection/SortDropdown";
import Breadcrumb from "../components/collection/Breadcrumb";
import Pagination from "../components/collection/Pagination";
import { useProducts } from "../context/ProductContext";
import "../styles/collectionpage.css";

const PRODUCTS_PER_PAGE = 12;

function CollectionPage() {
  const { filter } = useParams();
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: [], category: [], colors: [], sizes: [], brands: [],
    minPrice: 0, maxPrice: 200, inStock: false, outOfStock: false,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setSearch("");
    setSortBy("default");
    setMobileFiltersOpen(false);
    setFilters(prev => ({
      ...prev,
      gender: filter === "men" ? ["Men"] : filter === "women" ? ["Women"] : [],
      category: filter === "topwear" ? ["Top Wear"] : filter === "bottomwear" ? ["Bottom Wear"] : [],
    }));
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const enriched = useMemo(() =>
    products.map((p, i) => ({
      ...p,
      id: p.id || p.sku || `product-${i}`,
      image: p.images?.[0]?.url || "",
      finalPrice: p.discountPrice || p.price,
      oldPrice: p.discountPrice ? p.price : null,
      discount: p.discountPrice ? Math.round(((p.price - p.discountPrice) / p.price) * 100) : 0,
      stock: (p.countInStock || 0) > 0,
    })), [products]
  );

  const maxProductPrice = useMemo(() =>
    Math.ceil(Math.max(...enriched.map(p => p.price))), [enriched]
  );

  const allBrands = useMemo(() =>
    [...new Set(enriched.map(p => p.brand))].sort(), [enriched]
  );

  const filtered = useMemo(() => {
    let r = enriched;
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (filters.gender.length > 0) r = r.filter(p => filters.gender.includes(p.gender));
    if (filters.category.length > 0) r = r.filter(p => filters.category.includes(p.category));
    if (filters.colors.length > 0)
      r = r.filter(p => p.colors?.some(c => filters.colors.some(fc => c.toLowerCase().includes(fc.toLowerCase()))));
    if (filters.sizes.length > 0) r = r.filter(p => p.sizes?.some(s => filters.sizes.includes(s)));
    if (filters.brands.length > 0) r = r.filter(p => filters.brands.includes(p.brand));
    r = r.filter(p => p.finalPrice >= filters.minPrice && p.finalPrice <= filters.maxPrice);
    if (filters.inStock && !filters.outOfStock) r = r.filter(p => p.stock);
    if (filters.outOfStock && !filters.inStock) r = r.filter(p => !p.stock);
    return r;
  }, [enriched, search, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "price-low": return arr.sort((a, b) => a.finalPrice - b.finalPrice);
      case "price-high": return arr.sort((a, b) => b.finalPrice - a.finalPrice);
      case "rating": return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest": return arr.reverse();
      default: return arr;
    }
  }, [filtered, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PRODUCTS_PER_PAGE));
  const paginated = sorted.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const titleMap = { men: "MEN'S COLLECTION", women: "WOMEN'S COLLECTION", topwear: "TOP WEAR", bottomwear: "BOTTOM WEAR" };
  const collectionTitle = titleMap[filter] || "ALL COLLECTION";

  const handleClearAll = () => {
    setSearch("");
    setSortBy("default");
    setFilters({ gender: [], category: [], colors: [], sizes: [], brands: [], minPrice: 0, maxPrice: maxProductPrice, inStock: false, outOfStock: false });
  };

  return (
    <>
      <Header />
      <div className="collection-page">
        <Breadcrumb filter={filter} />
        <div className="collection-layout">
          <aside className={`collection-sidebar ${mobileFiltersOpen ? "collection-sidebar--open" : ""}`}>
            <Sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              maxPrice={maxProductPrice}
              allBrands={allBrands}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </aside>
          {mobileFiltersOpen && (
            <div className="sidebar-backdrop" onClick={() => setMobileFiltersOpen(false)}></div>
          )}
          <main className="collection-main">
            <div className="collection-header">
              <h2 className="collection-title">{collectionTitle}</h2>
              <div className="collection-controls">
                <button
                  type="button"
                  className="mobile-filter-btn"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  ☰ Filters
                </button>
                <SearchBar value={search} onChange={setSearch} />
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>
            <p className="results-count">{sorted.length} product{sorted.length !== 1 ? "s" : ""} found</p>
            {paginated.length === 0 ? (
              <div className="no-results">
                <p>No products match your filters.</p>
                <button className="clear-btn" onClick={handleClearAll}>Clear all filters</button>
              </div>
            ) : (
              <>
                <ProductGrid products={paginated} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CollectionPage;
