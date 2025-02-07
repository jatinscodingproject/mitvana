import React, { useEffect, useState } from "react";
import TopBanner from "@src/components/Headers/TopBanner";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { getOrderByOrderId } from "@src/api/services/orderService";
import { backendUrl } from "@src/api/axios";
import { getItem, removeItemByKey } from "@src/api/localStorage";
import NewFooter from "@src/components/new_footer";

import {
  alppyCouponCode,
  validateCouponCode,
} from "@src/api/services/couponService";
import Link from "next/link";
const OrderConfirmation = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [orderDetail, setOrderDetail] = useState();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await getOrderByOrderId(orderId);
        console.log(res);
        setOrderDetail(res?.order);
        if (res?.message === "Successfull") {
          const iscoupon = getItem("coupon");
          if (iscoupon) {
            const response = await alppyCouponCode(iscoupon);
            if (response.status == 200) {
              removeItemByKey("coupon");
              console.log("first if response?.data --->", response?.data);
            } else {
              console.log(response);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (orderId) fetchOrderDetail();
  }, [orderId]);

  function formatISODate(isoDate) {
    // Create a new Date object from the ISO date string
    const date = new Date(isoDate);

    // Define options for formatting date and time
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true for 12-hour format
    };

    // Format the date and time and return
    return date.toLocaleTimeString("en-GB", options);
  }


    const handleDownload = (item) => {
        const sanitizedOrderID = item.orderID.replace(/#/g, "_");
        fetch(`${backendUrl}${item.orderInvoice}`)
          .then((response) => {
            if (response.ok) {
              return response.blob();
            }
            throw new Error("Network response was not ok.");
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice_${sanitizedOrderID}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error("Error downloading the invoice:", error);
          });
      };
      
  return (
    <React.Fragment>
      <HeadTitle title="Thank you for your order" />
      <HeaderCosmetics />

      <div className="container my-5" style={{ width: "80%" }}>
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <h1 className="fs-28 font-semibold">
              Thank you for your order purchase!
            </h1>
            <p className="fs-12 my-3">
              Your order will be processed within 24 hours during working days.
              We will notify you by email once your order has been shipped.
            </p>

            <h3 className="fs-20 mb-3 mt-4" style={{ fontWeight: 500 }}>
              Billing Address
            </h3>
            <div className="mb-2">
              <strong>Name:</strong>{" "}
              {orderDetail?.shippingAddress?.firstName +
                " " +
                orderDetail?.shippingAddress?.lastName}
            </div>
            <div className="mb-2">
              <strong>Address:</strong> {orderDetail?.shippingAddress?.address},{" "}
              {orderDetail?.shippingAddress?.city},{" "}
              {orderDetail?.shippingAddress?.state},{" "}
              {orderDetail?.shippingAddress?.country}
            </div>
            <div className="mb-2">
              <strong>Phone:</strong>{" "}
              {orderDetail?.shippingAddress?.phoneNumber}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {orderDetail?.user?.email}
            </div>

            <div className="my-4">
              <Button
                type="button"
                onClick={() => handleDownload(orderDetail)}
                className="btn btn-teal my-3 px-3 py-2 fw-bold rounded-pill w-full"
              >
                Download Invoice
              </Button>
              {/* <Link href={`/order-track?orderId=${orderId}`} >
                <Button
                  type="button"
                  className="btn btn-teal my-3 px-3 py-2 fw-bold rounded-pill"
                >
                  Track your order
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="col-lg-1 d-none d-lg-block"></div> {/* For spacing */}
          <div className="col-lg-6 col-md-12 bg-[#F7F7F7] py-3 px-3 rounded">
            <h2 className="fs-20 font-semibold">Order Summary</h2>
            <div className="border-t border-gray-300 my-3"></div>

            <div className="row">
              <div className="col-4 border-r border-gray-300">
                <p className="fs-12 m-0">Date</p>
                <p className="fs-14 font-semibold m-0">
                  {formatISODate(orderDetail?.createdAt)}
                </p>
              </div>
              <div className="col-4 border-r border-gray-300">
                <p className="fs-12 m-0">Order Number</p>
                <p className="fs-14 m-0 font-semibold">
                  {orderDetail?.orderID}
                </p>
              </div>
              <div className="col-4">
                <p className="fs-12 m-0">Payment Method</p>
                <p className="fs-14 m-0 font-semibold">
                  {"Online"}
                  <br />
                  <span className="fs-12">
                    {orderDetail?.paymentResult?.id}
                  </span>
                </p>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-300 my-3"></div>

            {/* Order Items */}
            {orderDetail?.orderItems?.map((item, index) => (
              <div className="row w-90 m-auto mb-3" key={index}>
                <div
                  className="col-2 border p-0"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    height: "4rem",
                  }}
                >
                  <img
                    style={{ height: "100%", objectFit: "cover" }}
                    alt=""
                    width={100}
                    src={backendUrl + item?.product?.thumbnail}
                  />
                </div>
                <div className="col-6">
                  <h4 className=" fs-14 m-0 font-semibold">
                    {item?.product?.productTitle}
                  </h4>
                  {item?.selectedColor && (
                    <p className="fs-10" style={{ color: "#808B97" }}>
                      Color: {item?.selectedColor}
                    </p>
                  )}

                  <p className="fs-10" style={{ color: "#808B97" }}>
                    Qty: {item?.quantity}
                  </p>
                </div>
                <div className="col-2"></div>
                <div className="col-2">
                  <p className="font-semibold">
                    ₹
                    {item?.product?.discountedPrice
                      ? parseInt(item?.product?.discountedPrice).toFixed(2)
                      : parseInt(item?.product?.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-300 my-3 w-90 mx-auto"></div>
            <div className="container w-90 m-auto">
              <div className="row align-items-center">
                <div className="col-3">
                  <p>Sub Total</p>
                </div>
                <div className="col text-end">
                  <p>₹{orderDetail?.itemsPrice?.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="container w-90 m-auto mt-2">
              <div className="row align-items-center">
                <div className="col-3">
                  <p>Shipping</p>
                </div>
                <div className="col text-end">
                  <p>₹{orderDetail?.shippingPrice?.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {orderDetail?.discountPrice != 0 && (
              // <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
              //   <h6 className="mb-0 lh-lg">Coupon Discount</h6>
              //   <p className="mb-0 lh-lg">
              //     {`₹${cartDetail?.discountPrice?.toFixed(2)} `}
              //   </p>
              // </div>
              <div className="container w-90 m-auto mt-2">
                <div className="row align-items-center">
                  <div className="col-3">
                    <p>Coupon Discount</p>
                  </div>
                  <div className="col text-end">
                    <p>₹{parseInt(orderDetail?.discountPrice)?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-300 my-3 w-90 mx-auto"></div>
            <div className="container w-90 m-auto mt-2">
              <div className="row align-items-center">
                <div className="col-4">
                  <p className="fs-18 font-semibold">Order Total</p>
                </div>
                <div className="col text-end">
                  <p className="fs-18 font-semibold">
                    ₹{orderDetail?.totalPrice?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterCosmetics />
    </React.Fragment>
  );
};

export default OrderConfirmation;
