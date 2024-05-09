"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Product } from "@/schemas/product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addProduct } from "@/actions/add-product";

const FormProduct = Product.omit({ id: true });
type FormProduct = z.infer<typeof FormProduct>;

export function NewProductModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProduct>({
    resolver: zodResolver(FormProduct),
    defaultValues: {
      brand: "",
      category: "",
      code: "",
      color: "",
      cost: 0,
      name: "",
      price: 0,
      quantity: 1,
      size: "",
    },
  });

  function onSubmit(data: FormProduct) {
    addProduct(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Add a new product for sales.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">name</Label>
            <Input
              {...register("name", { required: true })}
              id="name"
              name="name"
              type="text"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">code</Label>
            <Input
              {...register("code", { required: true })}
              id="code"
              name="code"
              type="text"
            />
            {errors.code && (
              <span className="text-red-500">{errors.code.message}</span>
            )}
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="brand">brand</Label>
              <Input
                {...register("brand", { required: true })}
                id="brand"
                name="brand"
                type="text"
              />
              {errors.brand && (
                <span className="text-red-500">{errors.brand.message}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="color">color</Label>
              <Input
                {...register("color", { required: true })}
                id="color"
                name="color"
                type="text"
              />
              {errors.color && (
                <span className="text-red-500">{errors.color.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">size</Label>
              <Input
                {...register("size", { required: true })}
                id="size"
                name="size"
                type="text"
              />
              {errors.size && (
                <span className="text-red-500">{errors.size.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">category</Label>
              <Input
                {...register("category", { required: true })}
                id="category"
                name="category"
                type="text"
              />
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">cost</Label>
              <Input
                {...register("cost", { required: true })}
                id="cost"
                name="cost"
              />
              {errors.cost && (
                <span className="text-red-500">{errors.cost.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">price</Label>
              <Input
                {...register("price", { required: true })}
                id="price"
                name="price"
              />
              {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">quantity</Label>
            <Input
              {...register("quantity", { required: true })}
              id="quantity"
              name="quantity"
            />
            {errors.quantity && (
              <span className="text-red-500">{errors.quantity.message}</span>
            )}
          </div>
          <DialogFooter>
            <Button className="w-full">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
