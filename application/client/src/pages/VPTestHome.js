/*********************************************************************
 * Purpose: Vertical prototype of home page in Milestone 2
 * Input: None
 * Output: List of search results based on user search parameters
 * Error Messages: None
 * Author: Thomas Nguyen
 *********************************************************************/
import SearchBar from '../components/SearchBar';
import '../css/App.css';

const VPTestHome = () => {
  
  return (
    <div className="container">
      
        <h1><br />Vertical Prototype Test Home Page.<br /><br /></h1>
        <h2>The platform made for gators, by gators.<br /><br /></h2>
        <h2>Try using our search bar to browse products.<br /><br /></h2>
      
      <div>
        <main>
          <SearchBar />
        </main>
      </div>
    </div>

  );
};

export default VPTestHome;