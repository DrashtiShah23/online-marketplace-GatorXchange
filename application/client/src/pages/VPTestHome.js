/*********************************************************************
 * Purpose: Vertical prototype of home page in Milestone 2
 * Input: None
 * Output: List of search results based on user search parameters
 * Error Messages: None
 * Author: Thomas Nguyen
 *********************************************************************/
 import React from "react";
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