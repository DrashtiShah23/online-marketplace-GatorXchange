/******************************************************
 * Purpose: Allows the user to search for a post by
 * selecting a category and entering a search term
 * Input: Category, Search Term
 * Output: Renders the search results page
 * Error Messages: None
 * Author: Thomas Nguyen, Drashti Shah
 ******************************************************/
import React, { useState, useEffect } from "react";
// import { useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';
import {
  Container,
  Row,
  InputGroup,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  // Category and search term state variables
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [hidden, setHidden] = useState(true);
  let [results, updateResults] = useState([]);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // let navigate = useNavigate();

  // Event handler for setting the category. Event represents the dropdown option value
  // Can't get the dropdown option value using event.target.value like an input field
  const handleCategory = (event) => {
    console.log(event);
    setCategory(event);
    // console.log(event.target.value)
    // setCategory(event.target.value);
  };
  // Event handler for setting the search term
  const handleSearchTerm = (event) => {
    if (event.target.value.length >= 40) {
      window.alert("Search term shouldn't exceed 40 characters!");
    }
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

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
    axios
      .post("/search", searchParams)
      .then((res) => {
        // If status is OK, redirect user to the search results page
        if (res.status === 200) {
          // For checking data is correct in inspector
          console.log("Data submitted is:");
          console.log(searchParams);
          console.log("Category input is: " + searchParams.category);
          console.log("Search term input is " + searchParams.searchTerm);

          // Redirect to the search results page which renders the search results component
          //window.location = "/search";
          // navigate('/search', {replace: true});
          // <Routes>
          // <Route path="/search" element={<SearchResults/>} />
          // </Routes>
          // <Navigate to="/search" replace={true} />
          setSearchSubmitted(true);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("Server status is: " + err.response.status);
        } else if (err.request) {
          console.log(err.request);
          console.log("Network error or server is offline");
        }
        console.log("Search submission failed :(");
        console.log(err);
      });

    // Reset the search term, category, and search submitted state values after submission
    // setSearchTerm('');
    // setCategory('');
    setSearchSubmitted(false);
    setHidden(false);
  };

  // Event handler for submitting the message information to send to backend
  const handleSubmitMessage = (e) => {
    // Don't refresh the page upon submitting search queries
    e.preventDefault();
    // Prevents form from being submitted if form is not valid

    // Create message parameters that will be used for SQL queries into the database
    const MessageData = {
      email: email,
      message: message,
    };
    // Send a POST request to the server
    axios
      .post("/message", MessageData)
      .then((res) => {
        // If status is OK, redirect user to the message page
        if (res.status === 200) {
          // For checking data is correct in inspector
          console.log("Data submitted is:");
          console.log(MessageData);

          console.log("Email input is " + MessageData.email);

          console.log("Message input is " + MessageData.id);

          // Show a window alert if the user is able to send the message to the seller successfully
          window.alert("Message sent to the seller!");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("Server status is: " + err.response.status);
        } else if (err.request) {
          console.log(err.request);
          console.log("Network error or server is offline");
        }
        console.log("Registration failed :(");
        console.log(err);
      });
  };

  const displayProductsHome = results.map((result, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-content">
          <p>Category: {result.category}</p>
        </div>

        <div className="card-content">
          <img className="thumbnail" src={result.thumbnail} alt="" />
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

        <Button onClick={handleShow} variant="primary">
          Contact Seller
        </Button>
      </div>
    );
  });

  const getAllResultsHome = () => {
    axios.post("/search", { category: "", searchTerm: "" });
    axios
      .get("/search")
      .then((res) => {
        results = [...res.data];
        console.log(results);
        updateResults(results);
      })
      .catch((err) => {
        console.log("Failed to get search results" + err);
      });
  };
  useEffect(() => {
    getAllResultsHome();
  }, []);

  return (
    <div className="search">
      <Container>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-auto">
              <InputGroup>
                {/* <Form.Select name="category" value={category} onChange={handleCategory}>
                  <option value="">All</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                </Form.Select> */}
                <DropdownButton
                  variant="warning"
                  menuVariant="dark"
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
                  <Dropdown.Item eventKey="Electronics">
                    Electronics
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="Clothes">Clothes</Dropdown.Item>
                </DropdownButton>

                <FormControl
                  aria-label="Search term"
                  onChange={handleSearchTerm}
                  name="searchTerm"
                />

                <Button
                  onClick={() => setHidden((s) => !s)}
                  variant={"warning"}
                  type="submit"
                >
                  Search
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>
      </Container>

      {/* Display a list of search results each time user submits a search */}
      {searchSubmitted ? <SearchResults /> : null}

      <div className="card-containerHomepage">
        {hidden ? displayProductsHome : false}
      </div>
      <main>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="@sfsu.com" autoFocus />
              </Form.Group>

              <Form.Group className="messagebox">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Message here..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                handleSubmitMessage();
              }}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}
