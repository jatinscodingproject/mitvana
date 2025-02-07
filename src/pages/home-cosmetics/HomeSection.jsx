import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import slide1 from "@assets/images/home-bags/bg1.png";
import slide2 from "@assets/images/home-bags/bg2.png";
import slide3 from "@assets/images/home-bags/bg3.jpg";

import "flickity/css/flickity.css";

const HomeSection = () => {
  const flickityRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Flickity
      const FlickityClass = require("flickity");
      flickityRef.current = new FlickityClass(".slideshow", {
        fade: false,
        cellAlign: "center",
        imagesLoaded: false,
        lazyLoad: false,
        freeScroll: false,
        wrapAround: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        rightToLeft: false,
        prevNextButtons: false,
        pageDots: true,
        contain: true,
        adaptiveHeight: true,
        dragThreshold: 5,
        percentPosition: true,
      });

      // Initialize AOS (Animate On Scroll)
      // AOS.init();
    }

    // Cleanup Flickity on unmount
    // return () => {
    //   if (flickityRef && flickityRef.current) {
    //     flickityRef?.current.destroy();
    //   }
    // };
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Flickity
      const FlickityClass = require("flickity");
      flickityRef.current = new FlickityClass(".blog-arrow", {
        cellAlign: "left",
        imagesLoaded: false,
        wrapAround: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        prevNextButtons: true,
        pageDots: false,
        contain: true,
        adaptiveHeight: false,
        groupCells: "100%",
        dragThreshold: 5,
        percentPosition: true,
      });

      // Initialize AOS (Animate On Scroll)
      // AOS.init();
    }

    // Cleanup Flickity on unmount
    // return () => {
    //   if (flickityRef.current) {
    //     flickityRef.current.destroy();
    //   }
    // };
  }, []);


  const slide = [
    {
      id: 1,
      pic: slide1,     
      new: "NEW PRODUCT", 
      desc1: "Mitvana's Intimate Wash with NEEM AND CHAMOMILE",
      desc2: "",
    },
    {
      id: 2,
      pic: slide2,     
      new: "NEW PRODUCT", 
      desc1: "Mitvana's Vitalizing Hair Oil with Amla and Centella",
      desc2: "",
    },
    {
      id: 3,
      pic: slide3,     
      new: "NEW PRODUCT", 
      desc1: "Mitvana's Derma Face Wash with Neem & Turmeric",
      desc2: "",
    }
  ]


  // useEffect(()=>{

  //   const getBannerImages = async()=>{
  //     try {
  //       const res = await getHomePageImages()
  //       console.log(res)

  //       const slide = res[0]?.images?.map((item, index) => {
  //         return {
  //           id: index + 1, // Unique ID for each object
  //           pic: item,     // Image from the res.images array
  //           new: "NEW PRODUCT", 
  //           desc1: "Mitvana's Derma Face Wash with Neem & Turmeric",
  //           desc2: "Goodness",
  //         };
  //       });

  //       console.log("hey" , slide)

  //       setImages(slide)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getBannerImages()
  // },[])

  return (
    <React.Fragment>
      <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-cosmetics overflow-hidden">
        <div className="slideshow">
          {slide?.map((item) => (
            <div className="slideshow__slide" key={item.id}>
              <Image
                src={item.pic}
                alt=""
                className="position-absolute w-100 h-100 object-fit-cover"
              />
              <div className="container position-relative">
                <Row>
                  <Col lg={5} className="offset-md-1">
                    <div className="content">
                      {item.desc2 ? (
                        <h4 className="fs-55 font-playfair fw-semibold text-lima mb-3">
                          {item.desc1} <br />
                          {item.desc2}
                        </h4>
                      ) : (
                        <h1 className="fs-55 font-playfair fw-semibold text-lima mb-3">
                          {item.desc1}
                        </h1>
                      )}
                      <Link
                        className="btn btn-cosmetics d-inline-flex align-items-center justify-content-center rounded-0 text-uppercase  text-lima"
                        href="/shop"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};
export default HomeSection;