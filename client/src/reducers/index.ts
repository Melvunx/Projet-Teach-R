import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

export default combineReducers({
  getProducts: productReducer,
  getCategories: categoryReducer,
});
