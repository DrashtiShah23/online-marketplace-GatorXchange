import React, { useState } from 'react'
import { 
  Container, Row, InputGroup, Dropdown, DropdownButton, Form, FormControl, Button 
} from 'react-bootstrap';
import axios from 'axios';

export default function SearchBar() {
  // Category and search term state variables  
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  
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
      e.preventDefault();
      
      // Create search parameters that will be used for SQL queries into the database
      const searchParams = {
        category: category,
        searchTerm: searchTerm,
      };
      // Send a POST request to the server
      axios.post('/search', searchParams)
        .then((res) => {
          // If status is OK, redirect user to the search results page
          if (res.status === 200) {
            // For checking data is correct in inspector
            console.log('Data submitted is:');
            console.log(searchParams);
            console.log('Category input is: ' + searchParams.category);
            console.log('Search term input is ' + searchParams.searchTerm);
            
            // Redirect to the search results page which renders the search results component
            window.location = '/search';
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
  }

  return (
    <div className="search">
      
      <Container>
        
        <Row>
          
          <Form onSubmit={handleSubmit} >
          
            <Form.Group className="mb-auto">
              
              <InputGroup>
                
                {/* <Form.Select name="category" value={category} onChange={handleCategory}>
                  <option value="">All</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                </Form.Select> */}
                <DropdownButton
                  variant="outline-warning"
                  // Default dropdown button title is All Categories and changes when a category is selected
                  title={category === "" ? "All Categories" : category}
                  id="categories"
                  name="category"
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
                
                <FormControl aria-label="Search term" onChange={handleSearchTerm} name="searchTerm"/>
                
                <Button variant={"outline-warning"} type="submit">Search</Button>

              </InputGroup>
            
            </Form.Group>
          
          </Form>
        
        </Row>
      
      </Container>
    
    </div>
  )
}
