
import React from "react";
import { Placeholder, Form, FormControl, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "./logo.svg";
// import {ReactComponent as Form} from "./SearchBar.js"
import "bootstrap/dist/css/bootstrap.min.css";
// import SearchBar from "./SearchBar";

export default function Index() {
  return (


    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <Logo
          width="100"
          height="100"
        // className="d-inline-block align-left"
        />
        GatorXChange
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#About">Features</Nav.Link>
          <Nav.Link href="#Pricing">Pricing</Nav.Link>
          <NavDropdown title="Hello, Sign in" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Sign in</NavDropdown.Item>
            <NavDropdown.Item href="#Register/3.2">
              Register
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">About</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            Fira-Code="<Search>"
          />
          <Placeholder.Button  variant={"outline-warning"}>Search</Placeholder.Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};