import { toast } from "react-hot-toast";
import { DataService } from "../axios";
import { setItem } from "../localStorage";
import { handleApiError } from "@src/lib/handleApiError";

export const getHomePageImages = async () => {
  return DataService.get("/homepage/get-hero-images", {}, false)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      handleApiError(err);
      return err;
    });
};
