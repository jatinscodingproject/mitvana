import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import cart1 from "@assets/images/shopping-cart/cart_image.png";
import Link from "next/link";
import { createOrder } from "@src/api/services/orderService";
import { useRouter } from "next/router";
import { useRouter as newUseRouter } from "next/navigation";
import { useCartStore } from "@src/store/cartStore";
import { getItem, removeItemByKey, setItem } from "@src/api/localStorage";
import LoginModal from "@src/components/Headers/LoginModal";
import {
  alppyCouponCode,
  validateCouponCode,
} from "@src/api/services/couponService";
import toast, { Toaster } from "react-hot-toast";

import { getCartProducts } from "@src/api/services/cartService";

const AddProductForm = ({ cartDetail, getCartDetail }) => {
  const { cart, quantities } = useCartStore();
  const [isChecked, setIsChecked] = useState(false);
  const [couponCode, setCouponCode] = useState();
  const token = getItem("accessToken");
  const [loginShow, setLoginShow] = useState(false);
  const [responseforCoupun, setResponseforCoupun] = useState();
  // console.log("cartDetail" , cartDetail.totalPrice)
  const [totalPrice, setTotalPrice] = useState("");

  // const subtotal = useMemo(() => {
  //   if (!cart?.items?.length) return 0;

  //   return cart.items.reduce((acc, item) => {
  //     const itemId = item?.product?._id;
  //     const quantity = quantities[itemId] || 1;
  //     const price = item?.product?.price || 0;

  //     return acc + price * quantity;
  //   }, 0);
  // }, [cart, quantities]);
  useEffect(() => {
    if (!token) {
      if (cartDetail && cartDetail.length > 0) {
        const calculatedTotal = cartDetail.reduce((acc, item) => {
          const quantity = quantities[item.productId] || item.quantity;
          const price = parseFloat(item?.discountedPrice || item?.price) || 0;
          return acc + price * quantity;
        }, 0);
        setTotalPrice(calculatedTotal.toFixed(2));
      }
    }
  }, [cartDetail, quantities]);

  useEffect(() => {
    localStorage.setItem("totalCartPrice", totalPrice);
  }, [totalPrice]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const router = useRouter();
  const Nrouter = newUseRouter();
  const handleOrderCreate = async () => {
    try {
      const obj = {
        couponCode,
      };
      const res = await createOrder(obj);
      if (isChecked && res?.order?._id) {
        router.push(`/checkout?order=${res.order._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleLoginClose = () => setLoginShow(false);

  useEffect(() => {
    const updateCoupon = async () => {
      const totalCartValue = token
        ? parseInt(cartDetail?.totalPrice)?.toFixed(2) || 0
        : totalPrice;
      if (couponCode) {
        await applyCoupon(couponCode, totalCartValue);
      }
    };

    updateCoupon();
  }, [cartDetail?.totalPrice, totalPrice]);

  async function handleApplyCoupon() {
    const totalCartValue = token
      ? parseInt(cartDetail?.totalPrice)?.toFixed(2) || 0
      : totalPrice;

    const iscart = await getCartProducts();
    if (iscart.items.length >= 1) {
      await applyCoupon(couponCode, totalCartValue);
    }
  }

  async function applyCoupon(couponCode, totalCartValue) {
    const response = await validateCouponCode(couponCode, totalCartValue);
    console.log("raw response --->", response);
    if (response.status == 200) {
      console.log("first if response?.data --->", response?.data);
      setResponseforCoupun(response?.data.coupon);
      setItem("coupon", couponCode);
    } else {
      setResponseforCoupun(null);
    }

    if (response.status == 200) {
      toast.dismiss();
      toast.success(response.data.message);
    } else {
      toast.dismiss();
      toast.error(response.response.data.message);
    }
  }


  useEffect(()=>{
    return ()=>{
      removeItemByKey("coupon");
    }
  },[])
  const handleClearCoupon = () => {
    setCouponCode("");
    removeItemByKey("coupon");
    Nrouter.refresh();
  };
  useEffect(() => {
    const iscoupun = getItem("coupon");
    if (iscoupun) {
      setCouponCode(iscoupun);
      handleApplyCoupon();
    }
  }, [couponCode]);
  return (
    <React.Fragment>
      <Row className="py-5 form-comman">
        <Col md={6}>
          {/* <label className="fs-14 mb-2" htmlFor="order" role="button">Add Order Note</label>
                    <textarea className="form-control rounded-0" id="order" placeholder="How can we help you ?" rows={6}></textarea> */}
          <div className="row">
            <div className="col-12 col-md-6">
              <label className="fs-14 mt-3 mb-2" htmlFor="coupon" role="button">
                Coupon:
              </label>
              <p className="text-muted">
                Coupon code will work on checkout page
              </p>
              <div
                className=""
                style={{
                  display: "flex",
                  gap: 20,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  className="form-control rounded-0 mt-2"
                  id="coupon"
                  type="text"
                  aria-label="default input example"
                  placeholder="Coupon code"
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ height: "4vh" }}
                  value={couponCode}
                />
                {couponCode ? (
                  <button
                    type="submit"
                    className=" btn btn-sm btn-danger rounded-pill mb-3 mt-3"
                    onClick={handleClearCoupon}
                    disabled={!couponCode}
                  >
                    X
                  </button>
                ) : (
                  ""
                )}
               
              </div>
              <button
                  type="submit"
                  className=" btn btn-teal px-5 py-2 rounded-pill mb-3 mt-2"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                >
                  Apply
                </button>
            </div>
          </div>
        </Col>
        <div className="col-md-6 text-md-end mt-4 mt-md-0">
          {responseforCoupun && (
            <div>
              <h3 style={{ color: "red" }}>
                Discount Applied {responseforCoupun.discountPercentage}%
              </h3>
              <h5 className="afacad-flux fs-20 mb-1 mt-1">
                ₹
                <span style={{ textDecoration: "line-through" }}>
                  {parseFloat(cartDetail?.totalPrice).toFixed(2)}
                </span>
              </h5>
              <h5 className="afacad-flux fs-20 mb-3">
                DISCOUNTED PRICE : ₹
                {token
                  ? (() => {
                      const subtotal = parseFloat(cartDetail?.totalPrice) || 0;
                      const discount =
                        (subtotal * responseforCoupun.discountPercentage) / 100;
                      const finalPrice = (subtotal - discount).toFixed(2);
                      return finalPrice;
                    })()
                  : totalPrice}
              </h5>
            </div>
          )}
          {!responseforCoupun && (
            <h5 className="afacad-flux fs-20 mb-3">
              SUBTOTAL : ₹
              {token
                ? parseFloat(cartDetail?.totalPrice).toFixed(2) || 0
                : totalPrice}
            </h5>
          )}
          <p className="text-muted mb-2 work-sans">
            Taxes, shipping and discounts codes calculated at checkout
          </p>
          <div className="text-muted mb-3">
            <input
              className="form-check-input rounded-0"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="flexCheckChecked"
              role="button"
              className="ms-1 work-sans"
            >
              I agree with the terms and conditions.
            </label>
          </div>
          {/* <Link href={isChecked && orderId ? `/checkout?order=${orderId}` : "#"}> */}
          <button
            type="submit"
            className=" btn btn-teal px-5 py-2 rounded-pill mb-3"
            disabled={!isChecked}
            onClick={token ? handleOrderCreate : handleLoginShow}
          >
            CHECK OUT
          </button>
          <LoginModal
            loginShow={loginShow}
            handleLoginClose={handleLoginClose}
          />
          {/* </Link> */}
        </div>
      </Row>
      <Toaster />
    </React.Fragment>
  );
};
export default AddProductForm;
