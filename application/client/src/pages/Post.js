import React, { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";

const Post = () => {



  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [val, setVal] = useState();
  const [check, setcheckboxvalue] = useState(false);
  const uploadFileEle = document.getElementById("fileInput");

  return (
    <div className="container">
      <h1>ADD POST</h1>
      <div className="card">
        <div id="float-label">
          <input
            type="title" placeholder="Title*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Title required!")}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <label htmlFor="title">Title*</label> */}
        </div>
        <div id="float-label">
          <input
            type="category" placeholder="Category*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Category required!")}
            required
            class="text-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {/* <label htmlFor="category">Category*</label> */}
        </div>
        <div id="float-label">
          <input
            value="price" placeholder="Price*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Price required!")}
            pattern="[0-9]*"
            value={val}
            onChange={(e) =>
              setPrice((v) => (e.target.validity.valid ? e.target.value : v))
            }
          />
          {/* <label htmlFor="price">Price*</label> */}
        </div>
        <div id="float-label">
          <input
            type="description" placeholder="Description*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Description required!")}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <label htmlFor="description">Description*</label> */}
        </div><br/>

        <div>
        <label for="avatar"style={{ textalign: 'center',background:"lightgrey", padding:"5px 10px" }}>Choose a photo of item to upload:  </label></div>
<br/>
        <div>
        <input  type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"/>
      
        </div>

        <div className="checkbox">
        <br/>
        <input
            type="checkbox"
            required
            id="TnC"
            onChange={(e) => setcheckboxvalue(e.target.value)}
          />
          <label id="TnC">
            {" "}
            I Agree with the
            <Link to="/"> Terms and Conditions </Link>
          </label>
        </div>
        

        <button className="registerButton">Post</button>
        <div>
        <p>
         Already have an Account?
            <Link to="/Login">Login here</Link>
          </p>
          {/* <p>
          Don't have an Account?
            <Link to="/SignUp">Register here</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
