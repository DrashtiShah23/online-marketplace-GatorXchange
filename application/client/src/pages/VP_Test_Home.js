import { useState } from 'react';
import axios from 'axios';


const VP_Test_Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    // If user clicks on search button without entering any data
    // display the entire list of DB posts
    
    // Create search queries that will be translated into SQL queries
    const searchQueries = {
      title: title,
      description: description,
      category: category
    };
    // Send search request to the VP result page
    axios.post('/VP_Result', searchQueries)
      .then(alert('Your search was submitted'))
      .catch((err) => {
        console.log(err);
      }); 
  }

  return (
  <div>
    <header>
      <h1>Vertical Prototype Test Home Page</h1>
    </header>
    {/* Get user search queries */}
    <div>
      <label>Enter a title: </label>
      <br />
      <input value={title} onChange={(e) => setTitle(e.target.value)}/>
      <br />
      <label>Enter a description: </label>
      <br />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
      <br />
      <label>Select a category: </label>
      
      <select value={category} placeholder="Categories" onChange={(e) => setCategory(e.target.value)}>
        <option value="Books">Books</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothes">Clothes</option>
      </select>
      <br />
      <button onClick={handleSubmit}>Search</button>
    </div>
  </div>

  );
};

export default VP_Test_Home;