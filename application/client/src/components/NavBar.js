import { GlobalStyles } from './Global.js';
import { lightTheme, darkTheme } from './NavbarElements.js';
import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { ThemeProvider } from 'styled-components';
import { ReactComponent as Logo } from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from './SearchBar'
import '../css/nav.css';


export default function NavBar() {
  return (
    <div>
      <div class="title-text">
        <p>
        SFSU Software Engineering Project CSC 648-848, Spring 2022. For Demonstration Only
        </p>
      </div>
      {/* Changed the expand to sm from lg to make it mobile responsive */}
      <Navbar collapseOnSelect expand="sm" bg="secondary" variant="dark">
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
          {/* <SearchBar /> */}
        </Container>
        
        <Nav>
          <Nav.Link href="Post">Post</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link href="Login">Login</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link href="Signup">Signup</Nav.Link>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="User Profile" id="collapsible-nav-dropdown">
              <NavDropdown.Item
                href="Myprofile">MyProfile</NavDropdown.Item>
              <NavDropdown.Item href="MyPosts">
                My Posts
              </NavDropdown.Item>
              {/* Example on how to set up */}
              <NavDropdown.Item href="#action/3.4">
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>

        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Account" id="collapsible-nav-dropdown">
              <NavDropdown.Item
                href="Login">Log in</NavDropdown.Item>
              <NavDropdown.Item href="SignUp">
                Sign up
              </NavDropdown.Item>
             // Example on how to set up *
              <NavDropdown.Item href="#action/3.4"> 
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          
          <Nav>
            <Nav.Link href="About">About</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            </Nav.Link>
          </Nav>
        {/* </Navbar.Collapse> */}
        
      </Navbar >
    
    </div>
  );


};