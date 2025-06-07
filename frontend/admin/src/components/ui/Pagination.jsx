import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Pagination.module.css';

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    const pages = [];
    const maxVisiblePages = 5;

    // Tính toán range của các trang hiển thị
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Điều chỉnh startPage nếu endPage đã đạt giới hạn
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Tạo mảng các trang
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.pageButton} ${styles.arrowButton}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FiChevronLeft />
            </button>

            {startPage > 1 && (
                <>
                    <button
                        className={styles.pageButton}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className={styles.ellipsis}>...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
                    <button
                        className={styles.pageButton}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={`${styles.pageButton} ${styles.arrowButton}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FiChevronRight />
            </button>
        </div>
    );
} 