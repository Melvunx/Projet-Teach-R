import { Category } from "@/models/Category";
import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";
const { VITE_GET_CATEGORIES } = import.meta.env;

export const getCategory = () => {
  return async (
    dispatch: (arg: { type: string; payload: Category[] }) => void
  ) => {
    try {
      const res = await axios.get(VITE_GET_CATEGORIES);
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
};
