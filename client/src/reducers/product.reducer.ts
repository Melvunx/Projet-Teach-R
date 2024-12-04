import { GET_PRODUCTS } from "@/actions/product.action";
import { ShowedProduct } from "../models/Product";

const initialState = {};

type GetProductAction = {
  type: string;
  payload: ShowedProduct[];
};

export default function productReducer(
  state = initialState,
  action: GetProductAction
) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
