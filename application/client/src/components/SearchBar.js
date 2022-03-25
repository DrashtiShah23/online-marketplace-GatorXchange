import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, Dropdown, DropdownButton, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

export default function SearchBar({ placeholder, data }) {
    
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
    <div className="search">
      <Container>
        <Row>
        <Col lg={true} />
        <InputGroup className="mb-auto">    
        <DropdownButton
          variant="outline-secondary"
          title="Categories"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item eventKey="books">Books</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="electronics">Electronics</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="clothes">Clothes</Dropdown.Item>
        </DropdownButton>
        
          <FormControl aria-label="Text input with dropdown button" />
          <Button variant={"outline-warning"}>Search</Button>
        </InputGroup>
        </Row>
      </Container>
    </div>
  )
}
