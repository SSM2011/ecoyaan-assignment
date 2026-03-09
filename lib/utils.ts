import type { CartItem, OrderSummaryData, ShippingAddress, AddressFormErrors } from "@/types";


export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}


export function calculateOrderSummary(
  cartItems: CartItem[],
  shippingFee: number,
  discount: number
): OrderSummaryData {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee - discount;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    subtotal,
    shippingFee,
    discount,
    grandTotal,
    itemCount,
  };
}


export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ECO-${timestamp}-${random}`;
}


export function validateShippingAddress(
  data: ShippingAddress
): AddressFormErrors {
  const errors: AddressFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }

  if (!data.pinCode.trim()) {
    errors.pinCode = "PIN code is required.";
  } else if (!/^\d{6}$/.test(data.pinCode)) {
    errors.pinCode = "PIN code must be 6 digits.";
  }

  if (!data.city.trim()) {
    errors.city = "City is required.";
  }

  if (!data.state.trim()) {
    errors.state = "State is required.";
  }

  return errors;
}



export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
