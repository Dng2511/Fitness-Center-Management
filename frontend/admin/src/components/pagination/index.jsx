import "./style.css"
const Pagination = ({ handlePrevPage, handleNextPage, totalPages, page }) => {
    return (
        <div className="pagination">
            <button className="page-number" onClick={handlePrevPage} disabled={page === 1}>
                &#8249;
            </button>
            <span className="page-number">{page}</span>
            <button className="page-number" onClick={handleNextPage} disabled={page === totalPages}>
                &#8250;
            </button>
        </div>
    );
};

export default Pagination;
