import {useInfiniteQuery} from '@tanstack/react-query'
import axios from 'axios'
const fetchInfiniteProducts = async ({pageParam = 1}) => {
       const res = await axios.get(`https://api.example.com/products?_page=${pageParam}&_limit=5`);
       return {
        products : res.data,
        nextPage :res.data.lenght > 0 ? pageParam + 1 : undefined,
       }
}
export function useInfiniteScroll()
{
     return useInfiniteScroll({   // if you want arrays Stacked .
        queryKey: ['infiniteProducts'],
        queryFn: fetchInfiniteProducts, 
        getNextPageParam: (lastPage) => lastPage.   extPage,
        initialPageParam: 1, 
    });
}