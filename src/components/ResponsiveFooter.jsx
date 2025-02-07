import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import SearchModal from "@src/components/Headers/SearchModal";
import LoginModal from "@src/components/Headers/LoginModal";
import { getItem } from "@src/api/localStorage";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useCartStore } from "@src/store/cartStore";

const ResponsiveFooter = () => {
  const [shoppingShow, setShoppingShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const { cartDetail, wishlistDetail, getCartDetail, getWishlistDetail } =
    useContext(CartWishlistContext);
  const { setCartItem, cartItem: newCartItem } = useCartStore();

  const handleShoppingClose = () => setShoppingShow(false);
  const handleShoppingShow = () => setShoppingShow(true);
  const handleClose = () => setSearchShow(false);
  const handleShow = () => setSearchShow(true);
  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleLoginClose = () => setLoginShow(false);

  const token = getItem("accessToken");

  useEffect(() => {
    getCartDetail();
    getWishlistDetail();
  }, [token]);
  return (
    <React.Fragment>
      <div className="responsive-footer d-lg-none position-fixed bottom-0 start-0 end-0 d-flex align-items-center justify-content-around gap-3 py-2 z-2">
        <Link href="/shop">
          <div className="toolbar_icon text-center"></div>
          <h6 className="fw-medium fs-12 pt-2 mb-0">Shop</h6>
        </Link>

        {token && (
          <Link href="/wishlist">
            <div className="toolbar_icon text-center icon3 position-relative">
              {wishlistDetail?.length > 0 && (
                <span className="position-absolute top-0 tag">
                  {wishlistDetail?.length}
                </span>
              )}
            </div>
            <h6 className="fw-medium fs-12 pt-2 mb-0">Wishlist</h6>
          </Link>
        )}

        {/* {token ? (
          <Link
            data-bs-toggle="offcanvas"
            href="/shopping-cart"
            aria-controls="shoppingCartOffcanvas"
            // onClick={handleShoppingShow}
          >
            <i className="iccl iccl-cart"></i>
            {cartDetail?.items && cartDetail?.items.length > 0 && (
              <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                {cartDetail?.items?.length}
              </span>
            )}
          </Link>
        ) : (
          <Link
            data-bs-toggle="offcanvas"
            href="/shopping-cart"
            aria-controls="shoppingCartOffcanvas"
            // onClick={handleShoppingShow}
          >
            <i className="iccl iccl-cart"></i>
            {newCartItem?.length > 0 && (
              <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                {newCartItem?.length}
              </span>
            )}
          </Link>
        )} */}

        {token ? (
          <Link
            data-bs-toggle="offcanvas"
            href="/shopping-cart"
            aria-controls="shoppingCartOffcanvas"
          >
            <div className="toolbar_icon text-center icon4">
              {cartDetail?.items && cartDetail?.items.length > 0 && (
                <span className="position-absolute top-0 tag">
                  {cartDetail?.items.length}
                </span>
              )}
            </div>
            <h6 className="fw-medium fs-12 pt-2 ms-2 mb-0">Cart</h6>
          </Link>
        ) : (
          <Link
            data-bs-toggle="offcanvas"
            href="/shopping-cart"
            aria-controls="shoppingCartOffcanvas"
          >
            <div className="toolbar_icon text-center icon4">
            {newCartItem?.length > 0 && (
                <span className="position-absolute top-0 tag">
                  {newCartItem?.length}
                </span>
              )}
            </div>
            <h6 className="fw-medium fs-12 pt-2 ms-2 mb-0">Cart</h6>
          </Link>
        )}

        {!token && (
          <Link
            data-bs-toggle="offcanvas"
            href="#accountOffcanvas"
            onClick={handleLoginShow}
          >
            <div className="toolbar_icon text-center icon5"></div>
            <h6 className="fw-medium fs-12 pt-2 mb-0">Account</h6>
          </Link>
        )}

        {/* <Link
          data-bs-toggle="offcanvas"
          href="#searchOffcanvas"
          aria-controls="searchOffcanvas"
          onClick={handleShow}
        >
          <div className="toolbar_icon text-center icon6"></div>
          <h6 className="fw-medium fs-12 pt-2 mb-0">Search</h6>
        </Link> */}
      </div>
      <ShoppingCardModal
        shoppingShow={shoppingShow}
        handleShoppingClose={handleShoppingClose}
      />
      <SearchModal show={searchShow} handleClose={handleClose} />
      <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
    </React.Fragment>
  );
};
export default ResponsiveFooter;
