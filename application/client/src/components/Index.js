
import React from "react";
import { Placeholder, Form, FormControl, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { ReactComponent as Logo } from "./logo.svg";
// import {ReactComponent as Form} from "./SearchBar.js"
import "bootstrap/dist/css/bootstrap.min.css";
// import SearchBar from "./SearchBar";

export default function Index() {
  return (


    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <Logo
          width="100"
          height="100"
          className="d-inline-block align-left"
        />
        GatorXChange
      </Navbar.Brand>
      <Container>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="ms-auto"
          arial-label="<Search>"
        />
        <Placeholder.Button variant={"outline-warning"}>Search</Placeholder.Button>
      </Form>
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
            {/* Dank memes */}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};