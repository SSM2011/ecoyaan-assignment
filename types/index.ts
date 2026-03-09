// ─── Cart & Product Types ────────────────────────────────────────────────────

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

// ─── Address Types ────────────────────────────────────────────────────────────

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

// ─── Form Validation ──────────────────────────────────────────────────────────

export type AddressFormErrors = Partial<Record<keyof ShippingAddress, string>>;

// ─── Order Types ──────────────────────────────────────────────────────────────

export interface OrderSummaryData {
  subtotal: number;
  shippingFee: number;
  discount: number;
  grandTotal: number;
  itemCount: number;
}

// ─── Checkout Store Types ─────────────────────────────────────────────────────

export interface CheckoutStore {
  cartData: CartData | null;
  shippingAddress: ShippingAddress | null;
  orderId: string | null;

  setCartData: (data: CartData) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setOrderId: (id: string) => void;
  clearCheckout: () => void;
}
