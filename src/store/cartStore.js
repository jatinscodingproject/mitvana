import { create } from "zustand";

export const useCartStore = create((set) => {

  return {
    cart: {},
    quantities: {},
    totalPrice: 0,
    cartItem: [], // Set initial state from localStorage

    setCartItem: (cartItem) => set(() => ({ cartItem })),

    setCart: (cartData) => set(() => ({ cart: cartData })),

    setQuantity: (itemId, quantity) =>
      set((state) => ({
        quantities: { ...state.quantities, [itemId]: quantity },
      })),

    incrementQuantity: (itemId) =>
      set((state) => ({
        quantities: {
          ...state.quantities,
          [itemId]: Math.min((state.quantities[itemId] || 1) + 1, 100),
        },
      })),

    decrementQuantity: (itemId) =>
      set((state) => ({
        quantities: {
          ...state.quantities,
          [itemId]: Math.max((state.quantities[itemId] || 1) - 1, 1),
        },
      })),

    setTotalPrice: (totalPrice) => set(() => ({ totalPrice })),
  };
});
