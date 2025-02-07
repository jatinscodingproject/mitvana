import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { handleApiError } from "@src/lib/handleApiError";

export const postSubscribeEmail = (obj) => {
  return DataService.post(`/subscription/user-email`, obj, false)
    .then((res) => {
      toast.success(res?.data?.message);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response?.data?.message || "Error");
    });
};

export const postNotifyEmail = (obj) => {
  return DataService.post(`/notify/user-email`, obj, false)
    .then((res) => {
      toast.success(res?.data?.message);
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
      console.log(err);
      toast.dismiss();
      toast.error(err.response?.data?.message || "Error");
    });
};
