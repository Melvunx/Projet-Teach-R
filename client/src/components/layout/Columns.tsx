import { ShowedProduct } from "@/models/Product";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const columns: ColumnDef<ShowedProduct>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Prix</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatedPrice = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div className="text-center">{formatedPrice}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: () => <div className="text-center">Categorie</div>,
    cell: ({ row }) => {
      const category: string = row.getValue("category_name");
      return <div className="text-center">{category}</div>;
    },
  },
  {
    accessorKey: "creationAt",
    header: () => <div className="text-center">Date de création</div>,
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel className="font-semibold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem>Détail du produit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-medium text-indigo-500">
              Modifier le produit
            </DropdownMenuItem>
            <DropdownMenuItem className="font-semibold text-red-500">
              Supprimer le produit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
