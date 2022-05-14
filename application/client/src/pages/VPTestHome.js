/*********************************************************************
 * Purpose: Vertical prototype of home page in Milestone 2
 * Input: None
 * Output: List of search results based on user search parameters
 * Error Messages: None
 * Author: Thomas Nguyen
 *********************************************************************/
 //import SearchBar from '../components/SearchBar';
 import axios from 'axios';
 import React, { useState} from "react";
 import {Button} from 'react-bootstrap'
 import { Form } from "react-bootstrap";
 import { Modal } from "react-bootstrap";
 import SearchBar from '../components/SearchBar';
 import '../css/App.css';
 
 const VPTestHome = () => {
   //message box modal
   return (
     <div className="container">  
       <h1>Welcome to GatorXChange <br/> The platform made for gators, by gators.</h1>
       <SearchBar/>
     </div>
   );
 };
 
 export default VPTestHome;