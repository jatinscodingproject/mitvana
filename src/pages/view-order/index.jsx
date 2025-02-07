import React, { useEffect, useState } from "react";
import TopBanner from "@src/components/Headers/TopBanner";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { getOrderByOrderId } from "@src/api/services/orderService";
import { backendUrl } from "@src/api/axios";

const ViewOrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [orderDetail, setOrderDetail] = useState();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await getOrderByOrderId(orderId);
        console.log(res);
        setOrderDetail(res?.order);
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
      <HeadTitle title="Order Detail" />
      <HeaderCosmetics />

      <div className="container my-5" style={{ width: "80%" }}>
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <h1 className="fs-28 font-semibold">Order Details!</h1>
            <p className="my-3 afacad-flux text-lg">
              Here's everything you need to know about your order.
            </p>

            <h3 className="fs-20 mb-3 mt-4" style={{ fontWeight: 500 }}>
              Billing Address
            </h3>
            <div className="mb-2 ">
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
            {orderDetail?.orderStatus  !== "Cancelled By user" ? 
              (
                <div className="my-4 md:flex gap-4">
                  <Button
                    type="button"
                    onClick={() => handleDownload(orderDetail)}
                    className="btn btn-teal my-3 px-3 py-2 fw-bold rounded-pill w-full"
                  >
                    Download Invoice
                  </Button>
                  {/* <Button
                    type="button"
                    className="btn btn-teal my-3 px-3 py-2 fw-bold rounded-pill w-full"
                    onClick={()=>{
                      router.push(`/order-track?orderId=${orderId}`);
                    }}
                  >
                    Track your order
                  </Button> */}
                </div>
              )
            : (
              <div class="alert alert-danger" role="alert">
                Order Cancelled By user
              </div>
            )}
            
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
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <img
                    style={{ height: "4rem", objectFit: "cover" }}
                    alt=""
                    width={100}
                    src={backendUrl + item?.product?.thumbnail}
                  />
                </div>
                <div className="col-6">
                  <h4 className="font-semibold">
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

export default ViewOrderDetails;
