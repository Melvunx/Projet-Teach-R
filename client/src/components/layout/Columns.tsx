/* eslint-disable @typescript-eslint/ban-ts-comment */
import { deleteProduct } from "@/actions/product.action";
import { ShowedProduct } from "@/models/Product";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DetailProiduit from "./DetailProduct";
import EditProduct from "./EditProduit";

export const columns: ColumnDef<ShowedProduct>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-teachFont">Nom</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="flex justify-start font-teachFont"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatedPrice = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div className="ml-5 flex justify-start">{formatedPrice}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: () => <div className="text-center font-teachFont">Catégorie</div>,
    cell: ({ row }) => {
      const category: string = row.getValue("category_name");
      return <div className="text-center">{category}</div>;
    },
  },
  {
    accessorKey: "creationAt",
    header: () => (
      <div className="text-center font-teachFont">Date de création</div>
    ),
    cell: ({ row }) => {
      const creationDate = new Date(row.getValue("creationAt"));
      const formatedDate = creationDate.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      return <div className="text-center">{formatedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dispatch = useDispatch();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only font-teachFont">Ouvrir le menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel className="font-teachFont font-semibold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault(); // Empêche tout comportement par défaut, si nécessaire
                e.stopPropagation(); // Stoppe la propagation de cet événement
              }}
            >
              <DetailProiduit
                buttonName="Détail du produit"
                productId={product.id}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-400/40" />
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault(); // Empêche tout comportement par défaut, si nécessaire
                e.stopPropagation(); // Stoppe la propagation de cet événement
              }}
              className="font-teachFont font-medium text-indigo-500"
            >
              <EditProduct
                buttonName="Modifier le produit"
                className="font-teachFont"
                productId={product.id}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="font-semibold text-red-500">
              <Button
                // @ts-ignore
                onClick={() => dispatch(deleteProduct(product.id))}
                variant="outline"
                className="font-teachFont"
              >
                Supprimer le produit
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
