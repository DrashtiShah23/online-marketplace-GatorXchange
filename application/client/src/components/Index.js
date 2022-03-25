
import React from "react";
import { Placeholder, FormControl, Nav, Navbar, NavDropdown, Container, Col, Row, Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
// import { InputGroup } from "react-bootstrap/InputGroup"
import { ReactComponent as Logo } from "./logo.svg";
// import {ReactComponent as Form} from "./SearchBar.js"
import "bootstrap/dist/css/bootstrap.min.css";
// import SearchBar from "./SearchBar";

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
        <Row>
          <Col lg={true} />
          <InputGroup className="mb-auto">
            <DropdownButton
              variant="outline-secondary"
              title="Dropdown"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-label="Text input with dropdown button" />
            <Placeholder.Button variant={"outline-warning"}>Search</Placeholder.Button>
          </InputGroup>
        </Row>
      </Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown title="Sign in" id="collapsible-nav-dropdown">
            <NavDropdown.Item
              href="Login">Sign in</NavDropdown.Item>
            <NavDropdown.Item href="SignUp">
              Register
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="About">About</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


  );


};