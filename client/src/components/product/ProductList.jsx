import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import useProductStore from "../../store/useProductStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import NoData from "../layout/NoData";

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

  // fetch brands/categories once, refetch products when filter changes
  useEffect(() => {
    if (!brandList) fetchBrands();
    if (!categoryList) fetchCategories();

    const isEveryFilterEmpty = Object.values(filter).every((v) => v === "");
    if (!isEveryFilterEmpty) {
      fetchListByFilter(filter);
    } else {
      // optionally fetch all products here
      // fetchListByFilter({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fmt = (n) => (typeof n === "number" ? n.toLocaleString(undefined, { minimumFractionDigits: 0 }) : n);

  const ProductCard = ({ item }) => {
    const hasDiscount = item?.discount && item?.discountPrice;
    const starValue = Number.parseFloat(item?.star ?? 0) || 0;

    return (
      <div className="col">
        <Link to={`/details/${item._id}`} className="card h-100 shadow-sm border-0 text-decoration-none product-card">
          <div className="position-relative">
            {hasDiscount && <span className="badge bg-danger-subtle text-danger-emphasis position-absolute m-2 px-2 py-1 rounded-2">Sale</span>}
            <img
              className="card-img-top p-2 rounded-3 object-fit-contain bg-body-tertiary"
              style={{ height: 180 }}
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
          </div>

          <div className="card-body">
            <p className="text-secondary bodyMedium mb-2" title={item.title}>
              {item.title}
            </p>

            {hasDiscount ? (
              <div className="d-flex align-items-baseline gap-2">
                <span className="fw-semibold text-dark">${fmt(item.discountPrice)}</span>
                <span className="text-decoration-line-through text-muted small">${fmt(item.price)}</span>
              </div>
            ) : (
              <div className="fw-semibold text-dark">${fmt(item.price)}</div>
            )}
          </div>

          <div className="card-footer bg-transparent border-0 pt-0">
            <Rating value={starValue} readOnly size="small" precision={0.5} />
          </div>
        </Link>
      </div>
    );
  };

  const productsArea = useMemo(() => {
    if (listProduct === null) return <ProductsSkeleton />;

    if (!Array.isArray(listProduct) || listProduct.length === 0) {
      return (
        <NoData/>
      );
    }

    return (
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        {listProduct.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    );
  }, [listProduct]);

  return (
    <div className="container py-3">
      <div className="row g-3">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0" style={{ top: 16 }}>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0">Filters</h6>
              </div>

              {/* Brand */}
              <div className="mb-3">
                <label className="form-label small text-muted">Brand</label>
                <select className="form-select" value={filter.brandID} onChange={(e) => inputOnChange("brandID", e.target.value)}>
                  <option value="">Choose Brand</option>
                  {Array.isArray(brandList) &&
                    brandList.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.brandName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label small text-muted">Category</label>
                <select className="form-select" value={filter.categoryID} onChange={(e) => inputOnChange("categoryID", e.target.value)}>
                  <option value="">Choose Category</option>
                  {Array.isArray(categoryList) &&
                    categoryList.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.categoryName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Price max */}
              <div className="mb-3">
                <label className="form-label small text-muted">
                  Max Price: <span className="fw-semibold">${fmt(filter.priceMax)}</span>
                </label>
                <input
                  min={0}
                  max={100000}
                  step={100}
                  type="range"
                  className="form-range"
                  value={filter.priceMax}
                  onChange={(e) => inputOnChange("priceMax", Number(e.target.value))}
                />
              </div>

              {/* Price min */}
              <div className="mb-2">
                <label className="form-label small text-muted">
                  Min Price: <span className="fw-semibold">${fmt(filter.priceMin)}</span>
                </label>
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

              {/* Visual price range bar (purely cosmetic) */}
              <div className="progress" role="progressbar" aria-label="Selected price range">
                <div
                  className="progress-bar bg-secondary-subtle"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((filter.priceMax - filter.priceMin) / 100000) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-9">
          {productsArea}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
