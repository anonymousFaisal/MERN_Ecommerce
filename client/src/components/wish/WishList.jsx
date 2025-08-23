import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import useWishStore from "../../store/useWishStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import NoData from "../layout/NoData";

const WishList = () => {
  const { wishList, fetchWishList, fetchRemoveWish } = useWishStore();

  useEffect(() => {
    (async () => {
      await fetchWishList();
    })();
  }, []);

  const remove = async (productID) => {
    await fetchRemoveWish(productID);
    await fetchWishList();
  };
  if (wishList === null) {
    return <ProductsSkeleton />;
  } else if (wishList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          {wishList.map((item, i) => {
            let price = <p className="bodyMedium text-dark my-1">Price: ${item.product.price}</p>;

            if (item.product.discount === true) {
              price = (
                <p className="bodyMedium text-dark my-1">
                  Price:
                  <strike> ${item.product.price} </strike> ${item.product.discountPrice}
                </p>
              );
            }

            return (
              <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                <div className="card shadow-sm h-100 rounded-3 bg-white">
                  <img alt="" className="w-100 rounded-top-2" src={item.product.image} />
                  <div className="card-body">
                    <p className="bodySmal text-secondary my-1">{item.product.title}</p>
                    {price}
                    <Rating value={Number.parseFloat(item?.product.star ?? 0) || 0} readOnly size="medium" precision={0.5} />

                    <p className="mt-3">
                      <button
                        onClick={async () => {
                          await remove(item.productID);
                        }}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Remove
                      </button>
                      <Link className="btn mx-2 btn-outline-success btn-sm" to={`/details/${item.productID}`}>
                        Details
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default WishList;
