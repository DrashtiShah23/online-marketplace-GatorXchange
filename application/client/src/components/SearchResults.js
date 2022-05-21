/*****************************************************
 * Purpose: Displays a list of search results
 * based on the user's search parameters that is
 * returned from the database
 * Input: User's search parameters in search bar
 * Output: A list of search result cards relating to 
 * the user's search parameters
 * Error Messages: None
 * Author: Thomas Nguyen
 *****************************************************/
import { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import {
  Form,
  Modal,
} from "react-bootstrap";

const SearchResults = () => {
  let [results, updateResults] = useState([]);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  // This function displays the list of search results received from database
  const displayResults = results.map((result, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-content">
          <p>Category: {result.category}</p>
        </div>
        {/* <div className="card-content">
          <p>Image: </p>
        </div> */}
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
        <Button onClick={handleShow} variant='primary'>
            Contact Seller
          </Button>
        <div>
          
        </div>
      </div>
    )
  });

  // Get the list of search results from database and store it in the results array
  const getSearchResults = () => {
    axios.get('/search')
      .then((res) => {
        //console.log(res.data);

        // Create a copy of the database results returned and then
        // update the state of the results array
        updateResults([...res.data]);
      })
      .catch((err) => {
        console.log('Failed to get search results');
        console.log(err);
      });
  }
  
  // Call this function when SearchResults component is rendered
  useEffect(() => {
    
    // This will generate a side effect that depends on the results array
    getSearchResults();
    
    /* 
      Render the search results page whenever any dependency value changes 
      Without a dependency array, this component will infinitely loop
      In this case, an empty dependency array guarantees the getSearchResults
      function runs only once. Add values if you want to control when the component re-renders
    */
  }, []);

  return (
    <div className="container">
      <div>
        <header>
          <h1>Search Results</h1>
        </header>
      </div>
      <div>
        <h2>Number of results returned: {results.length}</h2>
      </div>
      <div className="card-container">
        {/* Display the list of results from the database */}
        {displayResults}
        <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>Contact Seller</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form>
               <Form.Group className="email" >
                 <Form.Label>Email address</Form.Label>
                 <Form.Control
                   type="email"
                   placeholder="@sfsu.com"
                   autoFocus
                 />
               </Form.Group>
               <Form.Group className="item">
                 <Form.Label>Item</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Item Title"
                   />
               </Form.Group>
               <Form.Group
                 className="messagebox"
               >
                 <Form.Label>Message</Form.Label>
                 <Form.Control as="textarea" rows={3} placeholder="Message here..."/>
               </Form.Group>
             </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
               Cancel
             </Button>
             <Button variant="primary" onClick={handleClose}>
               Send
             </Button>
           </Modal.Footer>
         </Modal>
      </div>
    </div>
  );
};

export default SearchResults;