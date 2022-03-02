
import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";


const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/sign-up" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
      <div className="container">
      <header className="aboutHeader">
          <h4>  
            Software Engineering class SFSU <br /> Spring, 2022 <br /> Section 03 <br /> Team 01 
          </h4>
      </header>
      </div>
    </>
  );
};
  
export default Navbar;