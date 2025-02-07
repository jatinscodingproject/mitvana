import React, { useEffect, useState } from "react";
import HomeSection from "@pages/home-cosmetics/HomeSection";
import CatSection from "@pages/home-cosmetics/CatSection";
import ImageList from "@pages/home-cosmetics/ImageList";
import BrandList from "@pages/home-cosmetics/BrandList";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewArrival from "@pages/home-cosmetics/NewArrival";
import NowTrending from "@pages/home-cosmetics/NowTrending";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import PopupPage from "@src/components/Popup";
import Topbnner from "@pages/home-cosmetics/Topbnner";
import HeadTitle from "@src/commonsections/HeadTitle";
import Promises from "@src/components/home/Promises";
import Countries from "@src/components/home/Countries";
import Commitment from "@src/components/home/Commitment";
import BestSeller from "../home-electric-vertical/BestSeller";
import Bestseller from "@src/components/home/Bestseller";
import { getProductForHomePage } from "@src/api/services/productService";
import NewFooter from "@src/components/new_footer";

const HomeCosmetics = () => {
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  useEffect(() => {
    document.body.classList.add("wrapper_cus");
    return () => {
      document.body.classList.remove("wrapper_cus");
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const res = await getProductForHomePage();
      console.log(res);
      setNewArrival(res?.newArrivalProducts);
      setTrendingProduct(res?.trendingProducts);
    };
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <HeadTitle title="Mitvana" />
      {/* <Topbnner /> */}
      <HeaderCosmetics />

      <div>
        {/* slider */}
        <HomeSection />
        {/* Now trending */}

        {trendingProduct?.length > 0 && (
          <NowTrending products={trendingProduct} />
        )}

        <Promises />

        {newArrival?.length > 0 && <NewArrival products={newArrival} />}
        <Countries />

        <Commitment />
       
        {/* <ImageList /> */}
        {/* footer */}
        <FooterCosmetics />
        {/* <PopupPage /> */}
      </div>
    </React.Fragment>
  );
};

export default HomeCosmetics;
