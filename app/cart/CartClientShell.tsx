"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CartData } from "@/types";
import { useCheckoutStore } from "@/context/CheckoutContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { formatCurrency, calculateOrderSummary } from "@/lib/utils";

interface CartClientShellProps {
  cartData: CartData;
}


export default function CartClientShell({ cartData }: CartClientShellProps) {
  const router = useRouter();
  const setCartData = useCheckoutStore((s) => s.setCartData);

  useEffect(() => {
    setCartData(cartData);
  }, [cartData, setCartData]);

  const summary = calculateOrderSummary(
    cartData.cartItems,
    cartData.shipping_fee,
    cartData.discount_applied
  );

  function handleProceed() {
    router.push("/address");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow-checkout overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Shopping Cart
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {summary.itemCount} item{summary.itemCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="px-5">
            {cartData.cartItems.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
          </div>

          {/* Eco message */}
          <div className="mx-5 mb-5 mt-2 bg-eco-pale rounded-xl px-4 py-3 flex items-start gap-2">
            <span className="text-lg">🌱</span>
            <p className="text-xs text-eco-dark leading-relaxed">
              <strong>You&apos;re making a difference!</strong> Every Ecoyaan
              purchase helps reduce plastic waste and supports sustainable
              farming practices.
            </p>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden">
          <button
            onClick={handleProceed}
            className="w-full py-3.5 px-6 bg-eco-green hover:bg-eco-dark text-white font-bold text-sm rounded-2xl
              transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <span>→</span>
            <span className="ml-2 font-extrabold">
              {formatCurrency(summary.grandTotal)}
            </span>
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <OrderSummary
          cartItems={cartData.cartItems}
          shippingFee={cartData.shipping_fee}
          discount={cartData.discount_applied}
        />

        {/* Shipping notice */}
        <div className="bg-white rounded-2xl shadow-checkout px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-eco-pale flex items-center justify-center text-xl flex-shrink-0">
              🚚
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Fast Delivery
              </p>
              <p className="text-xs text-gray-500">
                Estimated 3–5 business days
              </p>
            </div>
          </div>
        </div>

        {/* Desktop CTA */}
        <button
          onClick={handleProceed}
          className="hidden lg:flex w-full py-3.5 px-6 bg-eco-green hover:bg-eco-dark text-white font-bold text-sm rounded-2xl
            transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] items-center justify-center gap-2"
        >
          <span>Proceed to Checkout</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
