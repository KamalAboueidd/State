import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInfiniteProducts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=5`);
  return {
    products: res.data,
    nextPage: res.data.length > 0 && pageParam < 6 ? pageParam + 1 : undefined,
  };
};

export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ["infiniteProducts"],
    queryFn: fetchInfiniteProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });
}