import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProductsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Marketplace</h1>

      {products?.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h2 className="font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="font-medium">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
