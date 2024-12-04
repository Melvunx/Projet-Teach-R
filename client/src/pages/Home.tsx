import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/layout/Columns";
import { ShowedProduct } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";

const { VITE_GET_PRODUCTS } = import.meta.env;

const Home = () => {
  const [products, setProducts] = useState<ShowedProduct[]>([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(VITE_GET_PRODUCTS);
      const data = res.data;
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products} refreshProductData={fetchProduct} />
    </div>
  );
};

export default Home;
