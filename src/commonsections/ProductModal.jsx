import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { afacad } from "../pages/_app";
import Link from "next/link";
import { getReview } from "@src/api/services/reviewService";
import { backendUrl } from "@src/api/axios";
import { addProductOnCart } from "@src/api/services/cartService";
import { getItem } from "@src/api/localStorage";
import { addProductOnWishlist } from "@src/api/services/wishlistService";
import toast, { Toaster } from "react-hot-toast";
import { getProductById } from "@src/api/services/productService";
import { Rating } from "@mui/material";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";

const ProductModal = ({
  handleLoginShow,
  show,
  handleClose,
  selectedProductId,
  selectedProductCustomUrl,
}) => {
  const [selectedColor, setSelectedColor] = useState("Pink");
  const [reviews, setReviews] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  const [avgRating, setAvgRating] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const [varientId, setVarientId] = useState();
  const [selectedMainProduct, setselectedMainProduct] =
    useState(selectedProductId);
  const [selectedMainProductURL, setselectedMainProductURL] = useState(
    selectedProductCustomUrl
  );

  const [presentInCart, setpresentInCart] = useState(false);
  const token = getItem("accessToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setselectedMainProduct(selectedMainProduct);
        const res = await getReview(selectedMainProduct);
        const res2 = await getProductById(selectedMainProductURL);
        setProductVariants(
          [
            res2?.product,
            res2?.product?.productSelected,
            ...res2?.relatedProducts,
          ] || []
        );
        setSelectedProduct(res2?.product);
        setReviews(res?.reviews);
        setAvgRating(res?.avgRating);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedMainProduct) fetchReviews();
  }, [selectedMainProduct, selectedMainProductURL]);

  useEffect(() => {
    setselectedMainProduct(selectedProductId);
    setselectedMainProductURL(selectedProductCustomUrl);
  }, [selectedProductId, selectedProductCustomUrl]);

  const handleChangeVariant = (item) => {
    setSelectedProduct(item);
    // setselectedMainProduct(item?._id)
    // setselectedMainProductURL(item?.productCustomUrl)
  };

  useEffect(() => {
    setSize(selectedProduct?.size);
    setPrice(selectedProduct?.price);
    setVarientId(selectedProduct?._id);
  }, [selectedProduct]);

  const handleAddtoCart = async () => {
    try {
      if (!token) {
        console.log(token);
        handleClose();
        setTimeout(() => {
          handleLoginShow();
        }, 1000);
        return;
      }

      const obj = {
        productId: selectedProduct?._id,
        quantity: quantity,
      };

      await addProductOnCart(obj);
      toast.dismiss();
      toast.success("item added to Cart", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlistAdd = async () => {
    try {
      const obj = {
        productId: selectedProduct?._id,
        variantId: varientId,
      };
      const response = await addProductOnWishlist(obj);
      if (response) {
        toast.dismiss();
        toast.success("Product added to Wishlist", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
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

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(0, prev + change));
  };

  const handleChange = (event) => {
    const value = Math.max(0, Math.min(100, Number(event.target.value)));
    setQuantity(value);
  };

  const isVideo = (media) => {
    return media?.endsWith(".mp4") || media?.endsWith(".webm"); // Add more video extensions if necessary
  };

  const [thumbnailImage, setThumbnailImage] = useState();
  const [images, setImages] = useState([]); // Use state for images
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const productImages = selectedProduct?.images
      ? [...selectedProduct.images]
      : [];

    if (selectedProduct?.thumbnail) {
      productImages.unshift(selectedProduct.thumbnail);
      setThumbnailImage(selectedProduct.thumbnail);
    }

    setImages(productImages);
  }, [selectedProduct]);

  const handleLeftClick = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setThumbnailImage(images[newIndex]);
  };

  // Handle right button click
  const handleRightClick = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setThumbnailImage(images[newIndex]);
  };
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          <button
            type="button"
            className="btn-close position-absolute end-0 top-0 m-2"
            style={{ zIndex: "99" }}
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
          <Row>
            {/* <Col md={7}>
              <div className="images">

                <Swiper {...swiperParamss}>
                  {selectedProduct?.thumbnail && (
                    <SwiperSlide className="topbar-product-card">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={backendUrl + selectedProduct?.thumbnail}
                          className="product-view-img w-100 object-fit-cover"
                          style={{ borderRadius: "20px", transform: 'none' }}
                          alt="Product Slide 1"
                          width={300}
                          height={300}
                        />
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
            </Col> */}
            <Col
              md={7}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="relative flex justify-center">
                <div className="zoom-container relative" style={{}}>
                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                    onClick={handleLeftClick}
                    style={{ zIndex: 10 }}
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                    onClick={handleRightClick}
                    style={{ zIndex: 10 }}
                  >
                    <ChevronRight />
                  </button>

                  {/* Image or Video */}
                  {thumbnailImage && !isVideo(thumbnailImage) ? (
                    <img
                      className="drift-demo-trigger img-fluid transition-all"
                      src={backendUrl + thumbnailImage}
                      alt="Selected Product"
                      style={{ objectFit: "cover" }}
                      data-zoom={backendUrl + thumbnailImage}
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      className="img-fluid w-[500px] transition-all"
                      style={{
                        height: "500px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    >
                      <source
                        src={backendUrl + thumbnailImage}
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>
              </div>
            </Col>

            <Col
              md={5}
              className="overflow-y-auto overflow-x-hidden no-scroll"
              style={{ height: "624px" }}
            >
              <div className="pt-30 ps-4 ps-md-0 pe-4">
                {/* <h6 className="fs-20 mb-2">
                  <Link href="/product-detail-layout-01" className="main_link">
                    {selectedProduct?.productTitle}
                  </Link>
                </h6> */}
                <h1
                  className={`mb-1 fs-28 font-semibold`}
                  style={{ fontWeight: "600" }}
                >
                  {selectedProduct?.name}
                </h1>
                {selectedProduct?.productSubtitle && (
                  <p className={`mb-1 text-sm afacad-flux`}>
                    {selectedProduct?.productSubtitle}
                  </p>
                )}
                <div
                  className="kalles-rating-result flex flex-col justify-center gap-1"
                  // style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <div className="flex gap-1">
                    <span className="kalles-rating-result__pipe">
                      {avgRating && (
                        <Rating
                          name="read-only"
                          value={parseInt(avgRating)}
                          readOnly
                        />
                      )}
                    </span>
                    <p>({reviews?.length} reviews)</p>
                  </div>
                  {!selectedProduct?.boughtText && (
                    <p className={`text-zinc-500 text-xs afacad-flux`}>
                      <span style={{ fontWeight: "bold" }}>
                        {/* {selectedProduct?.productBought}+ bought */}
                        200+ bought
                      </span>{" "}
                      in past month
                    </p>
                  )}
                  <hr className="my-2" />
                  <div className="d-flex mt-3 flex-wrap justify-content-between g-4">
                    <div>
                      {selectedProduct?.discountedPrice ? (
                        <div className="space-y-2">
                          <p className="text-xs mb-2 font-semibold text-zinc-600">
                            <span style={{ textDecoration: "line-through" }}>
                              MRP: ₹{parseInt(price)?.toFixed(2)}
                            </span>
                          </p>
                          <p className="fs-28">
                            ₹
                            {parseInt(selectedProduct.discountedPrice)?.toFixed(
                              2
                            )}
                          </p>
                          <p className="text-sm text-success">
                            You saved ₹
                            {(
                              parseInt(price) -
                              parseInt(selectedProduct.discountedPrice)
                            ).toFixed(2)}{" "}
                            (
                            {(
                              ((parseInt(price) -
                                parseInt(selectedProduct.discountedPrice)) /
                                parseInt(price)) *
                              100
                            ).toFixed(2)}
                            %)
                          </p>

                          <p className="text-xs">Inclusive of all taxes</p>
                        </div>
                      ) : (
                        <p className="fs-18 mb-4">
                          MRP: ₹{parseInt(price)?.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-2 pb-3">
                  {productVariants && productVariants.length > 0 && (
                    <h6
                      className={`text-uppercase fw-bold mt-3 ${afacad?.className}`}
                    >
                      Select Variant:
                    </h6>
                  )}
                  <div
                    className="product-color-list size mt-2 gap-2 d-flex align-items-center"
                    style={{ flexWrap: "wrap" }}
                  >
                    {productVariants && productVariants.length > 0 && (
                      <>
                        {productVariants.map((item, index) => 
                          item?._id && 
                          (
                            <div
                              key={index}
                              className={` ${
                                item?._id == selectedProduct?._id
                                  ? "border-[#193A43]"
                                  : "border-zinc-300"
                              } border-2  w-40 cursor-pointer rounded-xl overflow-hidden`}
                              onClick={() => handleChangeVariant(item)}
                            >
                              <div
                                className={`${
                                  item?._id == selectedProduct?._id
                                    ? "bg-[#193A43] text-white"
                                    : "bg-[#F4F6F8]"
                                } text-zinc-800 font-semibold w-full py-1 border-b-2 border-zinc-300`}
                              >
                                <p className="text-center text-sm">
                                  {" "}
                                  {item?.sizeOrColor}
                                </p>
                              </div>
                              <div className="flex space-y-1 flex-col p-2 justify-around ">
                                <b className="text-[16px] text-zinc-800">
                                  ₹{parseInt(item?.discountedPrice)?.toFixed(2)}
                                </b>
                                <s className="text-sm text-zinc-700 ">
                                  ₹{parseInt(item?.price)?.toFixed(2)}
                                </s>
                              </div>
                              <p className="text-red-600 text-[12px] font-semibold p-2">
                                {(() => {
                                  if (
                                    selectedProduct?.price &&
                                    selectedProduct?.discountedPrice
                                  ) {
                                    return Math.round(
                                      ((item?.price - item?.discountedPrice) /
                                        item?.price) *
                                        100
                                    );
                                  } else {
                                    return null;
                                  }
                                })()}
                                % off
                              </p>
                            </div>
                          )
                      )}
                      </>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
                  {!presentInCart && (
                    <div className="input-step border border-dark rounded-pill">
                      <button
                        className="minus material-shadow text-dark fw-bold"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        –
                      </button>
                      <input
                        type="text"
                        className="product-quantity fw-bold fs-6"
                        value={quantity}
                        readOnly
                        onChange={handleChange}
                      />
                      <button
                        className="plus material-shadow text-dark fw-bold"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <Button
                    variant="teal"
                    className="text-uppercase rounded-pill min-w-150"
                    onClick={handleAddtoCart}
                  >
                    {presentInCart ? "Added To Cart" : "Add To Cart"}
                  </Button>
                  <div
                    className="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center"
                    style={{ lineHeight: "40px" }}
                  >
                    <a onClick={handleWishlistAdd}>
                      <i className="facl facl-heart-o"></i>
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Toaster />
    </React.Fragment>
  );
};
export default ProductModal;
