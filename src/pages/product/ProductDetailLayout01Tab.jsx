import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Nav,
  Tab,
  Modal,
  Card,
  CardBody,
  Dropdown,
  Button,
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import "react-toastify/dist/ReactToastify.css";
import { afacad } from "../_app";

import thumbsticky from "@assets/images/single-product/layout-02/thumb-sticky.jpg";
import { backendUrl } from "@src/api/axios";
import { addReview, getReview } from "@src/api/services/reviewService";
import Rating from "@mui/material/Rating";
import { getItem } from "@src/api/localStorage";
import { Toaster, toast } from "react-hot-toast";
// import { backendUrl } from "@src/api/axios";

const ProductDetailLayout01Tab = ({
  productDetail,
  activeTab,
  handleTabChange,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (hasReviewed) {
      toast.success("You already reviewed");
      return;
    }
    setShow(true);
  };
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState();

  const [avgRating, setAvgRating] = useState();
  const [distribution, setDistribution] = useState();
  const [reviewImage, setReviewImage] = useState(null);
  const [reviewVideo, setReviewVideo] = useState(null);
  // state for modal
  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");

  // Function to handle showing the modal
  const handleShowModal = (url, type) => {
    setMediaUrl(url);
    setMediaType(type);
    setShowModal(true);
  };

  const token = getItem("accessToken");
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  const handleFileChange = (e, setFile, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Define allowed formats for each file type
      const allowedImageFormats = ["jpeg", "jpg", "png"];
      const allowedVideoFormats = ["mp4", "avi", "mkv"];
      const maxFileSize = fileType === "image" ? 1 : 10; // 1 MB for images, 10 MB for videos

      // Check file size
      if (fileSizeInMB > maxFileSize) {
        toast.error(
          `File size should be less than or equal to ${maxFileSize} MB for ${fileType}s.`
        );
        return;
      }

      // Check file format
      const isAllowedFormat =
        fileType === "image"
          ? allowedImageFormats.includes(fileExtension)
          : allowedVideoFormats.includes(fileExtension);

      if (!isAllowedFormat) {
        toast.error(
          `Invalid ${fileType} format. Allowed formats: ${
            fileType === "image"
              ? allowedImageFormats.join(", ")
              : allowedVideoFormats.join(", ")
          }`
        );
        return;
      }

      setFile(file); // Set the file if all checks pass
    }
  };

  const handleSubmit = async () => {
    try {
      if (!rating) {
        toast.error("Please give rating");
        return;
      }

      const formData = new FormData();
      formData.append("reviewTitle", reviewTitle);
      formData.append("reviewContent", reviewContent);
      formData.append("rating", rating);

      // Append image file if it exists
      if (reviewImage instanceof File) {
        formData.append("reviewImage", reviewImage);
      } else {
        console.error("Invalid file object", reviewImage);
      }

      // Append video file if it exists
      if (reviewVideo) {
        formData.append("reviewVideo", reviewVideo);
      }

      const res = await addReview(formData, productDetail?._id);
      if (res && res == true) {
        handleClose();
        toast.dismiss();
        toast.success("Review Added Successfully", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const maxLength = 100;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReview(productDetail?._id);
        setReviews(res.reviews);
        setHasReviewed(res?.hasReviewed);
        setDistribution(res?.distribution);
        setAvgRating(res.avgRating);
      } catch (error) {
        console.log(error);
      }
    };
    if (productDetail?._id) fetchReviews();
  }, [productDetail]);

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value); // Ensures it's only true when the captcha is completed
  };

  const getPercentage = (count) => {
    const totalReviews = Object.values(distribution).reduce(
      (acc, count) => acc + count,
      0
    );
    return ((count / totalReviews) * 100).toFixed(2);
  };

  return (
    <React.Fragment>
      <Toaster />
      <div
        className=" mb-5 py-5 d-none d-lg-block main-project-section "
        id="tabs"
      >
        <div className="container">
          <Tab.Container
            id="left-tabs-example"
            activeKey={activeTab}
            onSelect={handleTabChange}
          >
            <Row className="nav tab_header justify-content-center">
              <Col>
                <Nav
                  variant="pills"
                  className="tab_header nav_tabs justify-content-center"
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="ProductDescription"
                      className="rounded-pill pill-border fw-medium custom-nav-link"
                    >
                      Description
                    </Nav.Link>
                  </Nav.Item>
                  {productDetail?.ingredients?.length > 0 && (
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Description"
                        className="rounded-pill pill-border fw-medium custom-nav-link"
                      >
                        Key Ingredients
                      </Nav.Link>
                    </Nav.Item>
                  )}

                  {productDetail?.howToUse && (
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Additionalinformation"
                        className="rounded-pill pill-border fw-medium custom-nav-link"
                      >
                        How to Use
                      </Nav.Link>
                    </Nav.Item>
                  )}

                  <Nav.Item>
                    <Nav.Link
                      eventKey="Warrantyshipping"
                      className="rounded-pill pill-border fw-medium custom-nav-link"
                    >
                      Additional Information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="Reviews"
                      className="rounded-pill pill-border fw-medium custom-nav-link"
                    >
                      Reviews
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col className="p-[0 90px]">
                <Tab.Content className="mt-5">
                  <Tab.Pane eventKey="ProductDescription">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetail?.description,
                      }}
                      className=" product-description afacad-flux text-lg"
                    />
                  </Tab.Pane>
                  {productDetail?.ingredients?.length > 0 && (
                    <Tab.Pane eventKey="Description">
                      <div className=" grid grid-cols-2 gap-4 p-4">
                        {productDetail?.ingredients?.length > 0 &&
                          productDetail?.ingredients.map((item) => {
                            return (
                              <div className="flex justify-between">
                                <div className="w-[15%] h-full">
                                  <img
                                    className="min-w-20 min-h-20 rounded-full"
                                    src={backendUrl + item?.image}
                                  />
                                </div>
                                <div className="w-[80%]">
                                  <p className="afacad-flux text-lg">
                                    <span className="font-semibold mr-1">
                                      {item?.title}:
                                    </span>
                                    {item?.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </Tab.Pane>
                  )}

                  {productDetail?.howToUse && (
                    <Tab.Pane eventKey="Additionalinformation">
                      <div className="how_to_use_div flex flex-row gap-6">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productDetail?.howToUse?.description,
                          }}
                          className="afacad-flux text-lg"
                        />
                      </div>
                    </Tab.Pane>
                  )}

                  <Tab.Pane eventKey="Warrantyshipping">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetail?.features,
                      }}
                      className="afacad-flux text-lg"
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Reviews">
                    <Row className="mb-3" id="reviewTab">
                      <Col md={2} className="text-center">
                        <p className="mb-0">Average</p>
                        <h2 className="fw-bold my-1">{avgRating}</h2>
                        <div className="kalles-rating-result">
                          <span className="kalles-rating-result__pipe ,b-1">
                            <span className="kalles-rating-result__start kalles-rating-result__start--big me-1"></span>
                            <span className="kalles-rating-result__start kalles-rating-result__start--big me-1"></span>
                            <span className="kalles-rating-result__start kalles-rating-result__start--big me-1"></span>
                            <span className="kalles-rating-result__start kalles-rating-result__start--big active me-1"></span>
                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big me-1"></span>
                          </span>
                        </div>
                        <p className="text-muted">{reviews?.length} Review</p>
                      </Col>
                      <Col md={4}>
                        {distribution &&
                          Object.entries(distribution).map(([key, value]) => (
                            <div
                              className="d-flex align-items-center my-2"
                              key={key}
                            >
                              <p className="mb-0 me-2 text-nowrap">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </p>
                              <div
                                className="progress"
                                style={{
                                  flexGrow: 1,
                                  height: "5px",
                                  backgroundColor: "#e0e0e0",
                                }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${getPercentage(value)}%`,
                                    backgroundColor: "#f7b731",
                                  }}
                                ></div>
                              </div>
                              <span className="ms-2">{value}</span>
                            </div>
                          ))}
                      </Col>
                      {token && (
                        <Col md={2}>
                          <button
                            type="button"
                            className="btn btn-warning py-1 px-2 border"
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                            onClick={handleShow}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
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
                            </svg>
                            Write a review
                          </button>
                        </Col>
                      )}
                    </Row>
                    <Row className="g-3 review-container">
                      {reviews?.length > 0 &&
                        reviews?.map((review, index) => {
                          return (
                            <Col sm={6} md={4} key={index}>
                              <Card className="">
                                <CardBody>
                                  {/* Reviewer name */}
                                  <div className="rounded-pill d-inline-block align-items-center p-1 bg-light">
                                    <div className="d-flex align-items-center">
                                      <p className="mb-0 rounded-pill bg-warning text-white d-inline-block text-center d-flex justify-content-center align-items-center w-[25px] h-[25px]">
                                        {review?.user?.name[0]}
                                      </p>
                                      <span className="fw-bold mx-2">
                                        {review?.user?.name}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Rating */}
                                  <div className="kalles-rating-result my-2">
                                    <Rating
                                      name="read-only"
                                      value={review?.rating}
                                      readOnly
                                    />
                                  </div>

                                  {/* Review title and content */}
                                  <h6>{review?.title}</h6>
                                  <p className="text-muted mb-2">
                                    {isExpanded
                                      ? review?.comment
                                      : `${review?.comment.slice(
                                          0,
                                          maxLength
                                        )}...`}
                                    {review?.comment?.length > maxLength && (
                                      <button
                                        onClick={toggleExpand}
                                        style={{
                                          color: "blue",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        {isExpanded ? "Read less" : "Read more"}
                                      </button>
                                    )}
                                  </p>

                                  <Row>
                                    {/* Image */}
                                    {review?.image && (
                                      <Col>
                                        <img
                                          src={backendUrl + review?.image}
                                          width={100}
                                          height={100}
                                          alt="review-image"
                                          className="review-image"
                                          onClick={() =>
                                            handleShowModal(
                                              backendUrl + review?.image,
                                              "image"
                                            )
                                          } // Open modal on click
                                        />
                                      </Col>
                                    )}

                                    <Col>
                                      {/* Video */}

                                      <video
                                        width={100}
                                        height={100}
                                        src={backendUrl + review?.video}
                                        style={{ cursor: "pointer" }}
                                        className="review-video"
                                        onClick={() =>
                                          handleShowModal(
                                            backendUrl + review?.video,
                                            "video"
                                          )
                                        } // Open modal on click
                                      />
                                    </Col>
                                  </Row>

                                  {/* Date */}
                                  <p className="text-muted mb-2 opacity-75 fs-14">
                                    {formatRelativeDate(review?.createdAt)}
                                  </p>
                                </CardBody>
                              </Card>
                            </Col>
                          );
                        })}
                    </Row>
                    {/* Modal for showing the image or video */}
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Review {mediaType === "image" ? "Image" : "Video"}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="d-flex justify-content-center">
                        {mediaType === "image" ? (
                          <img
                            src={mediaUrl}
                            alt="review media"
                            className="img-fluid"
                          />
                        ) : (
                          <video
                            style={{ cursor: "pointer" }}
                            src={mediaUrl}
                            controls
                            className="img-fluid"
                          />
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* <div className="d-flex justify-content-center mt-4">
                      <div className="d-flex justify-content-center mt-4">
                        <Link
                          href="#"
                          className="btn  text-center fw-semibold sub-gray"
                        >
                          Load more
                        </Link>
                      </div>
                    </div> */}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="p-4">
              <a
                href="#!"
                className="fs-35 close position-absolute top-0 end-0"
                aria-label="Close"
                onClick={handleClose}
              >
                <i className="pe-7s-close pegk"></i>
              </a>
              <h2 className="fs-22 mb-3">Rate Us</h2>
              <div className="border p-3 rounded-1">
                <div className="d-flex align-items-center">
                  {productDetail?.images?.length > 0 && (
                    <img
                      src={backendUrl + productDetail?.thumbnail}
                      alt=""
                      className="max-w-[65px] max-h-[75px] w-auto align-middle"
                    />
                  )}
                  <h6 className="mb-1 fs-14 fw-bold ms-2">
                    {productDetail?.name}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 mt-3">
                <p className="text-muted mb-0 fw-bold">Quality</p>
                <div className="kalles-rating-result">
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="fw-medium mb-2 text-muted">
                  Review Title
                </label>
                <input
                  id="title"
                  className="form-control form-control-sm py-2 rounded-0"
                  placeholder="Look great"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  type="text"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="fw-medium mb-2 text-muted">
                  Review Content
                </label>
                <textarea
                  id="review"
                  rows={9}
                  className="form-control form-control-sm py-2 rounded-0"
                  placeholder="Write something"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="reviewImage" className="form-label">
                  Upload Image (optional)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="reviewImage"
                  accept=".jpeg, .jpg, .png"
                  onChange={(e) => handleFileChange(e, setReviewImage, "image")}
                />
                <p className="text-muted text-sm fs-12">
                  Please upload an image file (jpeg, jpg, png) no larger than 10
                  MB.
                </p>
              </div>

              <div className="mb-3">
                <label htmlFor="reviewVideo" className="form-label">
                  Upload Video (optional)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="reviewVideo"
                  accept=".mp4, .avi, .mkv"
                  onChange={(e) => handleFileChange(e, setReviewVideo, "video")}
                />
                <p className="text-muted text-sm  fs-12">
                  Please upload an Video file(.mp4, .avi, .mkv) no larger than
                  10 MB.
                </p>
              </div>
              <ReCAPTCHA
                onChange={handleCaptchaChange}
                sitekey="6LcZN8EqAAAAAJahPwqGoHQXp78JUlaSYSxMfLHE"
              />
              <button
                type="button"
                className="btn btn-warning rounded-1 mt-2 py-2 px-2 fw-semibold"
                onClick={handleSubmit}
                disabled={!captchaVerified}
              >
                Submit Your Review
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ProductDetailLayout01Tab;
