"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { generateProductTags } from "@/ai/flows/product-tagging";

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
  const [isGenerating, setIsGenerating] = useState(false);

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

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  async function handleGenerateTags() {
    const description = form.getValues("description");
    if (!description || description.length < 10) {
      toast({
        variant: "destructive",
        title: "Description too short",
        description: "Please provide a more detailed product description.",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateProductTags({ description });
      form.setValue("tags", result.tags, { shouldValidate: true });
      form.setValue("categories", result.categories, { shouldValidate: true });
      toast({
        title: "AI Generation Complete!",
        description: "Tags and categories have been generated for you.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the AI generation.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function onSubmit(data: ProductFormValues) {
    console.log(data);
    toast({
      title: "Product Saved!",
      description: `${data.name} has been successfully saved.`,
    });
    onFinished?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the product in detail..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGenerateTags}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Tags & Categories with AI
        </Button>

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

        <FormItem>
          <FormLabel>Categories</FormLabel>
          <div className="flex flex-wrap gap-2">
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
        
        <FormItem>
          <FormLabel>Tags</FormLabel>
           <div className="flex flex-wrap gap-2">
            {tagFields.map((field, index) => (
              <Badge key={field.id} variant="outline" className="gap-1 pr-1">
                {form.getValues(`tags.${index}`)}
                <button type="button" onClick={() => removeTag(index)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <FormDescription>These help customers find your product.</FormDescription>
        </FormItem>


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
