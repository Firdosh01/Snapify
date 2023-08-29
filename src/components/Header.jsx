import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;


export default function Header() {

  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  console.log(page)


  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg('');
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY
          }`
        );

        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
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

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  return (
    <div>
      <div className='flex flex-col items-center py-10 bg-gray-900'>

        <h1 className='font-serif font-bold text-white'>Image Search</h1>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}

        <div className='mt-4 search-section'>
          <form onSubmit={handleSearch}>
            <input type='search'
              placeholder='Type something to search...'
              ref={searchInput}
              className='search-input'
            />
          </form>
        </div>

        <div className='flex flex-row gap-5 mt-4'>
          
          <button 
          className='px-3 py-1 text-center text-white bg-blue-600 rounded-md' 
          onClick={() => handleSelection('nature')}
          >
            Nature
          </button>
          
          <button 
          className='px-3 py-1 text-center text-white bg-blue-600 rounded-md' 
          onClick={() => handleSelection('birds')}
          >
            Birds
          </button>
          
          <button 
          className='px-3 py-1 text-center text-white bg-blue-600 rounded-md' 
          onClick={() => handleSelection('cats')}
          >
            Cats
          </button>
          
          <button 
          className='px-3 py-1 text-center text-white bg-blue-600 rounded-md' 
          onClick={() => handleSelection('shoes')}
          >
            Shoes
          </button>
          
        </div>

      </div>

      <div>
        {
          <div className='grid gap-4 px-4 mx-auto my-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl'>
            {
              images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.urls.full}
                  alt={image.alt_description}
                  className='object-cover w-full rounded-lg shadow-md h-72'
                  />
              ))}
          </div>
        }
      </div>
         <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  )
}
