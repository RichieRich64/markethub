"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const image = formData.get("image") as File | null;

  let imageUrl: string | null = null;

  if (image) {
    const filePath = `${user.id}/${crypto.randomUUID()}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, image);

    console.log(uploadError);

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("products").insert({
    user_id: user.id,
    title,
    description,
    price,
    image_url: imageUrl,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
