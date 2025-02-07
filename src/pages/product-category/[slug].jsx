import React, { useState } from "react";
import ShopNavbar from "@src/commonsections/ShopNavbar";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@src/pages/shop/FilterTab";
import Link from "next/link";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewFooter from "@src/components/new_footer";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();

  const [loginShow, setLoginShow] = useState(false);

  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleLoginClose = () => setLoginShow(false);
  return (
    <React.Fragment>
      <HeadTitle title="Mitvana - Shop" />
      <TopBanner />
      <HeaderCosmetics />

      <div>
        <WomenColting />
        <FilterTab
          handleLoginShow={handleLoginShow}
          SelectedCategory={router.query.slug}
        />
      </div>
      <FooterCosmetics />

      {/* <PopupPage /> */}
    </React.Fragment>
  );
};
export default Category;
