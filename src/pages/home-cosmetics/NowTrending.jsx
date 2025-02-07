import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import ProductModal from "@src/commonsections/ProductModal";
import MainPopup from "@src/components/Mainpopup";


import "flickity/css/flickity.css";
import ProductCard from "./ProductCard";

const NowTrending = ({ products }) => {
  const flickityRef = useRef(null);

  const [isOpen, setIsOpen] = useState(true); // Automatically open on page load

  // Optional delay before opening popup
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500); // Delay 500ms before showing popup
    return () => clearTimeout(timer);
  }, []);

  const [selectedProduct, setSelectedProduct] = useState();
  const [show, setShow] = useState(false);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(!show);
  };

  return (
    <React.Fragment>
      <section className="kalles-cosmetics-trending-products pb-4">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-4">
                <div>
                  <h1 className="text-4xl position-relative text-center text-capitalize font-playfair text-lima fw-medium">
                    <span>Now Trending</span>
                  </h1>
                  <span className="dn tt_divider">
                    <span></span>
                    <i className="la la-spa text-muted"></i>
                    <span></span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <div className="row mt-4">
            {products?.map((product) => (
              <ProductCard
                handleShow={handleShow}
                colWidth={3} // Use Flickity settings to manage width
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* MainPopup Component - Automatically Opens */}
      <MainPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      {/* Product Modal */}
      <ProductModal
        show={show}
        handleClose={handleShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
    </React.Fragment>
  );
};

export default NowTrending;
