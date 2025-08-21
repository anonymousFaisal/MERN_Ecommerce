import React from "react";
import useProductStore from "../../store/useProductStore";
import Rating from "@mui/material/Rating";

const Reviews = () => {
  const { reviewList } = useProductStore();

  if (!Array.isArray(reviewList) || reviewList.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="mb-0 text-muted">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-group list-group-flush">
        {reviewList.map((review, index) => {
          const key = review?._id || index;
          const name = review?.profile?.cus_name || "Anonymous";
          const rating = parseFloat(review?.rating ?? 0) || 0;
          const des = review?.des || "";

          return (
            <li key={key} className="list-group-item mb-3 border rounded">
              <div className="d-flex align-items-start">
                {/* User icon */}
                <i className="bi bi-person-circle fs-3 me-3 text-secondary"></i>

                <div className="flex-grow-1">
                  <h6 className="mb-1">{name}</h6>
                  <Rating
                    value={rating}
                    readOnly
                    size="medium"
                    precision={0.5}
                  />
                  {des && <p className="mb-0 mt-2 text-muted">{des}</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
