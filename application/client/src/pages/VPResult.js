import { useState, useEffect } from 'react';
import '../css/about.css';
import axios from 'axios';


const VPResult = () => {
  const [results, updateResults] = useState([]);
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
  // Display the list of search results received from database
  const postList = test.map((result, i) => {
    <div className="card" key={i}>
        <div className="card-content">
          <li>{result.category}</li>
          <li>{result.image}</li>
          <li>{result.title}</li>
          <li>{result.price}</li>
          <li>{result.description}</li>
        </div>             
    </div>
  });
  // Get the list of search results from database and store it in the results array
  const getSearchResults = () => {
    axios.get('/VPResult')
      .then((res) => {
        console.log(res);
        updateResults(res);
      })
      .catch((err) => {
        console.log('Failed to get search results' + err);
      })
  }
  
  //   useEffect(() => {
  //   // Get the search queries to display the correct search results
  //   getSearchResults();
  // }, []);

  return (
    <div className="container">
      <header>
        <h1>Vertical Prototype Search Results</h1>
      </header>
      {getSearchResults}
      <div>
        <h3>Number of Results returned: {test.length}</h3>
        <h3>Here are your search results!</h3>
        <div className="card-container">
          {postList}
          {/*results*/}
        </div>
      </div>
    </div>
    );
};

export default VPResult;