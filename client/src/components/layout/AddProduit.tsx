import { Category } from "@/models/Category";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

type AddProduitProps = {
  buttonName: string;
  className?: string;
  refreshProductData: () => void;
};

const { VITE_ADD_PRODUCT, VITE_GET_CATEGORIES } = import.meta.env;

const AddProduit: React.FC<AddProduitProps> = ({
  buttonName,
  className,
  refreshProductData,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<number>();
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(VITE_ADD_PRODUCT, {
        name,
        description,
        price,
        category,
      });
      console.log(res.data);

      refreshProductData();

      setName("");
      setDescription("");
      setPrice(25.99);
      setCategory(1);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit : ", error);
    }
  };

  const fecthCategories = async () => {
    try {
      const res = await axios.get(VITE_GET_CATEGORIES);
      const data = res.data;
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories : ", error);
    }
  };

  useEffect(() => {
    fecthCategories();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild className="bg-indigo-400/30">
        <Button variant="outline" className={clsx("ml-auto", className)}>
          {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Nouveau produit</DialogTitle>
          <DialogDescription>Ajouter ici un nouveau produit.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              placeholder="Ex: Ordinateur"
              className="w-10/12"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Label htmlFor="text-description">Description</Label>
            <Textarea
              id="text-description"
              placeholder="Tapper la description de l'objet..."
              className="h-24 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select onValueChange={(value) => setCategory(Number(value))}>
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

export default AddProduit;
