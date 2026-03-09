"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/context/CheckoutContext";
import CheckoutLayout from "@/components/CheckoutLayout";
import AddressForm from "@/components/AddressForm";
import OrderSummary from "@/components/OrderSummary";

export default function AddressPage() {
  const router = useRouter();
  const cartData = useCheckoutStore((s) => s.cartData);

  useEffect(() => {
    if (!cartData) {
      router.replace("/cart");
    }
  }, [cartData, router]);

  if (!cartData) return null;

  return (
    <CheckoutLayout
      currentPath="/address"
      title="Shipping Address"
      subtitle="Where should we deliver your order?"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-checkout p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-eco-pale flex items-center justify-center text-xl">
                📍
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Delivery Details
                </h2>
                <p className="text-xs text-gray-500">
                  All fields marked * are required
                </p>
              </div>
            </div>
            <AddressForm />
          </div>
        </div>
        <div>
          <OrderSummary
            cartItems={cartData.cartItems}
            shippingFee={cartData.shipping_fee}
            discount={cartData.discount_applied}
            showItems
          />
        </div>
      </div>
    </CheckoutLayout>
  );
}
