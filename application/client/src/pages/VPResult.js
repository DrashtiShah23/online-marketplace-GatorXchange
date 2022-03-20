import { useState, useEffect } from 'react';
import '../css/about.css';
import axios from 'axios';




const VPResult = () => {
  let [results, updateResults] = useState([]);
  let [result2, setResult2] = useState([])
  
  const test = [ {
      category: 'books',
      image: '/path/to/image',
      title: 'math book',
      price: 30.00,
      description: 'for calculus 101'
    },
    {
      category: 'electronics',
      image: '/path/to/image',
      title: 'mouse',
      price: 10.00,
      description: 'old mouse for sale'
    },
    {
      category: 'books',
      image: '/path/to/image',
      title: 'computer science book',
      price: 40.00,
      description: 'for csc 648'
    },
    {
      category: 'clothes',
      image: '/path/to/image',
      title: 'sweater',
      price: 45.00,
      description: 'for the winter'
    },
    {
      category: 'electronics',
      image: '/path/to/image',
      title: 'phone charger',
      price: 20.00,
      description: 'for iphone'
    },
  ];
  // Display the pst of search results received from database
  const post = results.map((result, i) => {
    return (
    <div className="card" key={i}>
        <div className="card-content">
          <p>Category: {result.category}</p>
          <p>Image: {result.image}</p>
          <p>Title: {result.title}</p>
          <p>Price: {result.price}</p>
          <p>Description: {result.description}</p>
        </div>             
    </div>
    )
  });
  // Get the pst of search results from database and store it in the results array
  const getSearchResults = () => {
    axios.get('/VPResult')
      .then((res) => {
        // Create a copy of the database results returned
        results = [...res.data];
        
        console.log(results);
        
        // Update the results array state
        updateResults(results);
        
      })
      .catch((err) => {
        console.log('Failed to get search results' + err);
      })
  }
  
    useEffect(() => {
    // Get the search queries to display the correct search results
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
        <div className="card-container">
          {/* Display the pst of results from the database */}
          {
            results.map((result, i) => {
              return (
                <div className="card" key={i}>
                  <div className="card-content">
                    <p>Category: {result.category}</p>
                    <p>Image: {result.image}</p>
                    <p>Title: {result.title}</p>
                    <p>Price: ${result.price}.00</p>
                    <p>Description: {result.description}</p>
                  </div>
                </div> 
              )
            })
          }
        </div>
      </div>
    </div>
    );
};

export default VPResult;