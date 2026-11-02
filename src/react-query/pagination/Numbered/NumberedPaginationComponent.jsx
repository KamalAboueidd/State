import { useState } from 'react';
import { usePaginatedProducts } from './NumberPagination.js';

export default function NumberedPaginationComponent() {
    const [page, setPage] = useState(1);
    const limit = 5;

    const { data, isLoading, isError, isFetching } = usePaginatedProducts(page);

    if (isLoading) return <div>Loading products...</div>;
    if (isError) return <div>Failed to load products.</div>;

    const totalPages = Math.ceil((data?.totalCount || 0) / limit);
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Products (Page {page} of {totalPages})</h2>
            {isFetching && <span style={{ color: 'gray' }}> 🔄 Updating in background...</span>}

            <ul>
                {data.products.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>

            <div style={{ display: 'flex', gap: '5px', marginTop: '20px' }}>
                {pagesArray.map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: page === pageNum ? 'var(--text-primary, #ededed)' : 'var(--bg-subtle, #141414)',
                            color: page === pageNum ? 'var(--bg-page, #000)' : 'var(--text-primary, #ededed)',
                            border: '1px solid var(--border-strong, #383838)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </div>
    );
}
