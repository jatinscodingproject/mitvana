"use client";
import { getItem } from "@src/api/localStorage";
import { useEffect, useState } from "react";

const useCart = () => {
  if (typeof window !== "undefined") {
    const [cartFromLocalStorage, setCartFromLocalStorage] = useState(
      getItem("cartItem") || []
    );

    useEffect(() => {
      if (typeof window !== "undefined") {
        // Load cart items on initial render
        const storedCartItems =
          getItem("cartItem") || [];
        setCartFromLocalStorage(storedCartItems);
      }

      const handleStorageChange = () => {
        // Update state when local storage changes
        const storedCartItems =
          getItem("cartItem") || [];
        setCartFromLocalStorage(storedCartItems);
      };

      // Listen to storage events for cross-tab updates
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);

    return cartFromLocalStorage;
  }
};

export default useCart;
