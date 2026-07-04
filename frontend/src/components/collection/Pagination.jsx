import "../../styles/pagination.css";
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button className="pag-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← Prev</button>
      <div className="pag-pages">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} className={`pag-page${p === currentPage ? " active" : ""}`} onClick={() => onPageChange(p)}>{p}</button>
        ))}
      </div>
      <button className="pag-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
    </div>
  );
}
export default Pagination;
