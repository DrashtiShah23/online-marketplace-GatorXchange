/*********************************************************************
 * Purpose: Home page which is displayed on the website
 * Input: None
 * Output: List of search results based on user search parameters
 * Error Messages: None
 * Author: Thomas Nguyen, Drashti Shah
 *********************************************************************/
 import React from "react";
 import SearchBar from '../components/SearchBar';
 import '../css/App.css';
 
 const Home = () => {
   //message box modal
   return (
     <div className="container">  
       <h2>Welcome to GatorXChange </h2>
       <h4> The platform to buy, sell, and exchange goods explicitly for SFSU students, staff and faculty!</h4>
       <SearchBar/>
     </div>
   );
 };
 
 export default Home;