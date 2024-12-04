import { GET_CATEGORIES } from "@/actions/category.action";
import { Category } from "@/models/Category";

const initialState = {};

type GetCategoryAction = {
  type: string;
  payload: Category[];
};

export default function categoryReducer(
  state = initialState,
  action: GetCategoryAction
) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
