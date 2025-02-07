import React, { useState, useEffect, useContext } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import AddToCardModal from "@src/commonsections/AddToCardModal";
// import Dropdown from 'react-bootstrap/Dropdown';
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "rc-slider/assets/index.css";
import { useRouter } from "next/navigation";
import { backendUrl } from "@src/api/axios";
import { useProduct } from "@src/context/ProductContext";
import { getItem, setItem } from "@src/api/localStorage";
import { useSearchStore } from "@src/store/searchStore";
import { addProductOnCart } from "@src/api/services/cartService";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useCartStore } from "@src/store/cartStore";
import {
  addProductOnWishlist,
  removeProductFromWishlist,
} from "@src/api/services/wishlistService";
import { motion } from "framer-motion";
import NotifyMeModal from "@src/commonsections/NotifyMeModal";

const ProductCard = ({
  handleLoginShow,
  product,
  colWidth,
  handleShow,
  handleAddToCardModalShow,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCartItem } = useCartStore();
  const { setProductId } = useProduct();
  const { getCartDetail, getWishlistDetail, wishlistDetail } =
    useContext(CartWishlistContext);
  const { selectedColor } = useSearchStore();
  const [wishlistedProducts, setWishlistedProducts] = useState([]);

  const isVideo = (media) => {
    return media?.endsWith(".mp4") || media?.endsWith(".webm");
  };

  const token = getItem("accessToken");

  const handleAddtoCart = async (product, color) => {
    try {
      if (!token) {
        const existingCartItems = getItem("cartItem") || [];
        const isProductInCart = existingCartItems.some(
          (item) => item.productId === product?._id
        );

        if (!isProductInCart) {
          const obj = {
            productTitle: product?.productTitle,
            productId: product?._id,
            quantity: 1,
            selectedColor: color,
            thumbnail: product?.thumbnail,
            price: product?.price,
            discountedPrice: product?.discountedPrice,
          };
          existingCartItems.push(obj);
          setCartItem(existingCartItems);
          setItem("cartItem", existingCartItems);
          toast.success("item added to Cart", {
            position: "top-center",
            autoClose: 3000,
          });
          // localStorage.setItem("cartItem", JSON.stringify(existingCartItems));
        }

        // handleLoginShow();
        return;
      }

      const obj = {
        productId: product?._id,
        quantity: 1,
        selectedColor: color,
      };

      await addProductOnCart(obj);
      toast.dismiss();
      toast.success("item added to Cart", {
        position: "top-center",
        autoClose: 3000,
      });

      await getCartDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlistAdd = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const obj = {
        productId: product?._id,
      };
      const response = await addProductOnWishlist(obj);
      if (response) {
        toast.dismiss();
        toast.success("Product added to Wishlist", {
          position: "top-center",
          autoClose: 3000,
        });
        await getWishlistDetail();
      }
    } catch (error) {
      console.log("✌️error from wishlist vala --->", error);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  const router = useRouter();
  const handleClick = () => {
    localStorage.setItem("productId", product._id);
    setProductId(product._id);
    router.push(`/product/${product.productCustomUrl}`);
  };
  const isProductInWishlist = wishlistDetail?.some(
    (item) => item.product._id === product?._id
  );

  const handleRemoveWishlist = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const res = await removeProductFromWishlist(product._id);
      if (res && res == true) {
        window.location.reload();
        getWishlistDetail()
      };
    } catch (error) {
      console.log(error);
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();

  const handleNotifyMeModalClose = () => {
    setModalShow(false);
  };

  const handleNotifyMeClick = (product) => {
    setSelectedProductId(product._id);
    setModalShow(true);
  };
  return (
    <React.Fragment>
      <div className={`col-md-${colWidth} col-12`}>
        <div
          className="topbar-product-card pb-3 w-100 afacad-flux flex justify-between h-full flex-col cursor-pointer"
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="position-relative overflow-hidden flex flex-col gap-4 h-full justify-between image-container">
            {product && product?.thumbnail && (
              <>
                <div className="aspect-square flex items-center justify-center overflow-hidden relative">
                  <img
                    src={backendUrl + product?.thumbnail}
                    alt={product.name}
                    className={`absolute inset-0 w-auto h-auto max-h-[900px] max-w-full transition-opacity duration-300 delay-300 ${
                      isHovered ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  {product.images?.length > 0 &&
                    !isVideo(product.images[0]) && (
                      <img
                        src={backendUrl + product.images[0]}
                        alt={product.name}
                        className={`absolute inset-0 w-auto h-auto max-h-[900px] max-w-full transition-opacity delay-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                </div>
                <button
                  className="hover:bg-sky-700 cursor-pointer z-[1] text-gray-50 bg-[#193A43] py-2"
                  onClick={(e) => {
                    console.log("selectedColor", selectedColor);
                    e.stopPropagation();
                    product.stock > 0
                      ? handleAddtoCart(product, selectedColor)
                      : handleNotifyMeClick(product);
                  }}
                >
                  {product.stock > 0 ? "Add to Cart" : "Notify Me"}
                </button>
              </>
            )}

            {product?.images?.length > 1 && (
              <div
                className="video-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: isHovered ? "block" : "none",
                }}
              >
                {isVideo(product?.images[1]) && (
                  <video
                    autoPlay
                    loop
                    muted
                    width="100%"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                  >
                    <source
                      src={backendUrl + product?.images[1]}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
            {product && product._id && (
              <Link
                href="#"
                className="d-lg-none position-absolute"
                style={{ zIndex: 1, top: 25, left: 10 }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Add to Wishlist"
              >
                {isProductInWishlist ? (
                  <FaHeart
                    onClick={(e) => handleRemoveWishlist(e)}
                    style={{ color: "red" }}
                  />
                ) : (
                  <CiHeart onClick={(e) => handleWishlistAdd(e)} />
                )}
                {/* <i className="facl facl-heart-o text-black" style={{ color: 'red' }}></i> */}
              </Link>
            )}
            {product && product._id && (
              <Link
                href=""
                className="wishlistadd d-none d-lg-flex position-absolute"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Add to Wishlist"
              >
                {isProductInWishlist ? (
                  <FaHeart
                    style={{ color: "black" }}
                    onClick={(e) => handleRemoveWishlist(e)}
                  />
                ) : (
                  <CiHeart onClick={(e) => handleWishlistAdd(e)} />
                )}
                {/* <i className="facl facl-heart-o text-black" style={{ color: 'red' }}></i> */}
              </Link>
            )}
            {/* <div
              className="position-absolute d-lg-none -bottom-20 end-0 d-flex flex-column bg-white rounded-pill m-2"
              style={{ zIndex: 1 }}
            >
              <button
                type="button"
                className="btn responsive-cart rounded-pill fs-14 p-2"
                style={{ width: 36, height: 36 }}
                data-bs-toggle="modal"
                data-bs-target="#cardModal"
                onClick={handleAddToCardModalShow}
              >
                <i className="iccl iccl-cart fw-semibold"></i>
              </button>
            </div> */}
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link
                href=""
                data-bs-toggle="modal"
                className="btn rounded-pill fs-14"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShow(product);
                }}
              >
                <span>Quick View</span>
                <i className="iccl iccl-eye"></i>
              </Link>
            </div>
            <p className="absolute top-0 w-fit h-fit px-2 bg-red-400 ">
              {product?.tags?.length > 0 && product?.tags[0]?.name}
            </p>
          </div>
          <div className="mt-3">
            <h6 className="mb-1 fw-medium text-center">
              <button className="text-center main_link_acid_green line-clamp-1 w-100">
                {product?.name}
              </button>
            </h6>
            {product?.discountedPrice ? (
              <p className="mb-0 fs-16 text-center">
                <del className="text-muted">
                  ₹{parseInt(product.price)?.toFixed(2)}
                </del>
                &nbsp;
                <span className="">
                  ₹{parseInt(product?.discountedPrice)?.toFixed(2)}
                </span>
              </p>
            ) : (
              <p className="mb-0 fs-16 text-center">
                <span>₹{parseInt(product?.price)?.toFixed(2)}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <Toaster />

      <NotifyMeModal
        modalShow={modalShow}
        handleNotifyMeModalClose={handleNotifyMeModalClose}
        selectedProductId={selectedProductId}
      />
    </React.Fragment>
  );
};

export default ProductCard;
