import { backendUrl } from "@src/api/axios";
import {
  getWishlistProducts,
  removeProductFromWishlist,
} from "@src/api/services/wishlistService";
import React, { useEffect, useState } from "react";

function Wishlist() {
  const [WishlistDetail, setWishlistDetail] = useState([]);
  const getWishlistDetail = async () => {
    const res = await getWishlistProducts();
    setWishlistDetail(res);
  };
  useEffect(() => {
    getWishlistDetail();
  }, []);

  const handleRemoveWishlist = async (id) => {
    try {
      const res = await removeProductFromWishlist(id);

      if (res && res == true) getWishlistDetail();
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      <div>
        <div className="container mt-4 space-y-3">
          <div className="row fw-semibold">
            <div className="col-3">PRODUCT</div>
            <div className="col-3">NAME</div>
            <div className="col-3">PRICE</div>
          </div>
          <hr />
          {WishlistDetail?.map((product, index) => {
            const imageUrl = backendUrl + product?.thumbnail;
            return (
              <div key={index} className="space-y-4">
                <div className="row small fw-semibold">
                  <div className="col-3">
                    <div className="custom-size bg-black d-flex flex-column justify-content-center relative">
                      <img src={imageUrl} />
                      <div
                        className="absolute  right-2"
                        onClick={() => {
                          handleRemoveWishlist(product.product._id);
                        }}
                        style={{ top: "-18px" }}
                      >
                        <span className="extrabold cursor-pointer fs-4">x</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 d-flex flex-column justify-content-center">
                    <p> {product?.product?.name}</p>
                  </div>
                  <div className="col-3 d-flex flex-column justify-content-center">
                    <p>
                      MRP: ₹
                      {parseInt(product?.product?.variants[0]?.price)?.toFixed(
                        2
                      )}
                    </p>
                  </div>
                  <div className="col-3 d-flex flex-column justify-content-center">
                    <button className="custom-bg-2 fw-semibold p-3 tracking-wider">
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
