import React from "react";
import { Link } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import CategoriesSkeleton from "./../../skeleton/CategoriesSkeleton";

const Categories = () => {
  const { categoryList } = useProductStore();

  if (categoryList === null) {
    return <CategoriesSkeleton />;
  } else {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
            <span className="bodySmal mb-5 text-center">
              Explore a World of Choices Across Our Most Popular <br />
              Shopping Categories{" "}
            </span>
            {categoryList.map((item, index) => (
              <div key={index} className="col-6 col-lg-8r text-center col-md-8r p-2">
                <Link to={`/by-category/${item._id}`} className="card h-100 rounded-3 bg-white">
                  <div className="card-body d-flex flex-column align-items-center justify-content-between">
                    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                      <img alt="Category" className="w-75" src={item.categoryImg} />
                    </div>
                    <p className="bodySmal mt-3">{item.categoryName}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Categories;
