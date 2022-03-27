import { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';


const SearchResults = () => {
  let [results, updateResults] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // This function displays the list of search results received from database
  const displayResults = results.map((result, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-content">
          <p>Category: {result.category}</p>
        </div>
        <div className="card-content">
          <p>Image: </p>
        </div>
        <div className="card-content">
          <img className="thumbnail" src={result.thumbnail} alt=""/>
        </div>
        <div className="card-content">
          <p>Title: {result.title}</p>
        </div>
        <div className="card-content">
          <p>Price: ${result.price}.00</p>
        </div>
        <div className="card-content">
          <p>Description: {result.description}</p>
        </div>
      </div>
    )
  });

  // Get the list of search results from database and store it in the results array
  const getSearchResults = () => {
    axios.get('/search')
      .then((res) => {
        console.log(res.data);
        
        // Create a copy of the database results returned and then
        // update the state of the results array
        updateResults([...res.data]);
        
        setSearchSubmitted(!searchSubmitted);
        
      })
      .catch((err) => {
        console.log('Failed to get search results');
        console.log(err);
      })
    setSearchSubmitted(false);
    
      
  }

  useEffect(() => {
    
    // Call this function when SearchResults component is rendered
    // This will generate a side effect that depends on the results array
    getSearchResults()
    
    return () => {
      // Cleanup any side effects
      updateResults([]);
      
    }
    // Render the search results page whenever the state of the results title value changes, 
    // Without this dependency, this component will infinitely loop
  }, []);

  return (
    <div className="container">
      <div>
        <header>
          <h1>Search Results</h1>
        </header>
      </div>
      <div>
        <h3>Number of results returned: {results.length}</h3>
      </div>
      <div className="card-container">
        {/* Display the list of results from the database */}
        {displayResults} 
      </div>
    </div>
  );
};

export default SearchResults;