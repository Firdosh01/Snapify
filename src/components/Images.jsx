import React from "react";

export default function Images({ image }) {
  return (
    <div key={image.id}>
      <img
        src={image.urls.small_s3}
        alt={image.alt_description}
        className="object-cover w-full rounded-lg shadow-md h-72"
        loading="lazy"
      />
    </div>
  );
}
