import React from "react";
import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceHolder from "../../src/assets/images/image.json";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-7 align-content-center p-1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Skeleton count={10} />
              </div>
              {Array.from({ length: 4 }).map(() => (
                <div className="col-3">
                  <Lottie className="w-100" animationData={ImagePlaceHolder} loop={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-5 p-1">
          <Skeleton count={16} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
