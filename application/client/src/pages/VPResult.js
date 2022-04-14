/*********************************************************************
 * Purpose: Vertical prototype of search results in Milestone 2
 * Input: User's search parameters in search bar
 * Output: A list of search results related to search parameters
 * Error Messages: None
 * Author: Thomas Nguyen
 *********************************************************************/
import { useState, useEffect } from 'react';
import '../css/about.css';
import axios from 'axios';


const VPResult = () => {
  let [results, updateResults] = useState([]);
  
  // This function displays the list of search results received from database
  const displayResults = results.map((result, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-content">
          <p>Category: {result.category}</p>
          <p>Image: <img src={result.thumbnail}/></p>
          <p>Title: {result.title}</p>
          <p>Price: ${result.price}.00</p>
          <p>Description: {result.description}</p>
        </div>
    </div>
    )
  });
  // Get the list of search results from database and store it in the results array
  const getSearchResults = () => {
    axios.get('/search')
      .then((res) => {
        // Create a copy of the database results returned
        results = [...res.data];
        console.log(results);
        
        // Update the state of the results array
        updateResults(results);

      })
      .catch((err) => {
        console.log('Failed to get search results' + err);
      })
  }


  useEffect(() => {
    // Call this function when VPResult component is rendered
    getSearchResults();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Vertical Prototype Search Results</h1>
      </header>

      <div>
        <h3>Number of Results returned: {results.length}</h3>
        <h3>Here are your search results!</h3>
      </div>

      <div className="card-container">
        {/* Display the list of results from the database */}
        {displayResults}
      </div>
    </div>
  );
};

export default VPResult;