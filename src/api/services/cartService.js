import { toast } from "react-hot-toast";
import { API_ENDPOINT, DataService } from "../axios";
import { setItem } from "../localStorage";

import { getItem } from "@src/api/localStorage";
import { handleApiError } from "@src/lib/handleApiError";

const token = getItem("accessToken")

export const addProductOnCart = (obj) => {
  return DataService.post("/cart", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error");
    });
};

export const isProductInCart = (obj) => {
  return DataService.post("/cart/product/is-present", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // handleApiError(err);
      console.log(err);
    });
};

// export const removeProductFromCart = (itemId) => {
//   console.log(itemId)
//   return DataService.delete(`/cart/${itemId}` , {}, true) // Send DELETE request
//     .then((res) => {
//       console.log(res.data);
//       toast.success(res.data.message || "Item removed from cart");
//       return res.data.success; // Return the updated cart or response data if needed
//     })
//     .catch((err) => {
//       console.log(err);
//       toast.error(err.response.data.message || "Error removing item");
//     });
// };

export const removeProductFromCart = async (itemId) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/cart/delete/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Assuming you have the token available for authorization
      },
    });

    // Check if response is OK (status 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove item from cart");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Item removed from cart successfully!");
    return data;
  } catch (error) {
    // handleApiError(err);
    console.error("Error removing item from cart:", error);
    toast.dismiss();
    toast.error(error.message || "Error removing item from cart");
  }
};


export const updateProductQuantity = async (itemId, quantity , type) => {
  try {

    console.log(token)
    const response = await fetch(`${API_ENDPOINT}/cart/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity , type }), // Send the quantity as JSON
    });

    // Check if response is OK (status 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update quantity");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Quantity updated successfully!");
    return data;
  } catch (error) {
    // handleApiError(err);
    console.error("Error updating product quantity:", error);
    toast.dismiss();
    toast.error(error.message || "Error updating product quantity");
  }
};

export const getCartProducts = (obj) => {

  return DataService.get("/cart", obj, true)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearCart = async () => {

  try {
    const response = await fetch(`${API_ENDPOINT}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if response is OK (status 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to clear the cart");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success(data.message || "Cart cleared successfully!");
    return data; // Optionally return the response data if needed
  } catch (error) {
    handleApiError(err);
    console.error("Error clearing cart:", error);
    toast.dismiss();
    toast.error(error.message || "Error clearing cart");
  }
};

