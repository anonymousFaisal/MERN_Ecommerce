import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import useProductStore from "../../store/useProductStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";

const ProductList = () => {
  const { listProduct } = useProductStore();
  const renderProducts = () => {
    if (listProduct === null) return <ProductsSkeleton />;

    if (!Array.isArray(listProduct) || listProduct.length === 0) {
      return <div className="col-12 py-5 text-center text-muted">No products found.</div>;
    }

    return listProduct.map((item) => {
      const hasDiscount = item?.discount === true && item?.discountPrice;
      const priceBlock = hasDiscount ? (
        <p className="bodyMedium text-dark my-1">
          Price: <strike>${item.price}</strike> ${item.discountPrice}
        </p>
      ) : (
        <p className="bodyMedium text-dark my-1">Price: ${item.price}</p>
      );

      return (
        <div key={item._id} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
          <Link to={`/details/${item._id}`} className="card shadow-sm h-100 rounded-3 bg-white text-decoration-none">
            <img className="w-100 rounded-top-2" src={item.image} alt={item.title} />
            <div className="card-body">
              <p className="bodySmal text-secondary my-1">{item.title}</p>
              {priceBlock}
              <Rating value={parseFloat(item?.star ?? 0) || 0} readOnly size="medium" precision={0.5} />
            </div>
          </Link>
        </div>
      );
    });
  };
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            {/* Brand Filter */}
            <label className="form-label mt-3">Brands</label>
            <select className="form-control form-select">
              <option value="">Choose Brand</option>
            </select>

            {/* Category Filter */}
            <label className="form-label mt-3">Categories</label>
            <select className="form-control form-select">
              <option value="">Choose Category</option>
            </select>

            {/* Maximum Price */}
            <label className="form-label mt-3">Maximum Price ${}</label>
            <input min={0} max={1000000} step={1000} type="range" className="form-range" />

            {/* Minimum Price */}
            <label className="form-label mt-3">Minimum Price ${}</label>
            <input min={0} max={1000000} step={1000} type="range" className="form-range" />
          </div>
        </div>

        {/* Product List Section */}
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">{renderProducts()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
