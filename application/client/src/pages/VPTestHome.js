import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {test} from './rawData.js'
import axios from 'axios';
import '../css/about.css';


const VPTestHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [rawData, setrawData] = useState([]) 
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting search queries
    setrawData(test)
    e.preventDefault();

    // Create search parameters that will be used for SQL queries into the database
    const searchParams = {
      category: category,
      searchTerm: searchTerm,
    };
    console.log(searchParams);
    axios.post('/VPResult', searchParams)
      .then((res) => {
        // If status is OK, alert the user of submission success and that they
        // will be redirected to another page that displays the search results
        //if (res.status === 200) {
        alert('Received search params. Redirecting to show search results...');
        console.log(res.data);
        console.log('Data submitted is:');
        console.log(searchParams);
        console.log('Category input is: ' + searchParams.category);
        console.log('Search term input is ' + searchParams.searchTerm);

        // Redirect to the vertical prototype result page after form submission
        navigate("/VPResult", { replace: true });

        
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
          console.log('Server responded');
        }
        else if (err.request) {
          console.log(err.request);
          console.log('Network error or server is offline');
        }
        console.log('Search submission failed :(');
        console.log(err);
      });

    // Reset the search term and category values after submission
    setSearchTerm('');
    setCategory('');
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
        {
          rawData.map((result, i) => {
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
          }) 
        }
      </div>
    </div>

  );
};

export default VPTestHome;