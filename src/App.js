import logo from './logo.svg';
import './App.css';
import { useEffect, useRef } from 'react';
import axios from 'axios';


const API_URL = 'https://api.unsplash.com/search/photos'
const IMAGES_PER_PAGE = 20;

function App() {
  const searchInput = useRef(null)
  console.log(process.env.REACT_APP_API_KEY)


  useEffect(() => {
    const getImages = async () => {
      try{
      const result = await axios.get(`${API_URL}?query=${'nature'}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`)
      console.log(result.data)
      }
      catch(error) {
        console.log(error)
      }
    }
    getImages()
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    console.log(searchInput.current.value)
  }
  
  return (
    <div>
      <div>
        <h1>Image Search</h1>
        <div>
          <form onSubmit={handleSearch} >
            <input 
            type="text"
            placeholder='search image...'
            ref={searchInput}
             />            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
