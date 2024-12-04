/* eslint-disable @typescript-eslint/ban-ts-comment */
import { editProduct } from "@/actions/product.action";
import { Category } from "@/models/Category";
import { Product, ShowedProduct } from "@/models/Product";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type DetailProduitProps = {
  buttonName: string;
  className?: string;
  productId: number;
};

export type ProductData = {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
};

const EditProduct: React.FC<DetailProduitProps> = ({
  buttonName,
  className,
  productId,
}) => {
  const product: ShowedProduct = useSelector((state) =>
    // @ts-ignore
    state.getProducts.find((p: Product) => p.id === productId)
  );
  // @ts-ignore
  const categories: Category[] = useSelector((state) => state.getCategories);

  const [editName, setEditName] = useState(product.name);
  const [editDescription, setEditDescription] = useState(product.description);
  const [editPrice, setEditPrice] = useState(product.price);
  const [editCategoryID, setEditCategoryID] = useState(product.category_id);

  const dispatch = useDispatch();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData: ProductData = {
      id: productId,
      name: editName,
      description: editDescription,
      price: editPrice,
      category_id: editCategoryID,
    };

    // @ts-expect-error
    dispatch(editProduct(productData));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={clsx("ml-auto", className)}>
          {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Modifier le produit</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleEdit(e)} className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              placeholder="Ex: Ordinateur"
              className="w-10/12"
              defaultValue={product.name}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Label htmlFor="text-description">Description</Label>
            <Textarea
              id="text-description"
              placeholder="Tapper la description de l'objet..."
              className="h-24 resize-none"
              defaultValue={product.description}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-evenly gap-2">
            <div>
              <Label htmlFor="price">Prix</Label>
              <Input
                type="number"
                placeholder="25.99 €"
                min={0.99}
                max={9999.99}
                defaultValue={product.price}
                onChange={(e) => setEditPrice(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select
                onValueChange={(value) => setEditCategoryID(Number(value))}
              >
                <SelectTrigger className="font-medium">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-center">
                      Catégories
                    </SelectLabel>
                    <SelectSeparator className="bg-zinc-400/40" />
                    {categories.map((category) => (
                      <SelectItem
                        className="font-light"
                        value={String(category.id)}
                        key={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
