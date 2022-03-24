import { useState } from 'react';
import axios from 'axios';
import '../css/about.css';
import VPResult from './VPResult';


const VPTestHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  

  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting search queries
    e.preventDefault();

    // Create search parameters that will be used for SQL queries into the database
    const searchParams = {
      category: category,
      searchTerm: searchTerm,
    };
    
    axios.post('/search', searchParams)
      .then((res) => {
        // If status is OK, alert the user of submission success and that they
        // will be redirected to another page that displays the search results
        if (res.status === 200) {
          
          console.log(res.data);
          console.log('Data submitted is:');
          console.log(searchParams);
          console.log('Category input is: ' + searchParams.category);
          console.log('Search term input is ' + searchParams.searchTerm);
          
          // Set the state of search submitted to true so search results dsplay
          setSearchSubmitted(true);
          
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log('Server status is: ' + err.response.status);
        }
        else if (err.request) {
          console.log(err.request);
          console.log('Network error or server is offline');
        }
        console.log('Search submission failed :(');
        console.log(err);
      });
    
    // Reset the search term, category, and search submitted state values after submission
    setSearchTerm('');
    setCategory('');
    setSearchSubmitted(false);  
  }

  return (
    <div className="container">
      <header>
        <h1>Vertical Prototype Test Home Page</h1>
      </header>
      {/* Get user search params */}
      <div>
        <select name="categories" id="categories" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Select a category</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="clothes">Clothes</option>
        </select>
        <input name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Search</button>
      </div>
      <div>
        {/* Display a list of search results each time user submits a search */}
        {searchSubmitted ? <VPResult />: null}
      </div>
    </div>

  );
};

export default VPTestHome;