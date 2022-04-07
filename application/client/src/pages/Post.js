import React, { useState } from 'react'
import "../css/registration.css";
import { Link } from 'react-router-dom';

  
const Post = () => {
    const [checked, setChecked] = useState(false);

   

        const [title, setTitle] = useState('');
        const [category, setCategory] = useState('');
        const [price, setPrice] = useState('');
        const [description, setDescription] = useState('');
        const [val, setVal] = useState();
          
            
        
return (
    <div className="container">
        <h1>ADD POST</h1>
        <div className="card">
        <div id="float-label">
                    <input type="title" required
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                    <label htmlFor="title">Title*</label>
                </div>
                <div id="float-label">
                    <input type="category" required 
                        class="text-input"
                        value={category}
                        onChange={e => setCategory(e.target.value)}/>
                    <label htmlFor="category">Category*</label>
                </div>
                <div id="float-label">
                    <input value="price"
                        pattern="[0-9]*"
                        value={val}
                        onChange={(e) =>
                        setPrice((v) => (e.target.validity.valid ? e.target.value : v))}/>
                    <label htmlFor="price">Price*</label>
                </div>
                <div id="float-label">
                    <input type="description" required
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    <label htmlFor="description">Description*</label>
                </div>

                <div>

    </div>
   

                <div className="checkbox">          
                    <input type="checkbox" id="TnC" checked={false}
                    onChange={() => setChecked(!checked)}/>
                    <label id="TnC"> I Agree with the    
                        <Link to="#"> Terms and Condition </Link>
                    </label>
                </div>
                    

                    <button className="registerButton">Post</button>
                    <div>
                        <p>Already have an Account?
                            <Link to="/Login">Login</Link></p>
                    </div>
                 
        </div>
    </div>
    
    );
   
    };

export default Post;



