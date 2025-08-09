"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { useState } from "react";

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  stock: z.coerce.number().int().min(0, "Stock can't be negative"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product | null;
  onFinished?: () => void;
}

export function ProductForm({ product, onFinished }: ProductFormProps) {
  const { toast } = useToast();
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const defaultValues: Partial<ProductFormValues> = {
    name: product?.name || "",
    description: "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    categories: product?.category ? [product.category] : [],
    tags: [],
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const handleAddCategory = () => {
    if (categoryInput.trim()) {
      appendCategory(categoryInput.trim());
      setCategoryInput("");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      appendTag(tagInput.trim());
      setTagInput("");
    }
  };

  async function onSubmit(data: ProductFormValues) {
    console.log(JSON.stringify(data))
    const token = localStorage.getItem("token");
    console.log(token)
    try {
      const response = await fetch("http://localhost:8081/products/add-product", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" ,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const result = await response.json();

      toast({
        title: "Product Saved!",
        description: `${data.name} saved with ID: ${result.id}.`,
      });

      onFinished?.();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save product.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Enchanted Rose Bouquet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the product..." className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price and Stock */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Categories */}
        <FormItem>
          <FormLabel>Categories</FormLabel>
          <div className="flex gap-2">
            <Input
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Add category"
            />
            <Button type="button" onClick={handleAddCategory}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryFields.map((field, index) => (
              <Badge key={field.id} variant="secondary" className="gap-1 pr-1">
                {form.getValues(`categories.${index}`)}
                <button type="button" onClick={() => removeCategory(index)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <FormMessage />
        </FormItem>

        {/* Tags */}
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tagFields.map((field, index) => (
              <Badge key={field.id} variant="outline" className="gap-1 pr-1">
                {form.getValues(`tags.${index}`)}
                <button type="button" onClick={() => removeTag(index)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <FormDescription>Helps customers find your product.</FormDescription>
        </FormItem>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onFinished}>
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </Form>
  );
}
