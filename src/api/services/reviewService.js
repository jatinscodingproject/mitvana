import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { API_ENDPOINT } from "../axios";
import { handleApiError } from "@src/lib/handleApiError";
import { getItem } from "../localStorage";

// Add Review Function
export const addReview = async (obj, id) => {
  try {
    const token = getItem("accessToken")

    const response = await fetch(`${API_ENDPOINT}/product/${id}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: obj, // Automatically handles form data
    });

    // Check if response is OK (status 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit review");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Review added successfully!");
    return true;
  } catch (error) {
    handleApiError(error);
    console.error("Error adding review:", error);
    toast.dismiss();
    toast.error(error.message || "Error adding review");
    return false;

  }
};

// Get Reviews Function
export const getReview = async (id) => {
  try {
    const response = await DataService.get(`/product/${id}/reviews`, true);

    // Check if response data is received
    if (response?.data) {
      console.log("Reviews fetched:", response.data);
      return response.data;
    } else {
      throw new Error("No reviews found");
    }
  } catch (err) {
    handleApiError(err);
    console.error("Error fetching reviews:", err);
    toast.dismiss();
    toast.error(err.response?.data?.message || "Error fetching reviews");
  }
};

export const getDeliveryDateByPincode = async (pincode , price) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/pincode/charges/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pinCode: pincode  , price}),
    });
    response = await response.json();
    if (response?.pincodeDetail) {
      return response?.pincodeDetail;
    } else {
      throw new Error("Delivery Details Not Found");
    }
  } catch (error) {
    handleApiError(error);
    console.error("Error fetching reviews:", error);
  }
};
