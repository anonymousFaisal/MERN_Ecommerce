import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import useProductStore from "../../store/useProductStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";

const ProductList = () => {
  const { listProduct, brandList, categoryList, fetchBrands, fetchCategories, fetchListByFilter } = useProductStore();

  const [filter, setFilter] = useState({
    brandID: "",
    categoryID: "",
    priceMin: 0,
    priceMax: 100000,
  });

  const inputOnChange = (name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch brands/categories once, refetch products when filter changes
  useEffect(() => {
    if (!brandList) fetchBrands();
    if (!categoryList) fetchCategories();

    const isEveryFilterEmpty = Object.values(filter).every((value) => value === "");
    if (!isEveryFilterEmpty) {
      fetchListByFilter(filter); // server-side filter
    } else {
      // optionally: fetch all products here if filter empty
      // fetchListByFilter({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const renderProducts = () => {
    if (listProduct === null) return <ProductsSkeleton />;

    if (!Array.isArray(listProduct) || listProduct.length === 0) {
      return <div className="col-12 py-5 text-center text-muted">No products found.</div>;
    }

    return listProduct.map((item) => {
      const hasDiscount = item?.discount && item?.discountPrice;
      return (
        <div key={item._id} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
          <Link to={`/details/${item._id}`} className="card shadow-sm h-100 rounded-3 bg-white text-decoration-none">
            <img className="w-100 rounded-top-2 p-2" src={item.image} alt={item.title} />
            <div className="card-body">
              <p className="bodySmal text-secondary my-1">{item.title}</p>
              {hasDiscount ? (
                <p className="bodyMedium text-dark my-1">
                  Price: <strike>${item.price}</strike> ${item.discountPrice}
                </p>
              ) : (
                <p className="bodyMedium text-dark my-1">Price: ${item.price}</p>
              )}
              <Rating value={Number.parseFloat(item?.star ?? 0) || 0} readOnly size="medium" precision={0.5} />
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            {/* Brand Filter */}
            <label className="form-label mt-3">Brands</label>
            <select className="form-control form-select" value={filter.brandID} onChange={(e) => inputOnChange("brandID", e.target.value)}>
              <option value="">Choose Brand</option>
              {Array.isArray(brandList) &&
                brandList.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.brandName}
                  </option>
                ))}
            </select>

            {/* Category Filter */}
            <label className="form-label mt-3">Categories</label>
            <select className="form-control form-select" value={filter.categoryID} onChange={(e) => inputOnChange("categoryID", e.target.value)}>
              <option value="">Choose Category</option>
              {Array.isArray(categoryList) &&
                categoryList.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.categoryName}
                  </option>
                ))}
            </select>

            {/* Maximum Price */}
            <label className="form-label mt-3">Maximum Price ${filter.priceMax}</label>
            <input
              min={0}
              max={100000}
              step={100}
              type="range"
              className="form-range"
              value={filter.priceMax}
              onChange={(e) => inputOnChange("priceMax", Number(e.target.value))}
            />

            {/* Minimum Price */}
            <label className="form-label mt-3">Minimum Price ${filter.priceMin}</label>
            <input
              min={0}
              max={100000}
              step={100}
              type="range"
              className="form-range"
              value={filter.priceMin}
              onChange={(e) => inputOnChange("priceMin", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Product List */}
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
