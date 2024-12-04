/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ProductData } from "@/components/layout/EditProduit";
import { ShowedProduct } from "@/models/Product";
import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
const { VITE_GET_PRODUCTS, VITE_ADD_PRODUCT } = import.meta.env;

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

export const addProduct = (data: ShowedProduct) => {
  return async (
    dispatch: (arg: { type: string; payload: ShowedProduct[] }) => void
  ) => {
    try {
      await axios.post(VITE_ADD_PRODUCT, data);
      // @ts-ignore
      dispatch({ type: ADD_PRODUCT, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const editProduct = (data: ProductData) => {
  return async (
    dispatch: (arg: { type: string; payload: ProductData }) => void
  ) => {
    try {
      await axios.put(`${VITE_GET_PRODUCTS}/${data.id}/edit`, data);
      dispatch({ type: EDIT_PRODUCT, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProduct = (productId: { id: number }) => {
  return async (
    dispatch: (arg: { type: string; payload: { id: number } }) => void
  ) => {
    try {
      await axios.delete(`${VITE_GET_PRODUCTS}/${productId}`);
      dispatch({ type: DELETE_PRODUCT, payload: productId });
    } catch (error) {
      console.error(error);
    }
  };
};
