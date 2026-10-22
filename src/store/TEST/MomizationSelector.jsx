
import { createSelector } from '@reduxjs/toolkit';

export default function Component() {
    const AllProducts =(state) => state.products.list; // now All products from products Store are here

    const AllProductsAfterFilter = createSelector(   // now You Have a Momization Selector ..
        [AllProducts],
            (products)=> {
                console.log("filter ran");
                
                return products.filter(product => product.price > 100);
            }
         )

    //  // use selector to get the filtered products
    // const filteredProducts = useSelector((state) => AllProductsAfterFilter(state)); 
    // console.log(filteredProducts); // No need to run filter function again because of memoization
    // return (
    //     <div>
    //         <h1>Component</h1>
    //         <p>All Products: {AllProducts}</p>
    //         <p>Filtered Products: {filteredProducts}</p>
    //         <button onClick={() => dispatch(addProduct({ name: "Product", price: 200 }))}>Add Product</button>
    //     </div>
    // );
}