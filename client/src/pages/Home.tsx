import { columns } from "@/components/layout/Columns";
import { DataTable } from "@/components/layout/DataTable";
import { ShowedProduct } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const { VITE_GET_PRODUCTS } = import.meta.env;

  const [products, setProducts] = useState<ShowedProduct[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(VITE_GET_PRODUCTS);
        const data = res.data;
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [VITE_GET_PRODUCTS]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default Home;
