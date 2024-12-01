import React from "react";

export default function Images({ image }) {
  return (
    <div
      key={image.id}
      className="w-full h-full image-container"
    >
      <img
        src={image.urls.small_s3}
        alt={image.alt_description}
        className="w-full h-full p-2 object-cover cursor-pointer hover:grayscale-[60%] duration-500"
        loading="lazy"
      />
    </div>
  );
}
