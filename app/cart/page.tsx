

import { fetchCartData } from "@/lib/mockData";
import CheckoutLayout from "@/components/CheckoutLayout";
import CartClientShell from "./CartClientShell";

export const metadata = {
  title: "Your Cart — Ecoyaan",
};

export default async function CartPage() {
  const cartData = await fetchCartData();

  return (
    <CheckoutLayout
      currentPath="/cart"
      title="Your Cart"
      subtitle={`${cartData.cartItems.length} item${cartData.cartItems.length !== 1 ? "s" : ""} in your cart`}
    >
      <CartClientShell cartData={cartData} />
    </CheckoutLayout>
  );
}
