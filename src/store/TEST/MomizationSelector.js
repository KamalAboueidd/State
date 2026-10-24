import { createSelector } from "@reduxjs/toolkit";

const selectProducts = (state) => state.products?.list || [];

export const selectFilteredProducts = createSelector(
  [selectProducts],
  (products) => {
    return products.filter((product) => product.price > 100);
  }
);

export default function MomizationSelectorTest() {
  return null;
}