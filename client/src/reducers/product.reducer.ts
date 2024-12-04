/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
} from "@/actions/product.action";
import { ProductData } from "@/components/layout/EditProduit";
import { ShowedProduct } from "@/models/Product";

const initialState = {};

type GetProductAction = {
  type: string;
  payload: any;
};

export default function productReducer(
  state = initialState,
  action: GetProductAction
) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;
    case ADD_PRODUCT:
      // @ts-ignore
      return [action.payload, ...state];
    case EDIT_PRODUCT:
      // @ts-ignore
      return state.map((product: ProductData) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            name: action.payload.name,
            price: action.payload.price,
            description: action.payload.description,
            category_id: action.payload.category_id,
          };
        } else return product;
      });
    case DELETE_PRODUCT:
      // @ts-ignore
      return state.filter(
        (product: ShowedProduct) => product.id != action.payload
      );
    default:
      return state;
  }
}
