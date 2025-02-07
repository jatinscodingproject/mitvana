import { create } from "zustand";

export const useCategoryIdStore = create((set) => {
  return {
    categoryId: "",
    setCategoryId: (categoryId) => set(() => ({ categoryId })),
  };
});
