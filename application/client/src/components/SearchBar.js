import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, InputGroup, Dropdown, DropdownButton, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import SearchResults from './SearchResults';

export default function SearchBar() {
    
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  let navigate = useNavigate();

  // Event handler for setting the category. Event represents the dropdown option value
  // Can't get the dropdown option value using event.target.value like an input field
  const handleCategory = (event) => {
    //console.log(event)
    setCategory(event);
  }
  // Event handler for setting the search term
  const handleSearchTerm = (event) => {
    //console.log(event.target.value)
    setSearchTerm(event.target.value);
  }

  // Event handler for submitting the search parameters to send to backend
  const handleSubmit = (e) => {
      // Don't refresh the page upon submitting search queries
      //e.preventDefault();
      
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
            
            console.log('Data submitted is:');
            console.log(searchParams);
            console.log('Category input is: ' + searchParams.category);
            console.log('Search term input is ' + searchParams.searchTerm);
            
            // Set the state of search submitted to true so search results dsplay
            // setSearchSubmitted(true);
            // <SearchResults userSearched={searchSubmitted}/>
            navigate('/search');
            
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
      // setSearchTerm('');
      // setCategory('');
      setSearchSubmitted(false);  
  }

  return (
    <div className="search">
      <Container>
        <Row>
        <Col lg={true} />
        <InputGroup className="mb-auto">    
        <DropdownButton
          variant="outline-warning"
          // Default dropdown button title is All Categories and changes when a category is selected
          title={category === "" ? "All Categories" : category}
          id="input-group-dropdown-1"
          onSelect={handleCategory} // onSelect gets the value of the dropdown options. Can't use onChange
        >
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="Books">Books</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="Clothes">Clothes</Dropdown.Item>
        </DropdownButton>
          <FormControl aria-label="Search term text" onChange={handleSearchTerm}/>
          <Button variant={"outline-warning"} type="submit" onClick={handleSubmit}>Search</Button>
        </InputGroup>
        </Row>
      </Container>
    </div>
  )
}
