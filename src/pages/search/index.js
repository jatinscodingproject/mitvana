import { getProduct } from "@src/api/services/productService";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import React, { useEffect, useState } from "react";
import ProductCard from "../home-cosmetics/ProductCard";
import { Row } from "react-bootstrap";
import ProductModal from "@src/commonsections/ProductModal";
import FooterCosmetics from "@src/components/FooterCosmetics";
import Fuse from "fuse.js"; // Import Fuse.js

let debounceTimeout;

function Search() {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const fetchProduct = async () => {
    try {
      const resProduct = await getProduct();
      setProductData(resProduct);
      setFilteredData(resProduct); // Initially, all products are displayed
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    // Debouncing logic
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(debounceTimeout); // Cleanup
  }, [searchValue]);

  useEffect(() => {
    // Filter logic using Fuse.js
    if (debouncedSearchValue.trim()) {
      const options = {
        keys: ["category.name", "productTitle", "productDescription"], // Fields to search in
        threshold: 0.4, // Adjust for sensitivity (0: exact match, 1: match anything)
      };
      const fuse = new Fuse(productData, options);
      const results = fuse.search(debouncedSearchValue);
      setFilteredData(results.map((result) => result.item));
    } else {
      setFilteredData(productData); // Show all products when search is empty
    }
  }, [debouncedSearchValue, productData]);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(!show);
  };

  return (
    <div>
      <HeaderCosmetics
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="container" style={{ marginTop: "40px" }}>
        {debouncedSearchValue && filteredData.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#999",
              marginTop: "50px",
              marginBottom: "50px",
              height: "200px",
              fontSize: "1.5rem",
            }}
          >
            No products found
          </div>
        ) : (
          <>
            {debouncedSearchValue && filteredData.length !== 0 && (
              <h1
                style={{
                  textAlign: "center",
                  color: "#333",
                  marginBottom: "20px",
                  fontSize: "1.5rem",
                }}
              >
                {filteredData.length} results found for "{debouncedSearchValue}"
              </h1>
            )}

            {filteredData.length > 0 && (
              <Row className="g-3 row-cols-2 row-cols-md-3 row-cols-lg-4">
                {filteredData.map((product) => (
                  <div className="col" key={product._id}>
                    <ProductCard
                      handleShow={handleShow}
                      colWidth={11}
                      key={product._id}
                      product={product}
                    />
                  </div>
                ))}
              </Row>
            )}
          </>
        )}
      </div>

      <ProductModal
        show={show}
        handleClose={handleShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
      <FooterCosmetics />
    </div>
  );
}

export default Search;
