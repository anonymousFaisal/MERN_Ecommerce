import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductImage = ({ details }) => {
  if (!details?.details) return null;

  const placeholderImg = "https://placehold.co/600x600/f8f9fa/adb5bd?text=Image+Not+Found";

  // Filter out empty image strings to prevent broken thumbnails
  const images = [
    details.details.img1,
    details.details.img2,
    details.details.img3,
    details.details.img4,
    details.details.img5,
    details.details.img6,
    details.details.img7,
    details.details.img8,
  ]
    .filter((img) => img && img.trim() !== "" && img !== "undefined" && img !== "null")
    .map((img) => ({ original: img, thumbnail: img }));

  // Fallback if no images exist
  if (images.length === 0) {
    images.push({
      original: placeholderImg,
      thumbnail: placeholderImg,
    });
  }

  return (
    <div className="product-image-gallery rounded-4 overflow-hidden bg-white shadow-sm p-2 p-md-4 mb-4 mb-md-0">
      <ImageGallery
        autoPlay={false}
        items={images}
        showPlayButton={false}
        showNav={true}
        thumbnailPosition="bottom"
        onErrorImageURL={placeholderImg}
      />
    </div>
  );
};

export default ProductImage;
