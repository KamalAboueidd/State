 
 import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';


const fetchProducts = async ({ queryKey }) => {
    const [, page] = queryKey; 
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
    return response.data;
};

export function usePaginatedProducts(page) {
    return useQuery({
        queryKey: ['products', page], 
        queryFn: fetchProducts,
        placeholderData: keepPreviousData,  //  keep previous data while fetching next data 
        staleTime: 1000 * 60 * 5, 
    });
}