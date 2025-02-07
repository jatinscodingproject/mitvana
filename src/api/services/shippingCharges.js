
import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { handleApiError } from "@src/lib/handleApiError";

export const getShippingCharges = (id) => {
    return DataService.get(`/settings/shipping-charges`, false)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        handleApiError(err);
        console.log(err);
        toast.dismiss();
        toast.error(err.response?.data?.message || "Error");
      });
  };