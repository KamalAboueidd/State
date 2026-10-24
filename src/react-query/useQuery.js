/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";

// Example Usage / Notes:
// function useTodosQuery() {
//   const { data, isLoading, isFetching, error, refetch } = useQuery({
//     queryKey: ['todos'],
//     queryFn: fetchTodos, // function that bring data must return promise (axios or fetch).
//   });
// }

// any diff betw isLoading and isFetching ?

// isLoading means first fetch (ask the cache is fully empty ?  no any old data ) 
// isFetching means any fetch or refetch (any request to the server now). state of any request work in background.
// example :   

// first time :  isLoading=true , isFetching=true
// later :       isLoading=false , isFetching=true 

// queryKey (most important thing in cache)
// queryKey: ['todos'], ==> its the key for the safe, that react query stores the data inside it in cache

// queryFn why take array ?
// because requests almost need parameters.
// The magic happens here: If the user navigates from post number 1 to post number 2,
// React Query detects that the key has changed from ['post', 1] to ['post', 2].
// It will then fetch the new data and store it under the new key.
// If the user navigates back to post number 1 again,
// it will retrieve it instantly from the cache without making a new request!

// refetch : means manual refetch (user clicks button to refetch).
