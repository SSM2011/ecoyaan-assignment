"use client";


import { create } from "zustand";
import type { CartData, CheckoutStore, ShippingAddress } from "@/types";
import { generateOrderId } from "@/lib/utils";

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  cartData: null,
  shippingAddress: null,
  orderId: null,

  setCartData: (data: CartData) => set({ cartData: data }),

  setShippingAddress: (address: ShippingAddress) =>
    set({ shippingAddress: address }),

  setOrderId: (id: string) => set({ orderId: id }),

  clearCheckout: () =>
    set({ cartData: null, shippingAddress: null, orderId: null }),
}));


export function useProcessPayment() {
  const setOrderId = useCheckoutStore((s) => s.setOrderId);

  return async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const id = generateOrderId();
    setOrderId(id);
    return id;
  };
}
