import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/products/product-card";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">MarketHub</h1>
      <p className="mt-2 text-muted-foreground">
        A modern marketplace built with Next.js
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
