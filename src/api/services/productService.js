import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { handleApiError } from "@src/lib/handleApiError";

export const getProduct = () => {
  return DataService.get("/product", false)
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


export const getProductForHomePage = () => {
  return DataService.get("/product/homepage/arrival-trending", false)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err?.response?.data?.message || "Error");
    });
};


export const getUniquesSizes = () => {
  return DataService.get("/product/size/unique-size", false)
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

export const getProductById = (id) => {
  return DataService.get(`/product/${id}`, false)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message || "Error");
    });
};

export const getProductByCategoryId = (id) => {
  return DataService.get(`/product/category/${id}`, false)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
    });
};


export const getProductByCategoryIdLiked = (id) => {
  return DataService.get(`/product/category-url/${id}`, false)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
    });
};
