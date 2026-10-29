import { useInfiniteProducts } from './useInfiniteProducts';

export default function InfiniteScrollComponent() {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage, // to run the function
        hasNextPage,   // to ask if you have another page
        isFetchingNextPage  // to ask if you fetching the new page now
    } = useInfiniteProducts();

    if (isLoading) return <div>loading first page... ⏳</div>;
    if (isError) return <div>get error : {error.message}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>list product  (scrool infinite )</h2>

            {/*  list pages */}
            <ul>
                {data.pages.map((pageGroup, pageIndex) => (
                    pageGroup.products.map(product => (
                        <li key={product.id} style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                            {product.title}
                        </li>
                    ))
                ))}
            </ul>

            {/*  button for load more */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    {isFetchingNextPage
                        ? 'loading more...'
                        : hasNextPage
                        ? 'loading more...'
                        : 'end of products'}
                </button>
            </div>
        </div>
    );
}