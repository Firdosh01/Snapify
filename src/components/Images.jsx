import React, { useEffect, useState } from "react";

export default function Images({ image }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  return (
    <>
      {!isZoomed ? (
        <div key={image.id} className="w-full h-full image-container">
          <img
            src={image.urls.small_s3}
            alt={image.alt_description}
            className="w-full h-full p-2 object-cover cursor-pointer hover:grayscale-[60%] duration-500"
            loading="lazy"
            onClick={() => {
              setIsZoomed(true);
            }}
          />
        </div>
      ) : (
        <div
          className="zoom-image_container"
          onClick={() => {
            setIsZoomed(false);
          }}
        >
          <div className="scrollable-image">
            <img src={image.urls.full} alt="img" className="zoomed-image" />
          </div>
        </div>
      )}
    </>
  );
}
