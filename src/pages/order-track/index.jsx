import React, { useEffect, useState } from "react";
import TopBanner from "@src/components/Headers/TopBanner";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import NewFooter from "@src/components/new_footer";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import {
  getOrderByOrderId,
  getOrderTrackDetailByOrderId,
} from "@src/api/services/orderService";
import { backendUrl } from "@src/api/axios";
import Link from "next/link";
import { Check, X } from "lucide-react";
const OrderTrack = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [orderDetail, setOrderDetail] = useState();
  const [trackingDetail, setTrackingDetail] = useState();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const obj = {
          orderId,
        };
        const res = await getOrderTrackDetailByOrderId(obj);
        console.log(res.trackingDetails[0]);
        setOrderDetail(res?.orderDetail);
        setTrackingDetail(res?.trackingDetails[0]);
        if (res?.trackingDetail && res?.trackingDetail[0]) {
          if (res?.trackingDetail) {
            const latestTag = res?.trackingDetail?.tag;
            if (latestTag === "InfoReceived") {
              setProgressWidth(10);
              setOrderStatus({
                title: "Ordered",
                desc: "Your order has been placed",
              });
            } else if (latestTag == "PickedUp" || latestTag == "InTransit") {
              setProgressWidth(40);
              setOrderStatus({
                title: "Shipped",
                desc: "Your order has been shipped and is on its way.",
              });
            } else if (latestTag == "OutForDelivery") {
              setProgressWidth(70);
              setOrderStatus({
                title: "Out for delivery",
                desc: "Your order is out for delivery and will reach you soon.",
              });
            } else if (latestTag == "Delivered") {
              setProgressWidth(100);
              setOrderStatus({
                title: "Delivered",
                desc: "Your order has been successfully delivered. Thank you for shopping with us!",
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (orderId) fetchOrderDetail();
  }, [orderId]);

  function formatDeliveryDate(inputDate) {
    const dateObject = new Date(inputDate);
    const options = { weekday: "long", day: "2-digit", month: "short" };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    return formattedDate.replace(",", " ,");
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const [progressWidth, setProgressWidth] = useState(10);
  const [orderStatus, setOrderStatus] = useState({
    title: "Ordered",
    desc: "Your order has been placed",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <React.Fragment>
      <HeadTitle title="Thank you for your order" />
      <HeaderCosmetics />
      <div className="container mb-10">
        <div className="flex justify-between items-center ">
          {trackingDetail?.expected_delivery_date && (
            <h3 className="text-2xl font-semibold">
              Arrving{" "}
              {formatDeliveryDate(trackingDetail?.expected_delivery_date)}
            </h3>
          )}

          <a href="/profile" className="text-base font-semibold text-blue-500">
            See all orders
          </a>
        </div>
        {/* <div className="mt-3">
          <div className="h-20 w-20 bg-gray-200"></div>
        </div> */}
        <hr className="border-4 my-3" />
        <div>
          <div className="text-center">
            <h4 className="text-2xl font-bold">{orderStatus?.title}</h4>
            <p className="font-semibold text-lg">{orderStatus?.desc} </p>
          </div>

          <div className="mt-[50px] flex justify-center w-full flex-col items-center">
            <div className=" flex justify-center relative w-4/5">
              <div className="h-1 bg-gray-400 rounded-full w-full"></div>
              <div
                style={{ width: `${progressWidth}%` }}
                className="absolute h-2 bg-blue-500 left-0 top-1/2 -translate-y-1/2 rounded-full"
              ></div>
              <div className="w-full absolute top-1/2 -translate-y-1/2 flex justify-between">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full border-2 bg-blue-500 border-blue-500 text-white grid place-items-center">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 mt-2 font-semibold text-base">
                    Ordered
                  </p>
                </div>
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full border-2 text-white grid place-items-center ${
                      progressWidth >= 40
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 mt-2 font-semibold text-base">
                    Shipped
                  </p>
                </div>
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full border-2 text-white grid place-items-center ${
                      progressWidth >= 70
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 mt-2 font-semibold text-base md:min-w-32">
                    Out for delivery
                  </p>
                </div>
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full border-2 text-white grid place-items-center ${
                      progressWidth >= 100
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 mt-2 font-semibold text-base">
                    Delivered
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-[60px]">
            <div className="border-4 w-full min-h-20 p-4 max-h-fit">
              <p className="font-bold text-lg">Shipping Address</p>
              <div className="mt-2">
                <p className="font-medium">
                  {orderDetail?.shippingAddress?.firstName +
                    " " +
                    orderDetail?.shippingAddress?.lastName}
                </p>
                <p className="font-medium">
                  {orderDetail?.shippingAddress?.address},{" "}
                  {orderDetail?.shippingAddress?.address2}{" "}
                </p>
                <p className="font-medium">
                  {orderDetail?.shippingAddress?.city},{" "}
                  {orderDetail?.shippingAddress?.state} -{" "}
                  {orderDetail?.shippingAddress?.postalCode}
                </p>
              </div>
            </div>
            <div className="border-4 w-full min-h-20 p-4 max-h-fit">
              <p className="font-bold text-lg">Shipped with Mitvana</p>
              <div className="mt-2">
                <p className="font-medium">
                  Tracking ID:{" "}
                  {orderDetail?.shipmentDetails?.trackingNumbers[0]}
                </p>
                {orderDetail?.shipmentDetails?.trackingLink && (
                  <p className="font-medium">
                    Tracking Link: {orderDetail?.shipmentDetails?.trackingLink}
                  </p>
                )}

                <button
                  className="font-medium text-base text-blue-500"
                  onClick={toggleModal}
                >
                  see all updates
                </button>
              </div>
            </div>
            <div className="border-4 w-full min-h-20 p-4 max-h-fit">
              <p className="font-bold text-lg">Order Info</p>
              <div className="mt-2">
                <Link href={`/order-confirmation?orderId=${orderId}`}>
                  <button className="font-medium text-base text-blue-500">
                    View Order Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-800 bg-opacity-20 z-50 flex items-center justify-center"
          onClick={toggleModal} // Close modal on clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-lg">Shipped with Mitvana</p>
                <p className="font-medium">
                  Tracking ID:{" "}
                  {orderDetail?.shipmentDetails?.trackingNumbers[0]}
                </p>
              </div>
              <button onClick={toggleModal}>
                <X size={24} />
              </button>
            </div>

            {/* Tracking Info */}
            <div className="space-y-6">
              {trackingDetail?.checkpoints?.map((checkpoint, index) => (
                <div>
                  <div key={index} className="space-y-4">
                    <p className="font-semibold">
                      {formatDate(checkpoint?.date)}
                    </p>
                    <div className="flex gap-4">
                      <div className="border-r w-1/5">
                        <p className="text-sm">
                          {formatTime(checkpoint?.date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">{checkpoint?.remark}</p>
                        <span className="text-xs">{checkpoint?.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <FooterCosmetics />
    </React.Fragment>
  );
};

export default OrderTrack;
