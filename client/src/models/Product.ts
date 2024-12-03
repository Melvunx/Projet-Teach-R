import { Category } from "./Category";

export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShowedProduct extends Product {
  category: Category;
}
