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

    if (isLoading) return <div>جاري تحميل الصفحة الأولى لأول مرة... ⏳</div>;
    if (isError) return <div>حصل إيرور يا حوت: {error.message}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>قائمة المنتجات (صفحة {page})</h2>

           
            {isFetching && <span style={{ color: 'gray' }}> 🔄 بيحدث في الخلفية...</span>}

            <ul>
                {data.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>

         
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button 
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    الصفحة السابقة
                </button>

                <span>صفحة رقم: {page}</span>

                <button 
                    onClick={() => {
                     
                        if (!isPlaceholderData) { // if the data from the server come now , not from the cache  , make isPlaceholder false and incremant the page count 
                            setPage(old => old + 1);
                        }
                    }}
                
                >
                    الصفحة التالية
                </button>
            </div>
        </div>
    );
}