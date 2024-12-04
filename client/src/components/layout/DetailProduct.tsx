import { Product, ShowedProduct } from "@/models/Product";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DetailProduitProps = {
  buttonName: string;
  className?: string;
  productId: number;
};

const DetailProduct: React.FC<DetailProduitProps> = ({
  buttonName,
  className,
  productId,
}) => {
  const product: ShowedProduct = useSelector((state: any) =>
    state.getProducts.find((p: Product) => p.id === productId)
  );
  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        <Button variant="outline" className={clsx("ml-auto", className)}>
          {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Produit</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {product ? (
            <ul className="flex flex-col gap-3">
              <li className="italic">
                <strong>Nom :</strong> {product.name}
              </li>
              <li className="italic">
                <strong>Description :</strong> {product.description}
              </li>
              <li className="italic">
                <strong>Prix :</strong> {product.price} €
              </li>
              <li className="italic">
                <strong>Catégorie :</strong> {product.category.name}
              </li>
            </ul>
          ) : (
            <p className="bg-red-400 text-center font-medium">
              Produit non trouvé
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailProduct;
