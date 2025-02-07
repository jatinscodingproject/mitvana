import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Container,
  Row,
  Col,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import {
  ArrowRight,
  BadgePercent,
  MapPin,
  MapPinCheck,
  MapPinX,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import Drift from "drift-zoom";
import Link from "next/link";
import { backendUrl } from "@src/api/axios";
import "drift-zoom/dist/drift-basic.css";
import Rating from "@mui/material/Rating";
import {
  getDeliveryDateByPincode,
  getReview,
} from "@src/api/services/reviewService";
import { getItem, setItem } from "@src/api/localStorage";
import {
  addProductOnCart,
  isProductInCart,
} from "@src/api/services/cartService";
import {
  addProductOnWishlist,
  removeProductFromWishlist,
} from "@src/api/services/wishlistService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { afacad } from "../_app";
import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  Maximize,
  Minimize,
} from "lucide-react";
import {
  DeliveryAndReturnModal,
  Question,
} from "@src/components/ProductModal/ProductModals";
import { useSearchStore } from "@src/store/searchStore";
import { useRouter } from "next/router";
import { useProduct } from "@src/context/ProductContext";
import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useCartStore } from "@src/store/cartStore";
import NotifyMeModal from "@src/commonsections/NotifyMeModal";
gsap.registerPlugin(ScrollTrigger);

const ProductSwiper = ({
  handleLoginShow,
  productDetail,
  relatedProduct,
  handleShoppingShow,
  handleTabChange,
}) => {
  const { setCartItem, cartItem } = useCartStore();

  const { cartDetail, wishlistDetail, getCartDetail, getWishlistDetail } =
    useContext(CartWishlistContext);
  const isProductInWishlist = wishlistDetail?.some(
    (item) => item.product._id === productDetail?._id
  );
  const isMobile = useMediaQuery({ maxWidth: 1025 });
  const [thumbsSwiper, sethumbsSwiper] = useState(null);
  // const [selectedColor, setSelectedColor] = useState(null);
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const [varientId, setVarientId] = useState();
  const { selectedColor, setSelectedColor } = useSearchStore();

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index
  const [presentInCart, setpresentInCart] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [showDelivery, setShowDelivery] = useState(false);
  const [deliverData, setDeliverData] = useState();

  // useEffect(() => {
  //   // Update the thumbnail image when productDetail or its images change
  //   if (productDetail?.images?.length > 0) {
  //     setThumbnailImage(productDetail.images[0]);
  //   }
  // }, [productDetail]);
  const token = getItem("accessToken");
  const { setProductId } = useProduct();
  // useEffect(() => {
  //   if (productDetail?.images?.length > 0) {
  //     const zoomContainer = document.querySelector(".zoom-container");
  //     productDetail.images.forEach((image) => {
  //       const triggerElement = document.querySelector(
  //         `[data-zoom="${backendUrl + image}"]`
  //       );
  //       if (triggerElement) {
  //         new Drift(triggerElement, {
  //           paneContainer: zoomContainer, // Set the container where zoom should appear
  //           inlinePane: false,
  //           containInline: true,
  //           sourceAttribute: "data-zoom",
  //         });
  //       }
  //     });
  //   }
  // }, [productDetail]);

  useEffect(() => {
    setSize(productDetail?.size);
    setPrice(productDetail?.price);
    setVarientId(productDetail?._id);
  }, [productDetail]);

  const isVideo = (media) => {
    return media?.endsWith(".mp4") || media?.endsWith(".webm"); // Add more video extensions if necessary
  };

  async function getDeliveryDetails() {
    try {
      const price = productDetail?.discountedPrice || productDetail?.price
      const res = await getDeliveryDateByPincode(pin , price);
      console.log(res);
      setShowDelivery(true);
      setDeliverData(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    const selectedVariant = productDetail?.variants.find(
      (variant) => variant.size === newSize
    );
    setPrice(selectedVariant?.price);
    setVarientId(selectedVariant?._id);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) =>
      Math.max(0, Math.min(prev + change, productDetail?.stock))
    );
  };

  const handleChange = (event) => {
    const value = Math.max(0, Math.min(100, Number(event.target.value)));
    setQuantity(value);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReview(productDetail?._id);
        console.log(res);
        setReviews(res?.reviews);
        setAvgRating(res?.avgRating);
      } catch (error) {
        console.log(error);
      }
    };
    if (productDetail?._id) fetchReviews();
  }, [productDetail]);

  const handleRedirectToCart = () => {
    router.push("/shopping-cart");
  };
  const handleAddtoCart = async () => {
    try {
      if (!productDetail?.stock > 0) {
        handleNotifyMeClick(productDetail);
        return;
      }
      if (!token) {
        const existingCartItems = getItem("cartItem") || [];
        const isProductInCart = existingCartItems.some(
          (item) => item.productId === productDetail?._id
        );

        if (!isProductInCart) {
          const obj = {
            productTitle: productDetail?.productTitle,
            productId: productDetail?._id,
            quantity: quantity,
            selectedColor: selectedColor,
            thumbnail: productDetail?.thumbnail,
            price: productDetail?.price,
            discountedPrice: productDetail?.discountedPrice,
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
        productId: productDetail?._id,
        quantity: quantity,
        selectedColor: selectedColor,
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

  useEffect(() => {
    const checkProduct = async () => {
      if (!productDetail?._id) {
        return;
      }

      try {
        const obj = {
          productId: productDetail?._id,
        };

        console.log(obj);
        const res = await isProductInCart(obj);
        console.log(res);
        setpresentInCart(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) checkProduct();
  }, [productDetail]);

  const handleRemoveWishlist = async () => {
    try {
      const res = await removeProductFromWishlist(productDetail?._id);

      if (res && res == true) getWishlistDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlistAdd = async () => {
    try {
      const token = getItem("accessToken");
      if (!token) {
        handleLoginShow();
        return;
      }
      const obj = {
        productId: productDetail?._id,
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

  const [images, setImages] = useState([]); // Use state for images
  const [thumbnailImage, setThumbnailImage] = useState();
  useEffect(() => {
    const productImages = productDetail?.images
      ? [...productDetail.images]
      : [];

    if (productDetail?.thumbnail) {
      productImages.unshift(productDetail.thumbnail);
      setThumbnailImage(productDetail.thumbnail);
    }

    setImages(productImages);
  }, [productDetail]);

  // useEffect(()=>{
  //   setThumbnailImage(images[0] || null)
  // },[images])

  // const images = productDetail?.images || []; // List of images
  // Initially set first image

  // Handle left button click
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

  const handleClose = () => {
    setShow(false); // Close the overlay
  };

  const handleChangeProduct = (item) => {
    if (item) {
      setProductId(item._id);
      localStorage.setItem("productId", item._id);

      // Build the new URL
      const newUrl = `/product/${item.productCustomUrl
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")}`;

      // Use router.push for navigation
      router.push(newUrl);
    }
  };
  // scroll offer section
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // scroll effect
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageRef.current,
        pinSpacing: false,
      });
    }
  }, []);

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
      <ToastContainer />

      {show && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <Container className="lg:px-40 lg:pt-4 sticky top-0">
            <Row className="g-2">
              <Col xl={2} className="order-2 order-xl-1">
                <Swiper
                  className="productSmall mt-6 md:h-52 lg:h-[60vh] lg:w-20"
                  pagination={{
                    type: "progressbar",
                  }}
                  direction={isMobile ? "horizontal" : "vertical"}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  spaceBetween={10}
                  modules={[FreeMode, Pagination]}
                >
                  <div className="swiper-wrapper">
                    {images?.length > 0 &&
                      images.map((media, index) => (
                        <SwiperSlide
                          key={index}
                          style={{ height: "100px" }}
                          onClick={() => setThumbnailImage(media)}
                        >
                          {isVideo(media) ? (
                            <video
                              style={{ cursor: "pointer" }}
                              autoPlay
                              width="100%"
                            >
                              <source
                                src={backendUrl + media}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <img
                              src={backendUrl + media}
                              className="object-fit-cover"
                              alt={`product-${index}`}
                            />
                          )}
                        </SwiperSlide>
                      ))}
                  </div>
                </Swiper>
              </Col>
              <Col xl={10} className="order-1 order-xl-2">
                <div className="swiper-wrapper relative flex justify-center">
                  <div className="zoom-container w-[500px] h-[500px] md:h-[70vh] md:w-[96vw] lg:w-[70vw] lg:h-[90vh] relative">
                    {/* Left Button */}
                    <button
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
                      onClick={handleLeftClick}
                      style={{ zIndex: 10 }}
                    >
                      <ChevronLeft />
                    </button>

                    {/* Right Button */}
                    <button
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
                      onClick={handleRightClick}
                      style={{ zIndex: 10 }}
                    >
                      <ChevronRight />
                    </button>

                    {thumbnailImage && !isVideo(thumbnailImage) ? (
                      <img
                        className="drift-demo-trigger img-fluid w-[100%] h-[100%] object-contain"
                        style={{ height: "100%" }}
                        src={backendUrl + thumbnailImage}
                        alt="Selected Product"
                        data-zoom={backendUrl + thumbnailImage}
                      />
                    ) : (
                      <video
                        controls
                        style={{ cursor: "pointer" }}
                        autoPlay
                        className="img-fluid w-[100%] h-[100%] object-cover"
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
            </Row>
          </Container>
          <button
            onClick={handleClose}
            className="text-white transition absolute bottom-8 right-8"
          >
            <Minimize />
          </button>
          <button
            onClick={handleClose}
            className="text-white transition absolute top-8 right-8"
          >
            <CircleX />
          </button>
        </div>
      )}
      <section className="py-1">
        <Container className="mx-auto">
          <Row className="py-3 overflow-y-auto w-[100vw] md:w-[90vw] no-scrollbar relative">
            <Col md={6} className="transition-all ease-in-out duration-500">
              <Row className=" g-4 sticky top-0" ref={imageRef}>
                {/* Thumbnails */}
                <Col
                  xl={2}
                  className="order-2 order-xl-1 justify-center"
                  style={{}}
                >
                  <Swiper
                    className="productSmall"
                    pagination={{
                      type: "progressbar",
                    }}
                    direction={isMobile ? "horizontal" : "vertical"}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    spaceBetween={10}
                    modules={[FreeMode, Pagination]}
                    style={{
                      scrollBehavior: "smooth",
                    }}
                  >
                    <div className="swiper-wrapper">
                      {images?.length > 0 &&
                        images.map((media, index) => (
                          <SwiperSlide
                            key={index}
                            style={{ height: "100px", overflow: "hidden" }}
                            onClick={() => setThumbnailImage(media)}
                          >
                            {isVideo(media) ? (
                              <video
                                style={{ cursor: "pointer" }}
                                autoPlay
                                width="100%"
                              >
                                <source
                                  src={backendUrl + media}
                                  type="video/mp4"
                                />
                              </video>
                            ) : (
                              <img
                                src={backendUrl + media}
                                className="object-fit-cover"
                                alt={`product-${index}`}
                              />
                            )}
                          </SwiperSlide>
                        ))}
                    </div>
                  </Swiper>
                </Col>

                {/* Main Image/Video */}
                <Col xl={10} className="order-1 order-xl-2">
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

                      <button
                        onClick={() => setShow(true)}
                        className="absolute bottom-4 right-4 text-white transition-all"
                      >
                        <Maximize color="grey" />
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
              </Row>
            </Col>

            {/* Description Column */}
            <Col
              ref={containerRef}
              md={6}
              className="mt-5 mt-md-0 leading-4 no-scrollbar"
            >
              <h1
                className={`mb-1 fs-28 font-semibold text-wrap`}
                style={{ fontWeight: "600" }}
              >
                {productDetail?.name}
              </h1>

              {/* <Container>
          <Row className="py-3 overflow-y-auto w-[100vw] md:w-[90vw] no-scrollbar relative">
            <Col md={6} className={`${prodScrollFix} transition-all`}>
              <Row className="g-4 ">
                <Col xl={2} className="order-2 order-xl-1 ">
                  <Swiper
                    className="productSmall"
                    pagination={{
                      type: "progressbar",
                    }}
                    direction={isMobile ? "horizontal" : "vertical"}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    spaceBetween={10}
                    modules={[FreeMode, Pagination]}
                  >
                    <div className="swiper-wrapper">
                      {productDetail?.images?.length > 0 &&
                        productDetail?.images.map((media, index) => (
                          <SwiperSlide
                            key={index}
                            style={{ height: "100px", overflow: "hidden" }}
                            onClick={() => setThumbnailImage(media)}
                          >
                            {isVideo(media) ? (
                              <video autoPlay width="100%">
                                <source
                                  src={backendUrl + media}
                                  type="video/mp4"
                                />
                              </video>
                            ) : (
                              <img
                                src={backendUrl + media}
                                className="object-fit-cover"
                                alt={`product-${index}`}
                              />
                            )}
                          </SwiperSlide>
                        ))}
                    </div>
                  </Swiper>
                </Col>

                <Col xl={10} className="order-1 order-xl-2">
                  <div className="swiper-wrapper relative flex justify-center">
                    <div
                      className="zoom-container"
                      style={{
                        position: "relative",
                        width: "",
                        height: "500px",
                      }}
                    >
                      <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
                        onClick={handleLeftClick}
                        style={{ zIndex: 10 }}
                      >
                        <ChevronLeft />
                      </button>

                      <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
                        onClick={handleRightClick}
                        style={{ zIndex: 10 }}
                      >
                        <ChevronRight />
                      </button>
                      <button
                        onClick={() => setShow(true)}
                        className="absolute bottom-4 right-4 text-white transition"
                      >
                        <Maximize />
                      </button>
                      {thumbnailImage && !isVideo(thumbnailImage) ? (
                        <img
                          className="drift-demo-trigger img-fluid w-[600px]"
                          src={backendUrl + thumbnailImage}
                          alt="Selected Product"
                          style={{ height: "500px", objectFit: "cover" }}
                          data-zoom={backendUrl + thumbnailImage}
                        />
                      ) : (
                        <video
                          controls
                          autoPlay
                          className="img-fluid w-[500px]"
                          style={{ height: "500px", objectFit: "cover" }}
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
              </Row>
            </Col>

            <Col md={6} className="mt-5 mt-md-0 leading-4 no-scrollbar " >
              <h1
                className={`mb-1 fs-28 ${afacad.className}`}
                style={{ fontWeight: "600" }}
              >
                {productDetail?.name}
              </h1> */}
              {productDetail?.productSubtitle && (
                <p className={`mb-1 text-sm ${afacad.className}`}>
                  {productDetail?.productSubtitle}
                </p>
              )}

              <a href="#reviewTab">
                <div
                  className="kalles-rating-result"
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                  onClick={() => {
                    handleTabChange("Reviews");
                  }}
                >
                  <span className="kalles-rating-result__pipe">
                    {avgRating && (
                      <Rating
                        name="read-only"
                        value={parseInt(avgRating)}
                        readOnly
                      />
                    )}
                  </span>
                  <p>({reviews.length} reviews)</p>
                </div>
              </a>

              {!productDetail?.boughtText && (
                <p className={`text-zinc-500 text-xs ${afacad.className}`}>
                  <span style={{ fontWeight: "bold" }}>
                    {/* {productDetail?.productBought}+ bought */}
                    200+ bought
                  </span>{" "}
                  in past month
                </p>
              )}
              <hr className="my-2" />
              <div className="d-flex mt-3 flex-wrap justify-content-between g-4">
                <div>
                  {productDetail?.discountedPrice ? (
                    <div className="space-y-2">
                      <p className="text-xs mb-2 font-semibold text-zinc-600">
                        <span style={{ textDecoration: "line-through" }}>
                          MRP: ₹{parseInt(price)?.toFixed(2)}
                        </span>
                      </p>
                      <p className="fs-28">
                        ₹{parseInt(productDetail.discountedPrice)?.toFixed(2)}
                      </p>
                      <p className="text-sm text-success">
                        You saved ₹
                        {(
                          parseInt(price) -
                          parseInt(productDetail.discountedPrice)
                        ).toFixed(2)}{" "}
                        (
                        {(
                          ((parseInt(price) -
                            parseInt(productDetail.discountedPrice)) /
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
              <hr className="my-2" />

              <div className="pt-2pb-3">
                {(productDetail?.productSelected ||
                  relatedProduct?.length > 0) && (
                  <h6
                    className={`text-uppercase fw-bold mt-3 ${afacad.className}`}
                  >
                    Select Variant:
                  </h6>
                )}
                <div className="product-color-list size mt-2 gap-2 d-flex align-items-center">
                  {(productDetail?.productSelected ||
                    relatedProduct?.length > 0) && (
                    <>
                      <div className="border-2 border-[#193A43] w-40 cursor-pointer rounded-xl overflow-hidden">
                        <div className="bg-[#193A43] text-white w-full py-1">
                          <p className="pl-2 text-sm m-0">
                            {productDetail?.sizeOrColor}
                          </p>
                        </div>
                        {console.log("PRODUCT DETAILS--=-=-->", productDetail)}
                        <div className="flex flex-col p-2 justify-around space-y-1">
                          <b className="text-[16px] text-zinc-800">
                            ₹
                            {parseInt(productDetail?.discountedPrice)?.toFixed(
                              2
                            )}
                          </b>
                          <s className="text-sm text-zinc-700 ">
                            ₹{parseInt(productDetail?.price)?.toFixed(2)}
                          </s>
                        </div>
                        <p className="text-red-600 text-[12px] font-semibold p-2">
                          {(() => {
                            if (
                              productDetail?.price &&
                              productDetail?.discountedPrice
                            ) {
                              return Math.round(
                                ((productDetail.price -
                                  productDetail.discountedPrice) /
                                  productDetail.price) *
                                  100
                              );
                            } else {
                              return null;
                            }
                          })()}
                          % off
                        </p>
                      </div>

                      {productDetail?.productSelected && (
                        <div
                          className="border-2 border-zinc-300 w-40 cursor-pointer rounded-xl overflow-hidden"
                          onClick={() =>
                            handleChangeProduct(productDetail?.productSelected)
                          }
                        >
                          <div className="bg-[#F4F6F8] text-zinc-800 font-semibold w-full py-1 border-b-2 border-zinc-300">
                            <p className="pl-2 text-sm m-0">
                              {productDetail?.productSelected?.sizeOrColor}
                            </p>
                          </div>
                          <div className="flex space-y-1 flex-col p-2 justify-around ">
                            <b className="text-[16px] text-zinc-800">
                              ₹
                              {parseInt(
                                productDetail?.productSelected?.discountedPrice
                              )?.toFixed(2)}
                            </b>
                            <s className="text-sm text-zinc-700 ">
                              ₹
                              {parseInt(
                                productDetail?.productSelected?.price
                              )?.toFixed(2)}
                            </s>
                          </div>
                          <p className="text-red-600 text-[12px] font-semibold p-2">
                            {(() => {
                              if (
                                productDetail?.price &&
                                productDetail?.discountedPrice
                              ) {
                                return Math.round(
                                  ((productDetail?.productSelected?.price -
                                    productDetail?.productSelected
                                      ?.discountedPrice) /
                                    productDetail?.productSelected?.price) *
                                    100
                                );
                              } else {
                                return null;
                              }
                            })()}
                            % off
                          </p>
                        </div>
                      )}
                      {relatedProduct?.map(
                        (item, index) => (
                          console.log("✌️item --->", item),
                          (
                            <div
                              style={
                                {
                                  // border: "1px solid var(--bs-border-color)",
                                  // width: "26%",
                                  // cursor: "pointer",
                                  // borderRadius: "15px",
                                }
                              }
                              key={index}
                              className="border-2 border-zinc-300 w-40 cursor-pointer rounded-xl overflow-hidden"
                              onClick={() => handleChangeProduct(item)}
                            >
                              <div className="bg-[#F4F6F8] text-zinc-800 font-semibold w-full py-1 border-b-2 border-zinc-300">
                                <p className="pl-2 text-sm m-0">
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
                                    productDetail?.price &&
                                    productDetail?.discountedPrice
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
                        )
                      )}
                    </>
                  )}
                  {productDetail?.variants?.length > 1 &&
                    productDetail.variants.map((variant) => {
                      return (
                        <Link
                          href="#!"
                          style={{ width: "100px" }}
                          className={`d-inline-block p-3 d-flex align-items-center justify-content-center ${
                            size === variant.size ? "active" : ""
                          }`}
                          onClick={() => handleSizeClick(variant.size)}
                        >
                          {variant.size}
                        </Link>
                      );
                    })}
                </div>
              </div>

              {productDetail?.availableColors?.length > 0 && (
                <div className="row mt-0">
                  <h6
                    className={`text-uppercase fw-bold mt-3 ${afacad.className}`}
                  >
                    Available Colors:
                  </h6>
                  {productDetail?.availableColors.map((item, index) => {
                    const isSelected = selectedColor === item._id;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedColor(item._id)}
                        className="ml-2 mt-2 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          cursor: "pointer",
                          padding: "2px",
                          border: isSelected ? "2px solid black" : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: item?.colorCode,
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
                {!presentInCart && productDetail?.stock > 0 && (
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
                  onClick={() => {
                    !presentInCart ? handleAddtoCart() : handleRedirectToCart();
                  }}
                >
                  {productDetail?.stock > 0
                    ? presentInCart
                      ? "Go to Cart"
                      : "Add To Cart"
                    : "Notify Me"}
                </Button>
                <div
                  className="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center"
                  style={{ lineHeight: "40px" }}
                >
                  <a>
                    {isProductInWishlist ? (
                      <i
                        className="facl facl-heart"
                        style={{ color: "red" }}
                        onClick={handleRemoveWishlist}
                      ></i>
                    ) : (
                      <i
                        className="facl facl-heart-o"
                        onClick={handleWishlistAdd}
                      ></i>
                    )}
                  </a>
                </div>
              </div>
              <hr className="my-4" />

              <div className="mt-8 flex flex-col items-s w-[60%]">
                <div className="flex gap-4">
                  <span className="text-zinc-500 font-semibold text-xs">
                    Delivery
                  </span>
                  <div className="border-b-2 border-solid border-[#193A43] input-icons flex items-center">
                    {showDelivery && (
                      <>
                        {deliverData ? (
                          <MapPinCheck size={15} className="text-[#193A43]" />
                        ) : (
                          <MapPinX size={15} className="text-[#dc3545]" />
                        )}
                      </>
                    )}
                    <input
                      className="input-field font-semibold text-xs border-none outline-none ml-2 py-1"
                      type="text"
                      placeholder="Enter pincode to check"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                    <span
                      className="text-[#193A43] font-semibold text-xs cursor-pointer ml-2"
                      onClick={getDeliveryDetails}
                    >
                      {true ? `Check` : `Change`}
                    </span>
                  </div>
                </div>

                <div>
                  {showDelivery && (
                    <div
                      className="mt-2 "
                      style={{
                        marginLeft: "65px",
                      }}
                    >
                      {deliverData ? (
                        <div>
                          <span className="text-xs font-semibold">
                            Delivery by{" "}
                            {new Date(
                              Date.now() +
                                deliverData?.TAT * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              weekday: "long",
                            })}
                          </span>
                          <span className="text-[14px] font-[500]"> | </span>
                          <span className="text-xs font-semibold">
                            ₹{deliverData.dilveryCharge}
                          </span>
                          {/* <br /> */}
                          {/* <span className="text-[10px]">
                            If ordered before 12:10 AM
                          </span> */}
                        </div>
                      ) : (
                        <span className="text-red-600 text-xs font-semibold">
                          None of the sellers deliver to this pin code
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <NotifyMeModal
          modalShow={modalShow}
          handleNotifyMeModalClose={handleNotifyMeModalClose}
          selectedProductId={selectedProductId}
        />
        {/* <SizeGuideModal show={show} handleClose={handleClose} /> */}
        {/* <DeliveryAndReturnModal  /> */}
        {/* <Question /> */}
      </section>
    </React.Fragment>
  );
};
export default ProductSwiper;
