import Image from "next/image";
import type { CartItem as CartItemType } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}


export default function CartItem({ item }: CartItemProps) {
  const lineTotal = item.product_price * item.quantity;

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 animate-fade-in">
      {/* Product Image */}
      <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-eco-pale border border-green-100">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          sizes="80px"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {item.product_name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {formatCurrency(item.product_price)} × {item.quantity}
        </p>

        {/* Quantity Badge */}
        <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-eco-pale text-eco-dark">
          Qty: {item.quantity}
        </span>
      </div>

      {/* Line Total */}
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-bold text-gray-900">
          {formatCurrency(lineTotal)}
        </p>
      </div>
    </div>
  );
}
