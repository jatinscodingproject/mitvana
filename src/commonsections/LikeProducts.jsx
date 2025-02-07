import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "flickity/css/flickity.css";

import Image from "next/image";
import ProductModal from "./ProductModal";
import AddToCardModal from "./AddToCardModal";
import {
  getProductByCategoryId,
  getProductByCategoryIdLiked,
} from "@src/api/services/productService";
import { backendUrl } from "@src/api/axios";
import { Rating } from "@mui/material";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { addProductOnWishlist } from "@src/api/services/wishlistService";
import toast from "react-hot-toast";
import { trauncateString } from "@src/lib/trauncateString";
import { getItem, setItem } from "@src/api/localStorage";
import NotifyMeModal from "./NotifyMeModal";
import { useCartStore } from "@src/store/cartStore";
import { addProductOnCart } from "@src/api/services/cartService";

const LikeProducts = ({
  handleLoginShow,
  categoryID,
  currentProductId,
  relatedProduct,
}) => {
  const flickityRef = useRef(null);
  const { getWishlistDetail } = useContext(CartWishlistContext);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered product by index

  useEffect(() => {
    if (typeof window !== "undefined" && flickityRef.current === null) {
      const FlickityClass = require("flickity");
      flickityRef.current = new FlickityClass(".slideshow", {
        imagesLoaded: false,
        adaptiveHeight: false,
        contain: true,
        groupCells: "100%",
        dragThreshold: 5,
        cellAlign: "left",
        wrapAround: true,
        prevNextButtons: false,
        percentPosition: true,
        pageDots: false,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        rightToLeft: false,
      });
    }

    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);

  const [show, setShow] = useState(false);
  const [key, setKey] = useState("home");
  const [cardShow, setCardShow] = useState(false);
  const [products, setProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByCategoryIdLiked(categoryID);
        setProducts(res.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    if (relatedProduct?.length > 0) {
      setProducts(relatedProduct);
      return;
    } else if (categoryID) {
      fetchProduct();
    }
  }, [categoryID, relatedProduct]);

  const handleWishlistAdd = async (e, product) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const token = getItem("accessToken");
      if (!token) {
        handleLoginShow();
        return;
      }
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

  const token = getItem("accessToken");
  const { setCartItem } = useCartStore();

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
      <Row className="mt-4 my-sm-4 pt-2 py-sm-2 slideshow">
        {products &&
          products?.length > 0 &&
          products
            ?.filter((item) => item._id != currentProductId)
            ?.map((product, index) => {
              let priceDisplay = product?.discountedPrice
                ? product?.discountedPrice
                : product?.price;
              return (
                <Col md={3} className="col-6 px-lg-12 px-2" key={index}>
                  <Link
                    href={`/product/${product.productCustomUrl}`}
                    className="mt-3 d-block"
                  >
                    <div
                      className="topbar-product-card pb-3"
                      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                      onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
                    >
                      <div className="position-relative overflow-hidden">
                        {product?.images?.length > 1 ? (
                          <img
                            src={
                              hoveredIndex === index // Check if this product is being hovered
                                ? backendUrl + product?.images[0]
                                : backendUrl + product?.thumbnail
                            }
                            alt=""
                            className="img-fluid w-100 object-fit-cover"
                            style={{ height: "45vh" }}
                          />
                        ) : (
                          <img
                            src={backendUrl + product?.thumbnail}
                            alt=""
                            className="img-fluid w-100 object-fit-cover"
                            style={{ height: "45vh" }}
                          />
                        )}

                        <Link
                          href="#"
                          className="d-lg-none position-absolute"
                          style={{ zIndex: 1, top: "10px", left: "10px" }}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Add to Wishlist"
                          onClick={(e) => handleWishlistAdd(e, product)}
                        >
                          <i className="facl facl-heart-o text-white"></i>
                        </Link>
                        <Link
                          href="#"
                          className="wishlistadd d-none d-lg-flex position-absolute"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Add to Wishlist"
                          onClick={(e) => handleWishlistAdd(e, product)}
                        >
                          <i className="facl facl-heart-o text-white"></i>
                        </Link>

                        <div
                          className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                          style={{ zIndex: 1 }}
                        >
                          {/* <Link
                            href="#exampleModal"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: "36px", height: "36px" }}
                            data-bs-toggle="modal"
                            onClick={handleShow}
                          >
                            <i className="iccl iccl-eye fw-semibold"></i>
                          </Link> */}
                          {/* <button
                            type="button"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: "36px", height: "36px" }}
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                          >
                            <i className="iccl iccl-cart fw-semibold"></i>
                          </button> */}
                        </div>
                      </div>

                      <Link
                        href={`/product/${product.productCustomUrl}`}
                        className="mt-3 d-block"
                      >
                        <h2
                          className="mb-1 fs-18 text-center"
                          style={{ color: "#193A43" }}
                        >
                          {/* {product?.name?.length > 80
                            ? `${product.name.slice(0, 80)}...`
                            : product?.name} */}
                          {trauncateString(product?.name, 70)}
                        </h2>

                        <div className="flex items-center justify-center">
                          <div className="flex items-center">
                            <Rating
                              name="read-only"
                              value={1}
                              max={1}
                              readOnly
                            />
                            <p className="m-0 ml-1">
                              {product?.avgReview || 0}
                            </p>
                          </div>
                          <div className="flex items-center ml-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#193A43"
                              class="bi bi-patch-check-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                            </svg>
                            <p style={{ margin: "0", marginLeft: "0.25rem" }}>
                              {product?.totalReview || 0} Reviews
                            </p>
                          </div>
                        </div>
                        <p className="mb-0 fs-16 text-center">
                          <span>MRP: ₹{parseInt(priceDisplay).toFixed(2)}</span>
                        </p>
                      </Link>
                     
                    </div>
                  </Link>
                  <button
                        className="hover:bg-sky-700 cursor-pointer z-[1] text-gray-50 bg-[#193A43] py-2"
                        style={{
                          width:"100%"
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          product.stock > 0
                            ? handleAddtoCart(product, "")
                            : handleNotifyMeClick(product);
                        }}
                      >
                        {product.stock > 0 ? "Add to Cart" : "Notify Me"}
                      </button>
                </Col>
              );
            })}
      </Row>

      <ProductModal show={show} handleClose={handleClose} />
      <AddToCardModal
        cardShow={cardShow}
        handleAddToCardModalClose={handleAddToCardModalClose}
      />
       <NotifyMeModal
        modalShow={modalShow}
        handleNotifyMeModalClose={handleNotifyMeModalClose}
        selectedProductId={selectedProductId}
      />
    </React.Fragment>
  );
};

export default LikeProducts;
