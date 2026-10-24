import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export default function ProductsComponent() {
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <h2>Loading products for the first time...</h2>;
  }

  if (isError) {
    return <h2 style={{ color: "red" }}>Error: {error.message}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products List (Cached Data)</h1>

      {isFetching && <p style={{ color: "blue" }}>Updating in background...</p>}

      <button onClick={() => refetch()} style={{ marginBottom: "15px" }}>
        Manual Refetch
      </button>

      <ul>
        {products?.slice(0, 5).map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}