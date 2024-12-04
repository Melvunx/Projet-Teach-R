import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/layout/Columns";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const products = useSelector((state) => state.getProducts);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={products} />
      </div>
    </>
  );
};

export default Home;
