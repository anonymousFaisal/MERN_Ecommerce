import React from "react";
import parse from "html-react-parser";
import { useGetLegalDetailsQuery } from "../../redux/features/featureApi";
import ContentSkeleton from "../../skeleton/ContentSkeleton";

const LegalContents = ({ type }) => {
  const { data: legalDetails, isLoading } = useGetLegalDetailsQuery(type);
  if (isLoading || !legalDetails) {
    return <ContentSkeleton />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">{parse(legalDetails.description)}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default LegalContents;
