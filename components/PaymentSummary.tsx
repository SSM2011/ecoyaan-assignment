"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CartItem, ShippingAddress } from "@/types";
import { calculateOrderSummary, formatCurrency } from "@/lib/utils";
import { useCheckoutStore, useProcessPayment } from "@/context/CheckoutContext";

interface PaymentSummaryProps {
  cartItems: CartItem[];
  shippingFee: number;
  discount: number;
  address: ShippingAddress;
}

/**
 * PaymentSummary — final review before placing the order.
 * Shows order totals, shipping address, and the "Pay Securely" CTA.
 * Simulates payment and redirects to /success on completion.
 */
export default function PaymentSummary({
  cartItems,
  shippingFee,
  discount,
  address,
}: PaymentSummaryProps) {
  const router = useRouter();
  const processPayment = useProcessPayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const summary = calculateOrderSummary(cartItems, shippingFee, discount);

  async function handlePay() {
    setIsProcessing(true);
    try {
      await processPayment();
      router.push("/success");
    } catch {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Shipping Address Card */}
      <div className="bg-white rounded-2xl shadow-checkout p-5">
        <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
          <span className="text-base">📍</span> Delivering To
        </h3>
        <div className="text-sm text-gray-600 space-y-0.5">
          <p className="font-semibold text-gray-900">{address.fullName}</p>
          <p>{address.email}</p>
          <p>{address.phone}</p>
          <p>
            {address.city}, {address.state} — {address.pinCode}
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-2xl shadow-checkout p-5">
        <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
          <span className="text-base">💳</span> Payment Details
        </h3>
        <div className="space-y-2">
          <Row label="Subtotal" value={formatCurrency(summary.subtotal)} />
          <Row
            label="Shipping"
            value={
              summary.shippingFee === 0
                ? "FREE"
                : formatCurrency(summary.shippingFee)
            }
          />
          {summary.discount > 0 && (
            <Row
              label="Discount"
              value={`−${formatCurrency(summary.discount)}`}
              highlight
            />
          )}
          <div className="border-t border-dashed border-gray-200 pt-3 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900">
                Amount to Pay
              </span>
              <span className="text-xl font-extrabold text-eco-dark">
                {formatCurrency(summary.grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 py-1">
        <span className="flex items-center gap-1">🔒 SSL Secured</span>
        <span className="flex items-center gap-1">✅ 100% Safe</span>
        <span className="flex items-center gap-1">🛡️ Encrypted</span>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={isProcessing}
        className="w-full py-4 px-6 bg-eco-green hover:bg-eco-dark text-white font-bold text-base rounded-2xl
          transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]
          disabled:opacity-70 disabled:cursor-not-allowed
          flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <ProcessingDots />
            <span>Processing Payment…</span>
          </>
        ) : (
          <>
            <span>🔒</span>
            <span>Pay {formatCurrency(summary.grandTotal)} Securely</span>
          </>
        )}
      </button>
    </div>
  );
}

// Sub-components 
function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm ${highlight ? "text-green-600 font-semibold" : "text-gray-700"}`}
      >
        {value}
      </span>
    </div>
  );
}

function ProcessingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
