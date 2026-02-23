import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useGetBrandListQuery, useGetCategoryListQuery, useGetProductListByFilterMutation } from "../../redux/features/productApi";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import NoData from "../layout/NoData";

const ProductList = ({ defaultProducts, defaultFetching }) => {
  const { data: brandList } = useGetBrandListQuery();
  const { data: categoryList } = useGetCategoryListQuery();
  const [fetchFilteredProducts, { data: filteredProducts, isLoading: isFilterLoading }] = useGetProductListByFilterMutation();

  const [filter, setFilter] = useState({
    brandID: "",
    categoryID: "",
    priceMin: 0,
    priceMax: 100000,
  });

  const [isFiltering, setIsFiltering] = useState(false);

  const inputOnChange = (name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // priceMax is initialized to 100000 and priceMin to 0, so they are not empty strings.
    // We should check if they deviate from defaults or if brand/category are set.
    const isFilterActive = filter.brandID !== "" || filter.categoryID !== "" || filter.priceMin > 0 || filter.priceMax < 100000;

    if (isFilterActive) {
      setIsFiltering(true);
      fetchFilteredProducts(filter);
    } else {
      setIsFiltering(false);
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

  const activeProducts = isFiltering ? filteredProducts : defaultProducts;
  const activeFetching = isFiltering ? isFilterLoading : defaultFetching;

  const productsArea = useMemo(() => {
    if (activeFetching || !activeProducts) return <ProductsSkeleton />;

    if (!Array.isArray(activeProducts) || activeProducts.length === 0) {
      return <NoData />;
    }

    return (
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        {activeProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    );
  }, [activeProducts, activeFetching]);

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
        <div className="col-md-9">{productsArea}</div>
      </div>
    </div>
  );
};

export default ProductList;
