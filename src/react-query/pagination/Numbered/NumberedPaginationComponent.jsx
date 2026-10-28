import { useState } from 'react';
import { usePaginatedProducts } from './NumberPagination.js';

export default function NumberedPaginationComponent() {
    const [page, setPage] = useState(1);
    const limit = 5;

    const { data, isLoading, isError, isFetching } = usePaginatedProducts(page);

    if (isLoading) return <div>جاري التحميل...</div>;
    if (isError) return <div>حصل إيرور!</div>;


    const totalPages = Math.ceil((data?.totalCount || 0) / limit);

   
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div style={{ padding: '20px' }}>
            <h2>المنتجات (صفحة {page} من {totalPages})</h2>
            {isFetching && <span style={{ color: 'gray' }}> 🔄 بيحدث...</span>}

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
                            backgroundColor: page === pageNum ? '#007bff' : '#f8f9fa',
                            color: page === pageNum ? '#fff' : '#000',
                            border: '1px solid #ccc',
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