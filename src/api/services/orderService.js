import { toast } from "react-hot-toast";
import { API_ENDPOINT, DataService } from "../axios";
import { handleApiError } from "@src/lib/handleApiError";

export const createOrder = (obj) => {
  return DataService.post("/order", obj, true)
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


export const getShippingPriceDetail = (obj , order) => {

  return DataService.post(`/order/get-price/pincode/${order}`, obj, true)
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

export const cancelOrder = (obj) => {
  return DataService.post("/order/cancel-order/user", obj, true)
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

export const getOrder = (orderId) => {
  return DataService.get(`/order/${orderId}`, {}, true)
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

export const getOrderByUserId = () => {
  return DataService.get(`/order/user/all-order`, {}, true)
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

export const addOrderAddress = (orderId, data) => {
  return DataService.post(
    `/order/order-address/id/order/${orderId}`,
    data,
    true
  )
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

export const getOrderByOrderId = (orderId) => {
  return DataService.get(`/order/${orderId}`, {}, true)
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

export const getOrderTrackDetailByOrderId = (obj) => {
  return DataService.post(`/order/shipment/order-tracking`, obj, true)
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

export const createRazorpayOrder = (orderId) => {
  return DataService.get(`/order/razorpay-order/${orderId}`, {}, true)
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

export const updateOrderStatus = (orderId, status) => {
  return DataService.post(
    `/order/change-status/manual`,
    { orderId, status },
    true
  )
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
