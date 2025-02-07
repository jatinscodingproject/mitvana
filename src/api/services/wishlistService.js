import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { getItem } from "@src/api/localStorage";
import { handleApiError } from "@src/lib/handleApiError";

const token = getItem("accessToken");

export const addProductOnWishlist = async (obj) => {
  try {
    const res = await DataService.post("/wishlist/add", obj, true);
    console.log(res.data);
    return res.data;
  } catch (err) {
    handleApiError(err);
    console.log(err);
    console.log("✌️err --->", err);
    toast.dismiss();
    toast.error(err.response?.data?.message || "Error");
    return;
  }
};

export const getWishlistProducts = () => {
  return DataService.get("/wishlist", {}, true)
    .then((res) => {
      console.log(res.data);
      return res.data.products;
    })
    .catch((err) => {
      // handleApiError(err);
      console.log(err);
    });
};

export const removeProductFromWishlist = (itemId) => {
  return DataService.delete(`/wishlist/remove/${itemId}`, {}, true) // Send DELETE request
    .then((res) => {
      console.log(res.data);
      toast.dismiss();
      toast.success(res.data.message || "Item removed from cart");
      return res.data.success; // Return the updated cart or response data if needed
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error removing item");
    });
};
