"use client";

import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/lib/products/actions";

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await createProduct(formData);
      if (res?.error) throw new Error(res.error);
      return res;
    },
  });
}
