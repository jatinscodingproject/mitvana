import React, { useEffect, useState } from "react";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "./FilterTab";
import ShopNavbar from "@src/commonsections/ShopNavbar";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import Link from "next/link";
import { getWishlistProducts } from "@src/api/services/wishlistService";
import { BounceLoader } from "react-spinners";
import FooterCosmetics from "@src/components/FooterCosmetics";
import shopBanner from '@assets/images/shop/shop-banner.jpg'
import HeaderCosmetics from "@src/components/HeaderCosmetics";

const Shop = () => {
  const [WishlistDetail, setWishlistDetail] = useState([]);
  const [loading, setloading] = useState(false);

  const getWishlistDetail = async () => {
    setloading(true);
    const res = await getWishlistProducts();
    console.log("hello--->", res);
    setWishlistDetail(res);
    setloading(false);
  };
  useEffect(() => {
    getWishlistDetail();
  }, []);

  if (loading) {
    return <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Full viewport height
      width: "100vw", // Full viewport width
    }}
  >
    <BounceLoader color="#193A43" />
  </div>
  }

  return (
    <React.Fragment>
      <TopBanner />

      {/* header */}
      <HeaderCosmetics />

      {/* <ShopNavbar /> */}

      <React.Fragment>
        <div
          style={{
            backgroundImage: `url(${shopBanner.src})`,
            backgroundPosition: "center",
          }}
          className="position-relative"
        >
          <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
          <div className=" container">
            <div className="text-white text-center py-5 position-relative">
              <h2 style={{ fontSize: "50px" }} className="fs-80 fw-medium">
                Wishlist
              </h2>
              {/* <p className="fs-14">Shop through our latest selection of Women’s Clothing and Accessories.</p> */}
            </div>
          </div>
        </div>
      </React.Fragment>

      {/* filterTab */}

      <FilterTab
        WishlistDetail={WishlistDetail}
        getWishlistDetail={getWishlistDetail}
      />
      {/* <div className="filter-pagination">
        <ul className="pagination py-4 d-flex justify-content-center">
          <li className="active">
            <Link href="#" className="text-danger">
              1
            </Link>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">Next</a>
          </li>
        </ul>
      </div> */}
      <FooterCosmetics />
      {/* <PopupPage /> */}
    </React.Fragment>
  );
};
export default Shop;
