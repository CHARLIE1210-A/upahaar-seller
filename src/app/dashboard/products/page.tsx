"use client";

import { useState } from 'react';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductForm } from '@/components/product-form';
import type { Product } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockProducts: (Product & { 'data-ai-hint'?: string })[] = [
  { id: '1', name: 'Enchanted Rose Bouquet', category: 'Flowers', stock: 120, price: 2499, imageUrl: 'https://placehold.co/48x48.png', status: 'Published', 'data-ai-hint': 'rose bouquet'},
  { id: '2', name: 'Chocolate Truffle Cake', category: 'Cakes', stock: 50, price: 1200, imageUrl: 'https://placehold.co/48x48.png', status: 'Published', 'data-ai-hint': 'chocolate cake' },
  { id: '3', name: 'Teddy Bear Hugs Combo', category: 'Combos', stock: 75, price: 1850, imageUrl: 'https://placehold.co/48x48.png', status: 'Draft', 'data-ai-hint': 'teddy bear' },
  { id: '4', name: 'Personalized Photo Mug', category: 'Gifts', stock: 200, price: 799, imageUrl: 'https://placehold.co/48x48.png', status: 'Published', 'data-ai-hint': 'photo mug' },
];

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  }

  const handleAddNew = () => {
    setSelectedProduct(null);
    setOpen(true);
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Manage your products and view their sales performance.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={handleAddNew} size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                    </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    </DialogHeader>
                    <ProductForm product={selectedProduct} onFinished={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>
            A list of all products in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="48"
                      src={product.imageUrl}
                      width="48"
                      data-ai-hint={product['data-ai-hint']}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'Published' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">₹{product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-4</strong> of <strong>{mockProducts.length}</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
