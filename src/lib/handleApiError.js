// utils/handleApiError.js
"use client";
import toast from "react-hot-toast";

export function handleApiError(error) {
  if (
    error?.response?.data?.message === "jwt expired" ||
    error?.response?.data?.message === "Token not found" ||
    error?.response?.data?.message === "Invalid token"
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    toast.dismiss();
    toast.error("You need to login to access this page.");
    location.href = "/";
  } else {
    console.error("API Error:", error);
  }
}
