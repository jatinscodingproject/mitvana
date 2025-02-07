import { getCartProducts } from '@src/api/services/cartService';
import { getWishlistProducts } from '@src/api/services/wishlistService';
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const CartWishlistContext = createContext();

// Create a provider component
export const CartWishlistProvider = ({ children }) => {
  const [cartDetail, setCartDetail] = useState(null);
  const [wishlistDetail, setWishlistDetail] = useState(null);

  const getCartDetail = async () => {
    const res = await getCartProducts(); // replace with actual function to fetch cart products
    setCartDetail(res);
  };

  const getWishlistDetail = async () => {
    const res = await getWishlistProducts(); // replace with actual function to fetch wishlist products
    setWishlistDetail(res);
  };

  // Optionally, fetch data on mount
  useEffect(() => {
    getCartDetail();
    getWishlistDetail();
  }, []);

  return (
    <CartWishlistContext.Provider
      value={{ cartDetail, wishlistDetail, getCartDetail, getWishlistDetail }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};
