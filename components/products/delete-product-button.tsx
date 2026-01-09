"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/lib/products/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

export function DeleteProductButton({ productId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteProduct(productId);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Product deleted");
        router.push("/dashboard");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
