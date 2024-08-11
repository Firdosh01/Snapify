import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Images from "./Images";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

export default function Header() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("process.env.REACT_APP_API_KEY", process.env.REACT_APP_API_KEY);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setLoading(true);
        setErrorMsg("");
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
        );

        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error fetching images. Try again later.");
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10 bg-gray-900">
        <h1 className="text-xl font-bold text-white  font-mono">Search stunning photos in seconds</h1>
        <div className="mt-4 search-section">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Type something to search..."
              ref={searchInput}
              className="search-input"
              
            />
          </form>
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
