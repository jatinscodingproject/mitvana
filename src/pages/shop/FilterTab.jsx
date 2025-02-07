import React, { useState, useEffect, useContext } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import AddToCardModal from "@src/commonsections/AddToCardModal";
// import Dropdown from 'react-bootstrap/Dropdown';
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ProductModal from "@src/commonsections/ProductModal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  getProduct,
  getProductByCategoryId,
  getUniquesSizes,
} from "@src/api/services/productService";
import { backendUrl } from "@src/api/axios";
import { getCategory } from "@src/api/services/categoryService";
// import { useRouter } from "next/router";
import { useProduct } from "@src/context/ProductContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getItem, setItem } from "@src/api/localStorage";
import { useSearchStore } from "@src/store/searchStore";
import { addProductOnCart } from "@src/api/services/cartService";
import { CartWishlistContext } from "@src/context/CartWishlistContext";
import { useCartStore } from "@src/store/cartStore";
import {
  addProductOnWishlist,
  removeProductFromWishlist,
} from "@src/api/services/wishlistService";
import { usePathname } from "next/navigation";
import NotifyMeModal from "@src/commonsections/NotifyMeModal";

const ProductCard = ({
  handleLoginShow,
  product,
  handleShow,
  handleAddToCardModalShow,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setCartItem } = useCartStore();
  const { setProductId } = useProduct();
  let priceDisplay = "";
  const { getCartDetail, getWishlistDetail, wishlistDetail } =
    useContext(CartWishlistContext);
  const { selectedColor } = useSearchStore();
  const [wishlistedProducts, setWishlistedProducts] = useState([]);

  const isVideo = (media) => {
    return media?.endsWith(".mp4") || media?.endsWith(".webm");
  };
  if (product && product.length > 1) {
    const prices = product.map((variant) => variant.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    priceDisplay = `₹${minPrice} - ₹${maxPrice}`;
  } else if (product && product.length === 1) {
    priceDisplay = `₹${product.price}`;
  } else {
    priceDisplay = product.price || "Price not available";
  }
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

  const handleRemoveWishlist = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const res = await removeProductFromWishlist(product._id);

      if (res && res == true) getWishlistDetail();
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(product);
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
  const imageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
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
                {product.images?.length > 0 && !isVideo(product.images[0]) && (
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

          {product.images.length > 1 && (
            <div
              className="video-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: isHovered ? "block" : "none",
                cursor: "pointer",
              }}
            >
              {isVideo(product.images[1]) && (
                <video
                  autoPlay
                  loop
                  muted
                  width="100%"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                >
                  <source
                    src={backendUrl + product.images[1]}
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
                <CiHeart onClick={(e) => handleWishlistAdd(e, product)} />
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
                  style={{ color: "red" }}
                  onClick={(e) => handleRemoveWishlist(e)}
                />
              ) : (
                <CiHeart onClick={(e) => handleWishlistAdd(e, product)} />
              )}
              {/* <i className="facl facl-heart-o text-black" style={{ color: 'red' }}></i> */}
            </Link>
          )}
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
          <div
            className="position-absolute d-lg-none -bottom-20 end-0 d-flex flex-column bg-white rounded-pill m-2"
            style={{ zIndex: 1 }}
          >
            <Link
              href=""
              data-bs-toggle="modal"
              className="btn responsive-cart rounded-pill fs-14 p-2"
              style={{ width: 36, height: 36 }}
              onClick={handleShow}
            >
              <i className="iccl iccl-eye fw-semibold"></i>
            </Link>
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
          </div>
          <p className="absolute top-0 w-fit h-fit px-2 bg-red-400">
            {product?.tags[0]?.name}
          </p>
        </div>
        <div className="mt-3">
          <h6 className="mb-1 fw-medium text-center">
            <button className="text-center main_link_acid_green line-clamp-1 w-100">
              {product.name}
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

      <Toaster />
      <NotifyMeModal
        modalShow={modalShow}
        handleNotifyMeModalClose={handleNotifyMeModalClose}
        selectedProductId={selectedProductId}
      />
    </React.Fragment>
  );
};

const FilterTab = ({ handleLoginShow, SelectedCategory }) => {
  const [range, setRange] = useState([0, 10000]);
  const [productData, setProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [categoryId, setCategoryId] = useState(SelectedCategory);
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [searchProductData, setSearchProductData] = useState([]);
  const [cardShow, setCardShow] = useState(false);
  const [selectedProduct, setselectedProduct] = useState();
  const {
    searchProductsFullData,
    setSearchProductsFullData,
    setFullProductData,
  } = useSearchStore();

  const handleRangeChange = (value) => {
    if (Array.isArray(value)) {
      setRange(value);
    } else {
      setRange([value, value]);
    }
  };

  const handleShow = (product) => {
    setselectedProduct(product);
    setShow(!show);
  };

  const fetchProductByCategory = async (path) => {
    try {
      const resProduct = await getProductByCategoryId(path);
      const resCategory = await getCategory();
      const sortedCategory = resCategory.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setCategoryData(sortedCategory);
      setProductData(resProduct);
      setSearchProductData(resProduct);
      setSearchProductsFullData(resProduct);
      setFullProductData(resProduct);
      setFilteredProductData(resProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);

  const hanldeCategoryChange = (categoryId) => {
    if (categoryId) fetchProductByCategory(categoryId);
  };

  useEffect(() => {
    hanldeCategoryChange(SelectedCategory);
  }, [SelectedCategory]);

  const toggleSizeSelection = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  useEffect(() => {
    const path =
      location.pathname && location.pathname.includes("product-category")
        ? location.pathname.split("/")[2]
        : "";
    const fetchProduct = async () => {
      try {
        const resProduct = await getProduct();
        const resCategory = await getCategory();
        setProductData(resProduct);
        setFullProductData(resProduct);
        setSearchProductsFullData(resProduct);
        setSearchProductData(resProduct);
        setFilteredProductData(resProduct);
        const sortedCategory = resCategory.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setCategoryData(sortedCategory);
      } catch (error) {
        console.log(error);
      }
    };

    if (path) {
      fetchProductByCategory(path);
    } else {
      fetchProduct();
    }
  }, [categoryId]);

  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = [...productData];

      if (range) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= range[0] && product.price <= range[1]
        );
      }
      setFilteredProductData(filteredProducts);
    };

    filterProducts();
  }, [productData, range]);

  const sortProducts = (criteria) => {
    let sortedProducts = [...filteredProductData];

    console.log(sortedProducts[0]);

    switch (criteria) {
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "oldToNew":
        sortedProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "newToOld":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }

    setFilteredProductData(sortedProducts);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className=" mt-5 d-flex justify-content-between align-items-center">
          <Link
            href="#!"
            className="text-muted fs-16 align-items-center d-none d-lg-flex "
            id="filter-icon"
          >
            <i
              className={`iccl fwb iccl-filter ${
                open === false ? "d-none" : ""
              } fwb me-2 fw-medium`}
              id="icon-filter"
            ></i>
            <i
              className={`pe-7s-close pegk ${
                open === false ? "" : "d-none"
              } me-2 fw-medium fw-semibold`}
              id="icon-close"
              style={{ fontSize: "24px" }}
            ></i>

            <p className="mb-0">Filter</p>
          </Link>

          <div
            className="d-flex align-items-center d-lg-none fs-16 text-muted"
            data-bs-toggle="offcanvas"
            onClick={toggleFilter}
          >
            <i
              className="iccl fwb iccl-filter fwb me-2 fw-medium"
              id="icon-filter"
            ></i>
            <i
              className="pe-7s-close pegk d-none me-2 fw-medium fw-semibold"
              id="icon-close"
              style={{ fontSize: "24px" }}
            ></i>
            <p className="mb-0">Filter</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
            >
              <a href="/shop">Clear Filter</a>
            </div>
            <Dropdown>
              <Dropdown.Toggle
                className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Feature
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu filter-dropdown">
                <Dropdown.Item onClick={() => sortProducts("lowToHigh")}>
                  <li>
                    <Link href="#">Price, low to high</Link>
                  </li>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts("highToLow")}>
                  <li>
                    <Link href="#">Price, high to low</Link>
                  </li>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts("oldToNew")}>
                  <li>
                    <Link href="#">Date, old to new</Link>
                  </li>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts("newToOld")}>
                  <li>
                    <Link href="#">Date, new to old</Link>
                  </li>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="flex lg:gap-x-10">
          {/* mobile filter */}
          <div className="flex space-x-4 lg:hidden">
            <div
              className={`fixed top-0 right-0 h-screen w-[70%] bg-white text-zinc-800 transform transition-transform duration-300 z-[100] ${
                isFilterOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="p-2">
                <div className={`flex flex-col w-full px-3 pb-40 `}>
                  <div className="w-full">
                    {/* <!-- Category --> */}
                    <div>
                      <h5 className="my-1"> By Category </h5>
                      {/* <div className="filter-title"></div> */}
                      <div className="mt-3 filter-category">
                        {categoryData.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="form-check pt-2 mb-2"
                              style={{
                                paddingLeft: "0",
                              }}
                              onClick={() => hanldeCategoryChange(item._id)}
                            >
                              <label
                                className="form-check-label"
                                style={{ cursor: "pointer" }}
                                htmlFor="cate"
                              >
                                {item.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* <!-- title--> */}
                    <div className="w-full">
                      <hr className="mt-5 mb-1" />
                      <h5 className="mb-1 ">By Price</h5>
                      {/* <div className="filter-title"></div> */}
                      <form action="" className="mt-5">
                        <div className="slider-area w-4/5">
                          <Slider
                            range
                            step={10}
                            min={120}
                            max={1000}
                            value={range}
                            onChange={handleRangeChange}
                            allowCross={false} // Ensure one thumb cannot cross the other
                          />
                          <div className="d-flex align-items-center mt-4 py-2">
                            <span className="text-muted">Price: </span>
                            <h6 className="mb-0 mx-2">
                              <span>{`₹${range[0].toFixed(2)}`}</span>
                            </h6>
                            -
                            <h6 className="mb-0 ms-2">
                              <span>{`₹${range[1].toFixed(2)}`}</span>
                            </h6>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 flex justify-center w-full">
                <button
                  className="w-[90%] bg-black rounded-md  py-2 text-sm text-white"
                  onClick={toggleFilter}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          {/* Overlay
          {isFilterOpen && (
            <div onClick={toggleFilter} className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          )} */}
          <div
            className={`lg:flex flex-col items-start w-1/5 border-r-2 px-3 pb-40 hidden`}
          >
            <div className="">
              {/* <!-- Category --> */}
              <div>
                <hr />
                <h5 className="my-1 fw-medium"> By Category </h5>
                {/* <div className="filter-title"></div> */}
                <div className="mt-3 filter-category">
                  {categoryData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="form-check pt-2 mb-2"
                        style={{
                          paddingLeft: "0",
                        }}
                      >
                        <Link
                          className="form-check-label"
                          style={{ cursor: "pointer" }}
                          htmlFor="cate"
                          href={`/product-category/${item.customURL}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <!-- title--> */}
              <div className="">
                <hr className="mt-5 mb-1" />
                <h5 className="mb-1 fw-medium">By Price</h5>
                {/* <div className="filter-title"></div> */}
                <form action="" className="mt-5">
                  <div className="slider-area w-4/5">
                    <Slider
                      range
                      step={10}
                      min={120}
                      max={1000}
                      value={range}
                      onChange={handleRangeChange}
                      allowCross={false} // Ensure one thumb cannot cross the other
                    />
                    <div className="d-flex align-items-center mt-4 py-2">
                      <span className="text-muted">Price: </span>
                      <h6 className="mb-0 mx-2">
                        <span>{`₹${range[0].toFixed(2)}`}</span>
                      </h6>
                      -
                      <h6 className="mb-0 ms-2">
                        <span>{`₹${range[1].toFixed(2)}`}</span>
                      </h6>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="tab-content my-3 my-md-4 w-full lg:w-2/3"
            id="pills-tabContent"
          >
            <div
              className={`tab-pane fade active show`}
              id="best-pan1"
              role="tabpanel"
              aria-labelledby="best-pan1-tab"
              tabIndex={0}
            >
              <Row className="g-3 row-cols-2 row-cols-md-3 row-cols-lg-3">
                {filteredProductData.length > 0 &&
                  filteredProductData.map((product) => (
                    <div className="col" key={product._id}>
                      <ProductCard
                        key={product._id}
                        handleLoginShow={handleLoginShow}
                        product={product}
                        handleShow={handleShow}
                        handleAddToCardModalShow={handleAddToCardModalShow}
                      />
                    </div>
                  ))}
              </Row>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        handleLoginShow={handleLoginShow}
        show={show}
        handleClose={handleShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
      <AddToCardModal
        cardShow={cardShow}
        handleAddToCardModalClose={handleAddToCardModalClose}
        selectedProduct={selectedProduct}
      />
    </React.Fragment>
  );
};

export default FilterTab;
