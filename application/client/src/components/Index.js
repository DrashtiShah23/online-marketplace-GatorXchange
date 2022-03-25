import { GlobalStyles } from './Global.js';
import { lightTheme, darkTheme } from './NavbarElements.js';
import React from "react";
import {
  Button, Form, Placeholder, FormControl, Nav, Navbar, NavDropdown,
  Container, Col, Row, Dropdown, DropdownButton, InputGroup
} from "react-bootstrap";
import { ThemeProvider } from 'styled-components';
import { ReactComponent as Logo } from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import VPTestHome from '../pages/VPTestHome';
import SearchBar from './SearchBar'


export default function Index() {
  return (
    
    /* React-bootstrap components please read websites documentation to style. ENJOY*/
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <Logo
          animation="border"
          as="span"
          width="100"
          height="100"
          className="d-inline-block align-left"
        />
        GatorXChange
      </Navbar.Brand>
      <Container>
        {/* <Row>
          <Col lg={true} />
          <InputGroup className="mb-auto">
            <DropdownButton
              variant="outline-secondary"
              title="Categories"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Books</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Electronics</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Clothes</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-label="Text input with dropdown button" />
            <Placeholder.Button variant={"outline-warning"}>Search</Placeholder.Button>
            
          </InputGroup>
          
        </Row> */}
        <SearchBar />  
      </Container>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown title="Account" id="collapsible-nav-dropdown">
            <NavDropdown.Item
              href="Login">Sign in</NavDropdown.Item>
            <NavDropdown.Item href="SignUp">
              Register
            </NavDropdown.Item>
            {/* Example on how to set up */}
            <NavDropdown.Item href="#action/3.4">
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="About">About</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar >


  );


};