import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import icondown from "@assets/images/single-product/icon-down.svg";
import { backendUrl } from "@src/api/axios";
import { getReview } from "@src/api/services/reviewService";
import Rating from "@mui/material/Rating";

const MobileAccordion = ({ productDetail }) => {
  const [open, setOpen] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState();

  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const { label, seconds: intervalSeconds } of intervals) {
      const interval = Math.floor(seconds / intervalSeconds);
      if (interval > 0) {
        return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  const handleSubmit = async () => {
    try {
      const obj = {
        name,
        email,
        reviewTitle,
        reviewContent,
        rating,
      };
      await addReview(obj, productDetail?._id);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReview(productDetail?._id);
        console.log("getReview" , res);
        setReviews(res.reviews);
        setAvgRating(res.avgRating);
      } catch (error) {
        console.log(error);
      }
    };
    if (productDetail?._id) fetchReviews();
  }, [productDetail]);

  const handleClick = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  return (
    <React.Fragment>
      <div className="mt-4 mb-3 d-block d-lg-none">
        <div className="container">
          <div
            className="accordion-flush product-accordion"
            id="accordionFlushExample"
          >
            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    open === 1 ? "" : "collapsed"
                  } bg-light position-relative pe-3`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  onClick={() => handleClick(1)}
                >
                  Description
                  <span className="bg-dark position-absolute end-0 w-[47px] h-full"></span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className={`accordion-collapse  ${
                  open == 1 ? "show" : "collapse"
                }`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body border-top-0 border-light">
                  <div
                    className="p-2"
                    dangerouslySetInnerHTML={{
                      __html: productDetail?.description,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    open === 2 ? "" : "collapsed"
                  } bg-light position-relative pe-3`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                  onClick={() => handleClick(2)}
                >
                  Key Ingredients
                  <span className="bg-dark position-absolute end-0 w-[47px] h-full"></span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className={`accordion-collapse  ${
                  open === 2 ? "show" : "collapse"
                }`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body  border-light">
                  {productDetail?.ingredients?.length > 0 &&
                    productDetail?.ingredients.map((item) => {
                      return (
                        <div className="flex flex-col gap-4 mt-3 mb-3 items-center">
                          <div className="w-[30%]">
                            <img
                              className="w-[90%] h-[70%]"
                              src={backendUrl + item?.image}
                            />
                          </div>
                          <h5 className="text-[18px] m-0">{item?.title}</h5>
                          <p className="text-[14px] m-0 text-center">
                            {item?.description}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    open === 3 ? "" : "collapsed"
                  } bg-light position-relative pe-3`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                  onClick={() => handleClick(3)}
                >
                  How to Use
                  <span className="bg-dark position-absolute end-0 w-[47px] h-full"></span>
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className={`accordion-collapse  ${
                  open === 3 ? "show" : "collapse"
                }`}
                data-bs-parent="#accordionFlushExample"
              >
                <div
                  className="p-2"
                  dangerouslySetInnerHTML={{
                    __html: productDetail?.howToUse?.description,
                  }}
                />
              </div>
            </div>
            <div className="accordion-item border-0 mb-2">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    open === 4 ? "" : "collapsed"
                  } bg-light position-relative pe-3`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFive"
                  aria-expanded="false"
                  aria-controls="flush-collapseFive"
                  onClick={() => handleClick(4)}
                >
                  Additional Information
                  <span className="bg-dark position-absolute end-0 w-[47px] h-full"></span>
                </button>
              </h2>
              <div
                id="flush-collapseFive"
                className={`accordion-collapse  ${
                  open === 4 ? "show" : "collapse"
                }`}
                data-bs-parent="#accordionFlushExample"
              >
                <div  
                   className="p-2"
                  dangerouslySetInnerHTML={{
                    __html: productDetail?.features,
                  }}
                />
              </div>
            </div>
            <div className="accordion-item border-0">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    open === 5 ? "" : "collapsed"
                  } bg-light position-relative pe-3`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                  onClick={() => handleClick(5)}
                >
                  Reviews
                  <span className="bg-dark position-absolute end-0 w-[47px] h-full"></span>
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className={`accordion-collapse  ${
                  open === 5 ? "show" : "collapse"
                }`}
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <Row className="mb-3">
                    <Col md={2} className="text-center">
                      <p className="mb-0">Average</p>
                      <h2 className="fw-bold my-1">{avgRating}</h2>
                      <div className="kalles-rating-result">
                        <span className="kalles-rating-result__pipe ,b-1">
                          <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                          <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                          <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                          <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                          <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                        </span>
                      </div>
                      <p className="text-muted">{reviews?.length} Review</p>
                    </Col>
                    <Col md={4}>
                      <div className="d-flex align-items-center my-2">
                        <p className="mb-0 me-2">Excellent</p>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          defaultValue="12"
                          className="slider slider1"
                          id="myRange"
                        />
                      </div>
                      <div className="d-flex align-items-center my-2">
                        <p className="mb-0 me-2">Very Good </p>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          defaultValue="0"
                          className="slider slider1"
                          id="myRange"
                        />
                      </div>
                      <div className="d-flex align-items-center my-2">
                        <p className="mb-0 me-2">Average</p>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          defaultValue="1"
                          className="slider slider1"
                          id="myRange"
                        />
                      </div>
                      <div className="d-flex align-items-center my-2">
                        <p className="mb-0 pe-2 me-4">Poor</p>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          defaultValue="0"
                          className="slider slider1"
                          id="myRange"
                        />
                      </div>
                      <div className="d-flex align-items-center my-2">
                        <p className="mb-0 me-2">Terrible</p>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          defaultValue="0"
                          className="slider slider1"
                          id="myRange"
                        />
                      </div>
                    </Col>
                    <Col md={2}>
                      <button
                        type="button"
                        className="btn btn-warning py-1 px-2"
                      >
                        <svg
                          className="me-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18.37"
                          height="17.8"
                          viewBox="0 0 21.682 21.602"
                        >
                          <g
                            id="Symbol_32_2"
                            data-name="Symbol 32 – 2"
                            transform="translate(-961.98 -374.155)"
                          >
                            <path
                              d="M0,0H4V11.2L1.937,14h0L0,11.2Z"
                              transform="translate(979.891 381.756) rotate(40)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            ></path>
                            <path
                              d="M0,0H4"
                              transform="translate(972.692 390.335) rotate(40)"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1"
                            ></path>
                            <g
                              transform="translate(981.126 380.964) rotate(40)"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1"
                            >
                              <rect
                                width="3.128"
                                height="1.4"
                                stroke="none"
                              ></rect>
                              <rect
                                x="0.5"
                                y="0.5"
                                width="2.128"
                                height="0.4"
                                fill="none"
                              ></rect>
                            </g>
                            <path
                              d="M2858.324,3384.6h7.412"
                              transform="translate(-1891.1 -3003.987)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            ></path>
                            <path
                              d="M2858.324,3384.6h7.412"
                              transform="translate(-1891.1 -2999.611)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeWidth="1"
                            ></path>
                            <path
                              d="M8.952,0H15a2,2,0,0,1,2,2V15a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V12.162"
                              transform="translate(979.48 391.655) rotate(180)"
                              fill="none"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            ></path>
                          </g>
                        </svg>{" "}
                        Write a review
                      </button>
                    </Col>
                  </Row>
                  <Row className="g-3">
                    {reviews?.length > 0 &&
                      reviews?.map((review) => {
                        return (
                          <Col sm={6} md={4}>
                            <Card>
                              <CardBody>
                                <div className="rounded-pill d-inline-block align-items-center p-1 bg-light">
                                  <div className="d-flex align-items-center">
                                    <p className="mb-0 rounded-pill  bg-warning text-white d-inline-block text-center d-flex justify-content-center align-items-center w-[25px] h-[25px]">
                                      {review.user.name[0]}
                                    </p>
                                    <span className="fw-bold mx-2">
                                      {review.user.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="kalles-rating-result my-2">
                                  <span className="kalles-rating-result__pipe ,b-1">
                                    <Rating
                                      name="read-only"
                                      value={review?.rating}
                                      readOnly
                                    />
                                  </span>
                                </div>
                                <h6>{review?.title}</h6>
                                <p className="text-muted mb-2">
                                  {review?.comment}
                                </p>
                                <p className="text-muted mb-2 opacity-75 fs-14">
                                  {formatRelativeDate(review?.createdAt)}
                                </p>
                              </CardBody>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                  {/* <div className="d-flex justify-content-center mt-4">
                    <Link
                      href="#"
                      className="btn  text-center fw-semibold"
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      Load more
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MobileAccordion;
