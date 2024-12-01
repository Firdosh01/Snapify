import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Images from "./Images";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

export default function Header() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("mountain")
  // console.log("process.env.REACT_APP_API_KEY", process.env.REACT_APP_API_KEY);

  const fetchImages = useCallback(async () => {
    try {
      if (searchQuery !== "") {
        setLoading(true);
        setErrorMsg("");
  
        const { data } = await axios.get(
          `${API_URL}?query=${searchQuery}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
        if (data.results.length === 0) {
          setErrorMsg("No images found for your search query.");
          setImages([]);
          setTotalPages(0);
        } 
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error fetching images. Try again later.");
      console.log("error", error);
      setLoading(false);
    }
  }, [page, searchQuery]);
  

  useEffect(() => {
    fetchImages();
    setPage(1);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10 bg-gray-900 md:h-[350px]"
         style={{
          backgroundImage: `url('./unsplash-img.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
       <div className="h-full w-full flex flex-col justify-end items-center">
        <div className="mt-4 search-section">
          <div className="px-2 pb-2">
         <h1 className="md:text-5xl text-4xl font-bold text-white font-mono">Snapify</h1>
         <h1 className="md:text-base text-sm font-bold text-white  font-mono">Unleash the power of pixels.</h1>
         <h1 className="md:text-base text-sm font-bold text-white  font-mono">Your next idea starts with the perfect image.</h1>
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Type something to search..."
              // ref={searchInput}
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
              className="search-input"
            />
          </form>
        </div>
       </div>
      </div>

      {errorMsg && (
        <p className="pt-5 font-serif text-center error-msg">{errorMsg}</p>
      )}

      <div>
        {loading && !errorMsg ? (
          <Spinner />
        ) : (
          <div >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              
            >
              <Masonry>
                {images.map((image) => (
                  <Images image={image} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        )}
      </div>
      {!loading && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
}
