import { ShowedProduct } from "@/models/Product";
import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
const { VITE_GET_PRODUCTS } = import.meta.env;

export const getProduct = () => {
  return async (
    dispatch: (arg: { type: string; payload: ShowedProduct[] }) => void
  ) => {
    try {
      const res = await axios.get(VITE_GET_PRODUCTS);
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
};
