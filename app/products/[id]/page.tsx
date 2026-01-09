import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DeleteProductButton } from "@/components/products/delete-product-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: product } = await supabase
    .from("products")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.title} | MarketHub`,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) return notFound();

  const isOwner = user?.id === product.user_id;

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-6">
      {product.image_url && (
        <div className="relative h-80 w-full">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl">${product.price}</p>
      <p className="text-muted-foreground">{product.description}</p>

      {isOwner && (
        <div className="pt-4">
          <DeleteProductButton productId={product.id} />
        </div>
      )}
    </main>
  );
}
