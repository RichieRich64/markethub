import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover:shadow-lg transition">
        <CardContent className="p-4 space-y-2">
          {product.image_url && (
            <div className="relative h-40 w-full">
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover rounded"
              />
            </div>
          )}

          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-sm text-muted-foreground">${product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
