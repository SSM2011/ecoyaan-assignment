import type { CartItem } from "@/types";
import { calculateOrderSummary, formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  cartItems: CartItem[];
  shippingFee: number;
  discount: number;
  showItems?: boolean;
}

/**
 * OrderSummary — displays the financial breakdown of the order.
 * Used on Cart, Payment, and Success pages with optional item list.
 */
export default function OrderSummary({
  cartItems,
  shippingFee,
  discount,
  showItems = false,
}: OrderSummaryProps) {
  const summary = calculateOrderSummary(cartItems, shippingFee, discount);

  return (
    <div className="bg-white rounded-2xl shadow-checkout overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-eco-pale border-b border-green-100">
        <h2 className="text-base font-bold text-eco-dark flex items-center gap-2">
          <span>🧾</span>
          <span>Order Summary</span>
        </h2>
        <p className="text-xs text-eco-green mt-0.5">
          {summary.itemCount} item{summary.itemCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Optional Items List */}
      {showItems && (
        <div className="px-5 py-3 border-b border-gray-100">
          {cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between py-1.5">
              <span className="text-sm text-gray-600 truncate max-w-[60%]">
                {item.product_name}
                <span className="text-gray-400 ml-1">×{item.quantity}</span>
              </span>
              <span className="text-sm font-medium text-gray-800">
                {formatCurrency(item.product_price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="px-5 py-4 space-y-2.5">
        <SummaryRow label="Subtotal" value={formatCurrency(summary.subtotal)} />

        <SummaryRow
          label="Shipping"
          value={
            summary.shippingFee === 0
              ? "FREE"
              : formatCurrency(summary.shippingFee)
          }
          valueClass={
            summary.shippingFee === 0 ? "text-eco-green font-semibold" : ""
          }
        />

        {summary.discount > 0 && (
          <SummaryRow
            label="Discount"
            value={`−${formatCurrency(summary.discount)}`}
            valueClass="text-green-600 font-semibold"
          />
        )}

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Grand Total</span>
            <span className="text-lg font-extrabold text-eco-dark">
              {formatCurrency(summary.grandTotal)}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes</p>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SummaryRowProps {
  label: string;
  value: string;
  valueClass?: string;
}

function SummaryRow({ label, value, valueClass = "" }: SummaryRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm text-gray-800 ${valueClass}`}>{value}</span>
    </div>
  );
}
