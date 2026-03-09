"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckoutStore } from "@/context/CheckoutContext";
import CheckoutLayout from "@/components/CheckoutLayout";
import CartItem from "@/components/CartItem";
import PaymentSummary from "@/components/PaymentSummary";



export default function PaymentPage() {
  const router = useRouter();
  const cartData = useCheckoutStore((s) => s.cartData);
  const shippingAddress = useCheckoutStore((s) => s.shippingAddress);


  useEffect(() => {
    if (!cartData) {
      router.replace("/cart");
    } else if (!shippingAddress) {
      router.replace("/address");
    }
  }, [cartData, shippingAddress, router]);

  if (!cartData || !shippingAddress) return null;

  return (
    <CheckoutLayout
      currentPath="/payment"
      title="Review & Pay"
      subtitle="Double-check your order before paying"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Items Card */}
          <div className="bg-white rounded-2xl shadow-checkout overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span>🛒</span> Your Items
              </h2>
              <Link
                href="/cart"
                className="text-xs text-eco-green hover:text-eco-dark underline-offset-2 hover:underline transition-colors"
              >
                Edit Cart
              </Link>
            </div>
            <div className="px-5">
              {cartData.cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>
          </div>

          {/* Address Review */}
          <div className="bg-white rounded-2xl shadow-checkout px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span>📦</span> Shipping To
              </h2>
              <Link
                href="/address"
                className="text-xs text-eco-green hover:text-eco-dark underline-offset-2 hover:underline transition-colors"
              >
                Edit Address
              </Link>
            </div>
            <div className="text-sm text-gray-600 space-y-0.5 bg-gray-50 rounded-xl px-4 py-3">
              <p className="font-semibold text-gray-900">
                {shippingAddress.fullName}
              </p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.phone}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} &mdash;{" "}
                {shippingAddress.pinCode}
              </p>
            </div>
          </div>
        </div>


        <div>
          <PaymentSummary
            cartItems={cartData.cartItems}
            shippingFee={cartData.shipping_fee}
            discount={cartData.discount_applied}
            address={shippingAddress}
          />
        </div>
      </div>
    </CheckoutLayout>
  );
}
