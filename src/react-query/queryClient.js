// Query clint setup (tanstack/react-query)
 // queryclint 
 // queryClintProvider   // Wrapper  
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data still fresh for 5 minutes
      refetchOnWindowFocus: false, // stop refetch when window refocus
      retry: 3, // if request fail retry 3 times
    },
  },
});
