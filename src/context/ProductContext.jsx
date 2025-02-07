// context/ProductContext.js
import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);

  return (
    <ProductContext.Provider value={{ productId, setProductId }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
