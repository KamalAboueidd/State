import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

const fetchProductsWithTotal = async ({ queryKey }) => {
    const [, page] = queryKey;
    const limit = 5;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    
  
    return {
        products: response.data,
        totalCount: parseInt(response.headers['x-total-count'] || '100', 10) 
    };
};

export function usePaginatedProducts(page) {
    return useQuery({
        queryKey: ['products', page],
        queryFn: fetchProductsWithTotal,
        placeholderData: keepPreviousData,
    });
}