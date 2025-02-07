import Header from "@src/components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Address from "./components/Address";
import AccountDetails from "./components/AccountDetails";
import {
  Bookmark,
  BookMarked,
  LogOut,
  MapPinned,
  Package,
  ShoppingCart,
  UserRoundCog,
} from "lucide-react";
import { getUserDetail } from "@src/api/services/userService";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewFooter from "@src/components/new_footer";
import HeaderCosmetics from "@src/components/HeaderCosmetics";

// Main Profile Component
function Profile() {
  const [activeTab, setActiveTab] = useState("Orders");
  const [profileData, setProfileData] = useState();
  const router = useRouter();

  // Function to handle tab change and route update
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update active section
    // router.push(`/profile/${tab}`); // Change the URL route
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await getUserDetail();
        console.log(res);
        setProfileData(res);
      } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
  }, []);


  return (
    <>
      <HeaderCosmetics />
      <div className="custom-bg px-5 py-3 custom-text px-md-10">
        <h1 className="afacad-flux fs-1 text-center fw-medium  display-5">
          My Account{" "}
        </h1>
        <p className="work-sans fs-5 text-center">Home / {activeTab}</p>
      </div>

      <div className="ps-lg-5 pe-lg-5 pt-lg-5 pb-lg-5 p-md-5 ps-2 pe-2 pt-4 pb-4 custom-text ">
        <h2 className="extrabold px-2 text-2xl md:text-4xl md:mx-4">
          My Profile
        </h2>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4 ">
              <div className="flex gap-2 items-center">
                <div className="bg-black w-10 h-10 rounded-full"></div>
                <div>
                  <span className="text-xs">Hello 👋</span>
                  <p className="text-sm font-semibold">{profileData?.name}</p>
                </div>
              </div>
              <hr className="mt-3 custom-hr-color nav flex-column gap-2 " />
              <ul className="d-flex flex-column gap-3 mt-3 fw-semibold small">
                <li
                  onClick={() => handleTabChange("Orders")}
                  className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 hover-bg  ${
                    activeTab === "Orders" && "custom-bg-2"
                  }`}
                >
                  <Package />
                  ORDERS
                </li>
                {/* <li
                  onClick={() => handleTabChange("Wishlist")}
                  className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 hover-bg  ${
                    activeTab === "Wishlist" && "custom-bg-2"
                  }`}
                >
                  <BookMarked />
                  WISHLIST
                </li> */}
                <li
                  onClick={() => handleTabChange("Address")}
                  className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 hover-bg  ${
                    activeTab === "Address" && "custom-bg-2"
                  }`}
                >
                  <MapPinned />
                  ADDRESS
                </li>
                <li
                  onClick={() => handleTabChange("Account Details")}
                  className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 hover-bg  ${
                    activeTab === "Account Details" && "custom-bg-2"
                  }`}
                >
                  <UserRoundCog />
                  ACCOUNT DETAILS
                </li>
                <li
                  onClick={() => {
                    handleTabChange("Logout");
                    localStorage.clear();
                    router.push(`/`)
                  }}
                  className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 hover-bg  ${
                    activeTab === "Logout" && "custom-bg-2"
                  }`}
                >
                  <LogOut />
                  LOGOUT
                </li>
              </ul>
            </div>

            <div
              className="col-8"
              style={{ overflow: "scroll", height: "60vh" }}
            >
              {activeTab === "Orders" && <Orders />}
              {activeTab === "Cart" && <Cart />}
              {/* {activeTab === "Wishlist" && <Wishlist />} */}
              {activeTab === "Address" && <Address />}
              {activeTab === "Account Details" && <AccountDetails />}
            </div>
          </div>
        </div>
      </div>
      <FooterCosmetics />
    </>
  );
}

export default Profile;
