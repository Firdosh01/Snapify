import React, { useEffect, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";

export default function Images({ image }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handledDownloadImage = async () => {
    try {
      const response = await fetch(image.urls.full);
      const blob = await response.blob();

      // convert the blob to Data String Url
      let url = window.URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      a.href = url;
      a.download = image.id;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Something Went Wrong... Unable to Download Image");
    }
  };

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
        <div key={image.id} className="w-full h-full image_container">
          <div className="group relative w-full h-full">
            <img
              src={image.urls.small_s3}
              alt={image.alt_description}
              className="w-full h-full p-2 object-cover cursor-pointer hover:grayscale-[80%] duration-500"
              loading="lazy"
              onClick={() => {
                setIsZoomed(true);
              }}
            />
            <div className="group-hover:block hidden absolute bottom-[20px] left-[0px] px-6 w-full">
              <div className="flex justify-between items-center w-full">
                <a
                  href={image.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 text-white items-center cursor-pointer font-medium"
                >
                  <img
                    src={image.user.profile_image.large}
                    alt="image"
                    className="rounded-full w-[40px] h-[40px]"
                  />
                  {image.user.name}
                </a>
                <div
                  className="bg-white rounded px-3 py-2 cursor-pointer download_image_btn"
                  onClick={handledDownloadImage}
                  variant="contained"
                  size="small"
                  disableElevation
                >
                  <FaArrowDownLong />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="zoom_image_container"
          onClick={() => {
            setIsZoomed(false);
          }}
        >
          <div className="scrollable_image">
            <img src={image.urls.full} alt="img" className="zoomed_image" />
          </div>
        </div>
      )}
    </>
  );
}
