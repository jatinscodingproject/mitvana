import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { WishlistData } from "@src/common/shop/ProductData";
import AddToCardModal from "@src/commonsections/AddToCardModal";
import ProductModal from "@src/commonsections/ProductModal";
import Image from "next/image";
import Link from "next/link";
import { backendUrl } from "@src/api/axios";
import { removeProductFromWishlist } from "@src/api/services/wishlistService";
import ProductCard from "../home-cosmetics/ProductCard";

// const ProductCard = ({
//   getWishlistDetail,
//   product,
//   handleShow,
//   handleAddToCardModalShow,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageUrl, setImageUrl] = useState(
//     backendUrl + product?.product?.thumbnail
//   );

//   const handleRemoveWishlist = async (e) => {
//     try {
//       e.stopPropagation()

//       const res = await removeProductFromWishlist(product.product._id);

//       if (res && res == true) getWishlistDetail();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log("product", product, imageUrl);

//   return (
//     <>
//       <Link    href={`/product/${product.product.productCustomUrl}`} className="product-title">
//       <div className="topbar-product-card pb-3 afacad-flux text-lg">
//         <div className="position-relative overflow-hidden">
//           <img src={imageUrl} alt="" className="img-fluid w-100" />
//           <OverlayTrigger
//             placement="top"
//             overlay={<Tooltip>Add to Wishlist</Tooltip>}
//           >
//             <Link
//               href="#"
//               className="d-lg-none position-absolute"
//               style={{ zIndex: 1, top: "10px", left: "10px" }}
//             >
//               <i className="facl facl-heart-o text-white"></i>
//             </Link>
//           </OverlayTrigger>
//           <OverlayTrigger
//             placement="top"
//             overlay={<Tooltip>Remove Wishlist</Tooltip>}
//           >
//             <Link
//               href="#"
//               onClick={(e)=>handleRemoveWishlist(e)}
//               className="wis_remove_icon fs-18 shadow-sm d-flex align-items-center justify-content-center rounded-circle bg-white position-absolute"
//             >
//               <i className="las la-trash"></i>
//             </Link>
//           </OverlayTrigger>
//           <div className="product-button d-none d-lg-flex flex-column gap-2">
//             <Link
//               href="#exampleModal"
//               data-bs-toggle="modal"
//               className="btn rounded-pill fs-14"
//               onClick={handleShow}
//             >
//               <span>Quick View</span> <i className="iccl iccl-eye"></i>
//             </Link>
//             <button
//               type="button"
//               className="btn rounded-pill fs-14"
//               data-bs-toggle="modal"
//               data-bs-target="#cardModal"
//               onClick={handleAddToCardModalShow}
//             >
//               <span>Quick Shop</span>
//               <i className="iccl iccl-cart"></i>
//             </button>
//           </div>
//           <div
//             className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
//             style={{ zIndex: 1 }}
//           >
//             <Button
//               variant="link"
//               className="btn responsive-cart rounded-pill fs-14 p-2"
//               style={{ width: "36px", height: "36px" }}
//               onClick={handleShow}
//             >
//               <i className="iccl iccl-eye fw-semibold"></i>
//             </Button>
//             <Button
//               variant="link"
//               className="btn responsive-cart rounded-pill fs-14 p-2"
//               style={{ width: "36px", height: "36px" }}
//               onClick={handleAddToCardModalShow}
//             >
//               <i className="iccl iccl-cart fw-semibold"></i>
//             </Button>
//           </div>
//           <p className="product-size mb-0 text-center text-white fw-medium">
//             {product.size}
//           </p>
//         </div>
//         <div className="mt-3">
//           <h6 className="mb-1">
//             <Link    href={`/product/${product.productCustomUrl}`} className="product-title">
//               {product?.product?.productTitle}
//             </Link>
//           </h6>
//           <p className="mb-0 fs-14 text-muted">
//             {/* <del className="text-danger">{product.del}</del> */}
//             <span>₹ {product?.product?.discountedPrice
//                   ? parseInt(product?.product?.discountedPrice).toFixed(2)
//                   : parseInt(product?.product?.price).toFixed(2)}</span>

//           </p>
//         </div>
//         {product.colors ? (
//           <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
//             {product.colors &&
//               product.colors.map((color, index) => (
//                 <Link
//                   href="#!"
//                   key={index}
//                   onMouseOver={() => setImageUrl(color.imageUrl)}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setImageUrl(color.imageUrl);
//                   }}
//                   className={`d-inline-block ${color.color} rounded-circle`}
//                 ></Link>
//               ))}
//           </div>
//         ) : (
//           <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
//             {product.color &&
//               product.color.map((color, index) => (
//                 <Link
//                   href="#!"
//                   key={index}
//                   onMouseOver={(e) => {
//                     e.preventDefault();
//                     setImageUrl(color.imageUrl);
//                     setIsHovered(false);
//                   }}
//                   style={{
//                     background: `url('${color.imageUrl.src}')`,
//                     backgroundSize: "cover",
//                   }}
//                   className="d-inline-block bg-body-tertiary rounded-circle"
//                 />
//               ))}
//           </div>
//         )}
//       </div>
//       </Link>
//     </>
//   );
// };

const FilterTab = ({ WishlistDetail, getWishlistDetail }) => {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [cardShow, setCardShow] = useState(false);

  const handleClose = () => setShow(false);


  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);

  // const handleOpen = () => {
  //     setOpen(!open)
  // }

  const [display, setDisplay] = useState(3);
  const [selectedProduct, setselectedProduct] = useState();


  const handleShow = (product) => {
    setselectedProduct(product);
    setShow(!show);
  };
  return (
    <React.Fragment>
      <Container>
        <div className="tab-content my-3 my-md-4" id="pills-tabContent">
          <div
            className={`tab-pane fade ${display === 3 ? "active show" : ""}`}
            id="best-pan1"
            role="tabpanel"
            aria-labelledby="best-pan1-tab"
            tabIndex={0}
          >
            <Row className="g-3 row-cols-2 row-cols-md-4 row-cols-lg-4">
              {WishlistDetail?.map((product) => {
                return (
                  <div className="col" key={product._id}>
                    <ProductCard
                      colWidth={12}
                      key={product.id}
                      product={product.product}
                      handleShow={handleShow}
                      handleAddToCardModalShow={handleAddToCardModalShow}
                    />
                  </div>
                );
              })}
            </Row>
          </div>
        </div>
      </Container>
      <ProductModal show={show} handleClose={handleClose} />
      <AddToCardModal
        cardShow={cardShow}
        handleAddToCardModalClose={handleAddToCardModalClose}
      />
       <ProductModal
        // handleLoginShow={handleLoginShow}
        show={show}
        handleClose={handleShow}
        selectedProductId={selectedProduct?._id}
        selectedProductCustomUrl={selectedProduct?.productCustomUrl}
      />
    </React.Fragment>
  );
};

export default FilterTab;
