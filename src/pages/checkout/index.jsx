import React, { use, useEffect, useState } from "react";

import cart from "@assets/images/shopping-cart/shopping-cart-head.jpg";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FooterPage from "@src/components/Footer";
import Image from "next/image";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import HeadTitle from "@src/commonsections/HeadTitle";
import { getCartProducts } from "@src/api/services/cartService";
import { getShippingCharges } from "@src/api/services/shippingCharges";
import { getAddress, getUserDetail } from "@src/api/services/userService";
import "react-toastify/dist/ReactToastify.css";
import FooterCosmetics from "@src/components/FooterCosmetics";

import { useRouter } from "next/router";
import {
  addOrderAddress,
  createRazorpayOrder,
  getOrder,
  getShippingPriceDetail,
  updateOrderStatus,
} from "@src/api/services/orderService";
import NewFooter from "@src/components/new_footer";
import TimeLineWind from "@src/components/TimeLineWind";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import MamaLoader from "@src/components/Loader";
import EditAddressModal from "@src/components/Headers/EditAddressModal";
import toast, { Toaster } from "react-hot-toast";
import { removeItem } from "@src/api/localStorage";

const Checkout = () => {
  const router = useRouter();
  const { order } = router.query;
  const { error, isLoading, Razorpay } = useRazorpay();
  const [razorpayOrderId, setRazorpayOrderId] = useState("");
  const [editAddressShow, setEditAddressShow] = useState(false);
  const [addressDetail, setAddressDetail] = useState();

  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "India",
    address: "",
    apartment: "",
    city: "",
    state: "Texas",
    zipcode: "",
    phone: "",
    email: "",
    orderNotes: "",
    paymentMethod: "COD",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    termsAccepted: false,
  });
  const [userAddress, setUserAddress] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [shippingChargesState, setShippingChargesState] = useState();

  const handleSelectAddress = async (id) => {
    // Toggle selection: if the selected address is clicked again, deselect it

    const obj = {
      addressId: id,
    };

    const res = await getShippingPriceDetail(obj , order);
    if(order) await getOrderDetail()
    console.log("Pricing", res?.shippingCharges);
    setShippingChargesState(res?.shippingCharges);

    setSelectedAddressId((prevId) => (prevId === id ? null : id));
  };
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };
  const togglePaymentInfo = (method) => {
    setPaymentMethod(method);
  };

  const handleEditAddressClose = () => {
    setEditAddressShow(false);
  };

  const [cartDetail, setCartDetail] = useState({});
  const [settings, setSettings] = useState();

  const getOrderDetail = async () => {
    const res = await getOrder(order);
    console.log("hello " , res?.order?.shippingPrice    );
    setCartDetail(res?.order);
  };

  useEffect(() => {
    const getSettings = async () => {
      const res = await getShippingCharges();
      setSettings(res);
    };

    if (order) getOrderDetail();
    getSettings();
  }, [order]);

  // Handler to toggle termsAccepted
  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: e.target.checked, // true when checked, false when unchecked
    }));
  };

  const handlePlaceOrder = async (paymentId) => {
    // 5000
    setloading(true);
    const obj = {
      addressId: selectedAddressId,
      shippingNote: formData.orderNotes,
      paymentId,
    };

    const res = await addOrderAddress(order, obj);

    if (res && paymentId && res.success && res.success == true) {
      router.push(`/order-confirmation?orderId=${order}`);
    }
    setloading(false);
  };

  const handleRazorpayPayment = (e) => {
    e.preventDefault();

    if (!selectedAddressId) {
      setAddressErrorMsg("Please select address");
      // toast.error("Please select address");
      return;
    }

    const totalPrice = (
      cartDetail?.totalPrice + (parseInt(cartDetail?.shippingPrice) || 0)
    )?.toFixed(2);

    console.log(cartDetail)

    const options = {
      key: "rzp_test_4mWUsqP1IWOwZa",
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      name: "Mitvana",
      order_id: razorpayOrderId, // Generate order_id on server
      handler: async (response) => {
        if (response?.razorpay_payment_id) {
          try {
            await handlePlaceOrder(response?.razorpay_payment_id);
            toast.dismiss();
            toast.success("Order placed successfully!");
          } catch (error) {
            toast.dismiss();
            toast.error("Failed to place order. Please contact support.");
          }
        } else {
          toast.dismiss();
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: cartDetail?.user?.name,
        email: cartDetail?.user?.email,
        contact: cartDetail?.user?.phone,
      },
      theme: {
        color: "#404969",
      },
      modal: {
        ondismiss: async () => {
          const responseForStatusUpdateOnPaymentFailed =
            await updateOrderStatus(order, "Payment Failed");
          console.log(
            "✌️responseForStatusUpdateOnPaymentFailed --->",
            responseForStatusUpdateOnPaymentFailed
          );
          await handlePlaceOrder();
        },
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  useEffect(() => {
    const getRazorpayOrderfunc = async () => {
      try {
        const res = await createRazorpayOrder(order);
        setRazorpayOrderId(res?.order?.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (order) getRazorpayOrderfunc();
  }, [order]);

  const getUserDetail = () => {
    getAddress()
      .then((res) => {
        setUserAddress(res?.address);
        setSelectedAddressId(res?.address[0]?._id);
      })
      .catch((error) => {
        console.error("Update address error:", error);
      });
  };

  useEffect(() => {
    getUserDetail();
  }, {});

  const totalSavings = cartDetail?.orderItems?.reduce((acc, product) => {
    const originalPrice = product.product.price;
    const discountedPrice = product.product.discountedPrice || originalPrice;
    return acc + (originalPrice - discountedPrice) * product.quantity;
  }, 0);

  const handleEditAddress = (item) => {
    setEditAddressShow(true);
    setAddressDetail(item);
  };
  const handleAddAddress = () => {
    setEditAddressShow(true);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <MamaLoader />
        <p className="mt-4 text-lg font-medium text-gray-600">
          Please wait, we are processing your order...
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <HeadTitle title="Checkout" />
      <TopBanner />

      {/* header */}
      <HeaderCosmetics />
      <div>
        <div
          style={{
            backgroundImage: `url(${cart.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="position-relative"
        >
          <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
          <Container>
            <div className="text-white text-center py-5 position-relative">
              <h4 className="fs-20 fw-medium afacad-flux">CHECKOUT</h4>
            </div>
          </Container>
        </div>

        {/* <div className="w-1/2 m-auto py-20">
          <TimeLineWind />
        </div> */}
      </div>

      {/* collection */}
      <section>
        <div className="container">
          <div className="row my-5">
            <div className="col-md-6 col-lg-7">
              <h3 className="border-bottom pb-3 mb-0 afacad-flux">
                Billing details
              </h3>
              <div
                className="filter-title mb-4 bg-teal"
                style={{ width: "134px" }}
              ></div>
              <div>
                <div className="d-flex justify-content-start">
                  <Button
                    className="hover:bg-sky-700 cursor-pointer z-[99] text-gray-50 bg-[#193A43] py-2"
                    onClick={handleAddAddress}
                    style={{ backgroundColor: "" }}
                  >
                    Add Address
                  </Button>
                </div>

                {userAddress?.length > 0 &&
                  userAddress.map((item, index) => {
                    const isSelected = selectedAddressId === item?._id;

                    return (
                      <div
                        key={item?._id}
                        className={`border p-3 rounded mt-3 ${
                          isSelected ? "bg-blue-100" : ""
                        }`}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={isSelected}
                          onChange={() => handleSelectAddress(item?._id)}
                          style={{ marginRight: "10px" }}
                        />

                        <div
                          style={{ width: "100%" }}
                          onClick={() => handleSelectAddress(item?._id)}
                        >
                          {isSelected && (
                            <p style={{ color: "#3B81F6" }} className="m-0">
                              Delivering to
                            </p>
                          )}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p className="fs-16 m-0">
                              {item?.firstName + " " + item?.lastName} |{" "}
                              {item?.addressType}
                            </p>
                            <button
                              className="button-bottom-border py-1 me-2"
                              onClick={() => handleEditAddress(item)}
                            >
                              Edit
                            </button>
                          </div>

                          <p className="fs-13 m-0">
                            {item?.address},{" "}
                            {item?.address2 ? item?.address2 + "," : ""}
                            {item?.city}, {item?.state}, {item?.country} -
                            {item?.postalCode}
                          </p>
                          <p className="fs-13 m-0">Mob: {item?.phoneNumber}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-5 pt-md-3">
                <h3 className="border-bottom pb-3 mb-0 afacad-flux">
                  Shipping Details
                </h3>
                <div
                  className="filter-title mb-4 bg-teal"
                  style={{ width: "134px" }}
                ></div>
                <div className="col-12">
                  <label className="fw-medium mb-2" htmlFor="orderNotes">
                    Order notes (optional)
                  </label>
                  <textarea
                    className="form-control border-radious-none"
                    style={{ borderRadius: "20px" }}
                    id="orderNotes"
                    placeholder="Notes about your order e.g. special notes for delivery."
                    rows={8}
                    value={formData.orderNotes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-5 mt-5 mt-md-0">
              <div className="checkout-order">
                <h3 className="border-bottom pb-3 mb-0 fs-22 afacad-flux">
                  Your order
                </h3>
                <div
                  className="filter-title mb-4 bg-teal"
                  style={{ width: "134px" }}
                ></div>
                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2 afacad-flux">
                  <h6 className="mb-0 lh-lg">Product</h6>
                  <h6 className="mb-0 lh-lg">Subtotal</h6>
                </div>
                {cartDetail?.orderItems?.length > 0 &&
                  cartDetail?.orderItems?.map((product) => {
                    return (
                      <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                        <h6 className="mb-0 lh-lg" style={{ width: "70%" }}>
                          <span className="fw-normal">
                            {product.product.name}
                          </span>{" "}
                          x {product?.quantity}
                        </h6>
                        <p className="mb-0 lh-lg">
                          ₹
                          {product?.product?.discountedPrice
                            ? parseInt(
                                product?.product?.discountedPrice
                              ).toFixed(2)
                            : parseInt(product?.product?.price).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}

                <div className="d-flex justify-content-between border-bottom mb-0 p-2">
                  <h6 className="mb-0">Subtotal</h6>
                  <p className="mb-0 ">₹{cartDetail?.itemsPrice?.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between border-bottom mb-0 p-2">
                  <h6 className="mb-0">Shipping Cost</h6>
                  <p className="mb-0">
                    {cartDetail?.shippingPrice === 0 ? (
                      <>
                        FREE {"  "}
                        <span className="text-decoration-line-through">₹59</span>
                      </>
                    ) : cartDetail?.itemsPrice?.toFixed(2) >
                      settings?.minCartValueForFreeShipping ? (
                      <>
                        FREE {"  "}
                        <span className="text-decoration-line-through">
                          ₹{cartDetail?.shippingPrice}
                        </span>
                      </>
                    ) : (
                      `₹${
                        shippingChargesState ||
                        parseInt(cartDetail?.shippingPrice).toFixed(2)
                      }`
                    )}
                  </p>
                </div>

                {totalSavings > 0 && (
                  <div className="d-flex justify-content-between border-bottom mb-0 p-2">
                    <h6 className="mb-0">Savings</h6>
                    <p className="mb-0">- ₹{totalSavings?.toFixed(2)}</p>
                  </div>
                )}
                {cartDetail?.discountPrice != 0 && (
                  <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                    <h6 className="mb-0 lh-lg">Coupon Discount</h6>
                    <p className="mb-0 lh-lg">
                      {`₹${cartDetail?.discountPrice?.toFixed(2)} `}
                    </p>
                  </div>
                )}

                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                  <h6 className="mb-0 lh-lg">Total</h6>
                  <p className="mb-0 lh-lg">
                    ₹{cartDetail?.totalPrice?.toFixed(2)}
                  </p>
                </div>

                <div>
                  <Form>
                    {/* Radio button for Credit Card */}
                    <p className="form-check-label fw-medium fs-13 mt-5 d-block">
                      Credit Card/Debit Card/NetBanking
                    </p>

                    <Image
                      height={70}
                      className="stripe-visa-icon"
                      alt="Visa"
                      width={180}
                      src={
                        "https://cdn.razorpay.com/static/assets/logo/rzp_payment_icon.svg"
                      }
                    />
                    <p className="py-1">
                      Pay securely by Credit or Debit card or Internet Banking
                      through Razorpay.
                    </p>

                    <p className="py-2">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </p>
                    <Form.Check
                      type="checkbox"
                      id="flexCheckDefault"
                      label="I have read and agree to the website terms and conditions *"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                    />

                    <Button
                      type="submit"
                      className="btn btn-teal my-3 px-5 py-3 fw-bold w-100 rounded-pill mb-2"
                      onClick={handleRazorpayPayment}
                      disabled={!formData.termsAccepted} // Disable button if termsAccepted is false
                    >
                      PLACE ORDER
                    </Button>
                    {addressErrorMsg && (
                      <p className="mt-0 text-sm fs-20 text-red-600 font-medium">
                        *{addressErrorMsg}
                      </p>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditAddressModal
        handleEditAddressClose={handleEditAddressClose}
        editAddressShow={editAddressShow}
        addressDetail={addressDetail}
        getUserDetail={getUserDetail}
      />
      <FooterCosmetics />
      <Toaster />
    </React.Fragment>
  );
};

export default Checkout;
