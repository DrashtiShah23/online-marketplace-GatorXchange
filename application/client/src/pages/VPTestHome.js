import { useState } from 'react';
import axios from 'axios';
import '../css/about.css';
import SearchResults from '../components/SearchResults';

const VPTestHome = ({ userSearched = false }) => {
  
  return (
    <div className="container">
      <header>
        <h1>Vertical Prototype Test Home Page</h1>
      </header>
      
      <div>
        {/* Display a list of search results each time user submits a search */}
    
        {userSearched ? <SearchResults /> : null}
      </div>
    </div>

  );
};

export default VPTestHome;