import { ShowedProduct } from "@/models/Product";
import { columns } from "./layout/Columns";
import { DataTable } from "./layout/DataTable";

type ProductProps = {
  product: ShowedProduct[];
};

const Product = ({ product }: ProductProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={product} />
    </div>
  );
};

export default Product;
