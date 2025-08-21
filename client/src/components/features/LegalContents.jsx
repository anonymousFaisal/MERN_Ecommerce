import React from "react";
import parse from "html-react-parser";
import useFeatureStore from "../../store/useFeatureStore";
import ContentSkeleton from "../../skeleton/ContentSkeleton";

const LegalContents = () => {
  const { legalDetails } = useFeatureStore();
  if (legalDetails === null) {
    return <ContentSkeleton />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              {parse(legalDetails.description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LegalContents;
