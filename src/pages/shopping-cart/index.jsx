"use client"
import React, { useEffect, useState } from "react";
import HomeSection from "@pages/shopping-cart/HomeSection";
import CartDetail from "@pages/shopping-cart/CartDetail";
import AddProductForm from "@pages/shopping-cart/AddProductForm";
import LikeProducts from "@pages/shopping-cart/LikeProduct";
import ViewedProduct from "./ViewProduct";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
import { getCartProducts } from "@src/api/services/cartService";
import { BounceLoader } from "react-spinners";
import FooterCosmetics from "@src/components/FooterCosmetics";
import CardOffers from "./CartOffers";
import TimeLineWind from "@src/components/TimeLineWind";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import MamaLoader from "@src/components/Loader";
import { useCartStore } from "@src/store/cartStore";
import useCart from "@src/store/useCart";
import { getItem } from "@src/api/localStorage";

const ShoppingCart = () => {
  const cartItem = useCart();
  const { totalPrice, setTotalPrice, cartItem: newCartItem } = useCartStore();
  const [cartDetail, setCartDetail] = useState({});
  const [loading, setloading] = useState(false);
  let token = getItem("accessToken");
  const getCartDetail = async () => {
    setloading(true);
    const res = await getCartProducts();
    setCartDetail(res);
    setTotalPrice(res?.totalPrice);
    setloading(false);
  };

  useEffect(() => {
    
    getCartDetail();
  }, []);

  return (
    <React.Fragment>
      <HeadTitle title="Cart" />
      <TopBanner />
      <HeaderCosmetics />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <MamaLoader />
        </div>
      )}

      <div className={loading ? "opacity-50" : ""}>
        <HomeSection />
        {/* <div className="w-1/2 m-auto py-20">
          <TimeLineWind />
        </div> */}
        <section>
          <div className="container">
            <div className="mt-md-5 pt-4">
              <CartDetail
                setloading={setloading}
                getCartDetailApi={getCartDetail}
                cartDetail={token ? cartDetail : newCartItem}
              />
              {token ? <>
                {cartDetail && cartDetail.items?.length !== 0 && (
                  <AddProductForm
                    totalPrice={totalPrice}
                    cartDetail={cartDetail}
                    getCartDetail={getCartDetail}
                  />
                )}
              </> : <>
              {newCartItem && newCartItem?.length !== 0 && (
                  <AddProductForm
                  totalPrice={totalPrice}
                  cartDetail={newCartItem}
                  getCartDetail={getCartDetail}
                />
              )}
                
              </>}
            </div>
          </div>
        </section>
      </div>
      <FooterCosmetics />
      {/* <PopupPage /> */}
    </React.Fragment>
  );
};

export default ShoppingCart;
