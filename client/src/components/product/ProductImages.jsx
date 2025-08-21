import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import useProductStore from "../../store/useProductStore";

const ProductImage = () => {
  const { details } = useProductStore();
  let images = [
    { original: details.details.img1, thumbnail: details.details.img1 },
    { original: details.details.img2, thumbnail: details.details.img2 },
    { original: details.details.img3, thumbnail: details.details.img3 },
    { original: details.details.img4, thumbnail: details.details.img4 },
    { original: details.details.img5, thumbnail: details.details.img5 },
    { original: details.details.img6, thumbnail: details.details.img6 },
    { original: details.details.img7, thumbnail: details.details.img7 },
    { original: details.details.img8, thumbnail: details.details.img8 },
  ];
  return (
    <div>
      <ImageGallery autoPlay={true} items={images} />
    </div>
  );
};

export default ProductImage;
