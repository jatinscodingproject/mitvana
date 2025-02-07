import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductDetailLayout01Tab from "../ProductDetailLayout01Tab";
import ProductSwiper from "@src/pages/product/ProductSwiper";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import LikeProducts from "@src/commonsections/LikeProducts";
import MobileAccordion from "@src/pages/product/MobileAccordion";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import HeadTitle from "@src/commonsections/HeadTitle";
import FooterCosmetics from "@src/components/FooterCosmetics";
import NewFooter from "@src/components/new_footer";
import LoginModal from "@src/components/Headers/LoginModal";
import { getProductById } from "@src/api/services/productService";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { backendUrl } from "@src/api/axios";

const ProductDetails = ({ productDetail, relatedProduct }) => {
  const [shoppingShow, setShoppingShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [activeTab, setActiveTab] = useState("ProductDescription"); // Default tab
  const [openIndex, setOpenIndex] = useState(null); // State to manage the open question index

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the open index
  };
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey); // Update the active tab
  };
  const handleShoppingClose = () => setShoppingShow(false);
  const handleShoppingShow = () => setShoppingShow(true);

  const handleLoginShow = () => {
    setLoginShow(true);
  };
  const handleLoginClose = () => setLoginShow(false);
  return (
    <div>
      {productDetail && (
        <HeadTitle
          title={productDetail?.productTitle}
          data={
            <>
              <meta
                name="description"
                content={
                  productDetail?.productMetaDiscription ||
                  "Explore our detailed product information."
                }
              />
              <meta property="og:type" content="website" />
              <meta
                property="og:title"
                content={productDetail?.productTitle || "Product Detail"}
              />
              <meta
                property="og:description"
                content={
                  productDetail?.productMetaDiscription ||
                  "Check out the details of this amazing product."
                }
              />
              {productDetail?.thumbnail && (
                <meta
                  property="og:image"
                  content={backendUrl + productDetail?.thumbnail} // Use the product image or fallback
                />
              )}
              <meta property="og:url" content={"https://mitvana.com/"} />
              <meta property="og:type" content="product" />
              <meta
                property="og:site_name"
                content={productDetail?.productOGSiteName}
              />
              <meta
                name="twitter:description"
                content={productDetail?.productTwitterDescription}
              />
              <meta
                name="facebook:description"
                content={productDetail?.productFacebookDescription}
              />
            </>
          }
        />
      )}

      <TopBanner />
      <HeaderCosmetics />

      <BreadCrumb
        title={productDetail?.category[0]?.name}
        url = {productDetail?.category[0]?.customURL}
        subTitle={productDetail?.name}
      />
      <ProductSwiper
        productDetail={productDetail}
        relatedProduct={relatedProduct}
        handleShoppingShow={handleShoppingShow}
        handleLoginShow={handleLoginShow}
        handleTabChange={handleTabChange}
      />
      <ProductDetailLayout01Tab
        productDetail={productDetail}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <MobileAccordion productDetail={productDetail} />

      {productDetail?.productFaq?.filter(
        (item) => item.question !== "" || item.answer !== ""
      ).length > 0 && (
        <section className="pt-5 py-lg-3 mb-2">
          <div className="container">
            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="text-center mb-lg-4">
                  <h3 className="pb-lg-2 fs-24">FAQ's</h3>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {productDetail.productFaq
                .filter((item) => item.question !== "" || item.answer !== "")
                .map((item, index) => {
                  console.log(item);
                  return (
                    <Col lg={10} key={index}>
                      <div className="afacad-flux text-lg">
                        <div
                          className="faq-question d-flex align-items-center justify-content-between cursor-pointer p-[10px] m=[5px 0] rounded-[5px] "
                          onClick={() => handleToggle(index)}
                        >
                          <h5 className="mb-0">{item.question}</h5>
                          {openIndex !== index ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#193A43"
                              class="bi bi-chevron-down"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#193A43"
                              class="bi bi-chevron-up"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                              />
                            </svg>
                          )}
                        </div>
                        {openIndex === index && (
                          <div className="faq-answer p-[10px] rounded-[5px]">
                            <p>{item.answer}</p> {/* Display the answer */}
                          </div>
                        )}
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </section>
      )}

      <section className="pt-5 py-lg-3 mb-2">
        <div className="container">
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="text-center mb-lg-4">
                <h3 className="pb-lg-2 fs-24">You may also like</h3>
              </div>
            </Col>
          </Row>
          <LikeProducts
            categoryID={productDetail?.category[0]?._id}
            currentProductId={productDetail?._id}
            relatedProduct={productDetail?.relatedProducts}
            handleLoginShow={handleLoginShow}
          />
        </div>
      </section>
      <FooterCosmetics />

      <ShoppingCardModal
        shoppingShow={shoppingShow}
        handleShoppingClose={handleShoppingClose}
      />
      <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
    </div>
  );
};

// This function runs on the server-side on every request
export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  let productDetail = {};
  let relatedProduct = [];

  try {
    const res = await getProductById(slug);
    productDetail = res?.product;
    relatedProduct = res?.relatedProducts;
  } catch (error) {
    console.error(error);
  }

  // Return the product data as props
  return {
    props: {
      productDetail,
      relatedProduct,
    },
  };
};

export default ProductDetails;
