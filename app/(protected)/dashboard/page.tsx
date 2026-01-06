import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CreateProductModal } from "@/components/products/create-product-modal";
import { ProductCard } from "@/components/products/product-card";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Products</h1>
        <CreateProductModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
