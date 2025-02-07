import { create } from "zustand";

export const useSearchStore = create((set, get) => ({
  searchClicked: false,
  searchValue: "",
  fullProductData: [],
  searchProductsFullData: [],
  setSearchClicked: (value) =>
    set(() => ({ searchClicked: !get().searchClicked })),
  setSearchValue: (value) => set(() => ({ searchValue: value })),
  productUrl: "",
  setFullProductData: (data) => set(() => ({ fullProductData: data })),
  setProductUrl: (url) => set(() => ({ productUrl: url })),
  setSearchProductsFullData: (data) =>
    set(() => ({ searchProductsFullData: data })),
  handleOnSearch: (query, result) => {
    if (query.length <= 0) {
      const fullProductData = get().fullProductData;
      set(() => ({ searchProductsFullData: fullProductData }));
    } else {
      const filteredData = fullProductData?.filter((item) => {
        const fieldsToSearch = [
          item.productTitle,
          item.description,
          ...(item.tags || []),
        ];

        return fieldsToSearch.some((field) =>
          field?.toLowerCase().includes(query.toLowerCase())
        );
      });
      set(() => ({ searchProductsFullData: filteredData }));
    }
  },
  selectedColor: "",
  setSelectedColor: (color) => set(() => ({ selectedColor: color })),
}));
