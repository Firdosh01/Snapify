import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Images({ image }) {
  return (
    <div
      key={image.id}
      className="w-full h-full"
    >
      <img
        src={image.urls.small_s3}
        alt={image.alt_description}
        className="w-full h-full p-2"
        loading="lazy"
      />
    </div>
  );
}
