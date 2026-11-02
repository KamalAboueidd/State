import { useState } from 'react';
import { usePaginatedProducts } from './pagination.js';

export default function ProductsList() {
    const [page, setPage] = useState(1);

    const { 
        data, 
        isLoading, 
        isError, 
        error, 
        isFetching, 
        isPlaceholderData 
    } = usePaginatedProducts(page);

    if (isLoading) return <div>Loading first page... ⏳</div>;
    if (isError) return <div>Error loading products: {error.message}</div>;

    const buttonStyle = {
        padding: '8px 16px',
        backgroundColor: 'var(--bg-subtle, #141414)',
        color: 'var(--text-primary, #ededed)',
        border: '1px solid var(--border-strong, #383838)',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Products List (Page {page})</h2>

            {isFetching && <span style={{ color: 'gray' }}> 🔄 Updating in background...</span>}

            <ul>
                {data.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={page === 1}
                    style={{ ...buttonStyle, opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                >
                    Previous Page
                </button>

                <span style={{ fontSize: '13px', color: 'var(--text-secondary, #a1a1a1)' }}>Page: {page}</span>

                <button 
                    onClick={() => {
                        if (!isPlaceholderData) {
                            setPage(old => old + 1);
                        }
                    }}
                    style={buttonStyle}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}
