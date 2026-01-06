"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, CreateProductInput } from "@/lib/products/schema";
import { useCreateProduct } from "@/lib/products/use-create-product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CreateProductModal() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateProduct();

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema) as unknown as Resolver<
      CreateProductInput,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >,
  });

  const onSubmit = (values: CreateProductInput) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("price", values.price.toString());

    if (values.description) {
      formData.append("description", values.description);
    }

    if (values.image) {
      formData.append("image", values.image);
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Product created");
        form.reset();
        setOpen(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create Product</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Title" />
          <Textarea
            {...form.register("description")}
            placeholder="Description"
          />
          <Input
            type="number"
            step="0.01"
            {...form.register("price")}
            placeholder="Price"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => form.setValue("image", e.target.files?.[0])}
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="cursor-pointer"
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
