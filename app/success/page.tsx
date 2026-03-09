"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckoutStore } from "@/context/CheckoutContext";
import { calculateOrderSummary, formatCurrency } from "@/lib/utils";


export default function SuccessPage() {
  const router = useRouter();
  const cartData = useCheckoutStore((s) => s.cartData);
  const shippingAddress = useCheckoutStore((s) => s.shippingAddress);
  const orderId = useCheckoutStore((s) => s.orderId);
  const clearCheckout = useCheckoutStore((s) => s.clearCheckout);

  const [showContent, setShowContent] = useState(false);

  // Guard: redirect if order wasn't placed
  useEffect(() => {
    if (!orderId || !cartData || !shippingAddress) {
      router.replace("/cart");
      return;
    }
    // Trigger entrance animation
    const t = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(t);
  }, [orderId, cartData, shippingAddress, router]);

  if (!cartData || !shippingAddress || !orderId) return null;

  const summary = calculateOrderSummary(
    cartData.cartItems,
    cartData.shipping_fee,
    cartData.discount_applied
  );

  function handleContinueShopping() {
    clearCheckout();
    router.push("/cart");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-pale via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <Link href="/cart" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <span className="font-extrabold text-eco-dark text-lg leading-none">
                Ecoyaan
              </span>
              <p className="text-xs text-eco-green leading-none">
                Sustainable Living
              </p>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >

          <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-eco-pale flex items-center justify-center text-5xl animate-check-bounce shadow-lg">
            🎉
          </div>

          <h1 className="text-3xl font-extrabold text-eco-dark mb-2 tracking-tight">
            Order Successful!
          </h1>
          <p className="text-gray-500 text-sm">
            Thank you for shopping sustainably with Ecoyaan.
          </p>

          {/* Order ID Badge */}
          <div className="inline-flex items-center gap-2 mt-4 bg-white border border-green-100 rounded-full px-4 py-2 shadow-sm">
            <span className="text-xs text-gray-500">Order ID</span>
            <span className="text-xs font-mono font-bold text-eco-dark">
              {orderId}
            </span>
          </div>
        </div>


        <div
          className={`space-y-4 transition-all duration-700 delay-200 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-checkout overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>📦</span> Items Ordered
              </h2>
            </div>
            <div className="px-5 py-2">
              {cartData.cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatCurrency(item.product_price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {formatCurrency(item.product_price * item.quantity)}
                  </p>
                </div>
              ))}

              {/* Totals */}
              <div className="py-3 space-y-1.5 border-t border-dashed border-gray-200 mt-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping</span>
                  <span>
                    {summary.shippingFee === 0
                      ? "FREE"
                      : formatCurrency(summary.shippingFee)}
                  </span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between text-xs text-green-600">
                    <span>Discount</span>
                    <span>−{formatCurrency(summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-gray-100">
                  <span className="text-sm font-bold text-gray-900">
                    Total Paid
                  </span>
                  <span className="text-base font-extrabold text-eco-dark">
                    {formatCurrency(summary.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl shadow-checkout p-5">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
              <span>📍</span> Delivery Address
            </h2>
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600 space-y-0.5">
              <p className="font-semibold text-gray-900">
                {shippingAddress.fullName}
              </p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.phone}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} —{" "}
                {shippingAddress.pinCode}
              </p>
            </div>
          </div>

          {/* Eco Impact */}
          <div className="bg-eco-pale rounded-2xl p-5 flex items-start gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <p className="text-sm font-bold text-eco-dark">
                Your eco-impact
              </p>
              <p className="text-xs text-eco-green mt-1 leading-relaxed">
                This order avoids approximately{" "}
                <strong>200g of plastic waste</strong> compared to conventional
                alternatives. Thank you for choosing sustainability!
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleContinueShopping}
            className="w-full py-3.5 px-6 bg-eco-green hover:bg-eco-dark text-white font-bold text-sm rounded-2xl
              transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]
              flex items-center justify-center gap-2"
          >
            <span>🛍️</span>
            <span>Continue Shopping</span>
          </button>
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-gray-400">
        <p>© 2025 Ecoyaan · Sustainable Shopping · All rights reserved</p>
      </footer>
    </div>
  );
}
