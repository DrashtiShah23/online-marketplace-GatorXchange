import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import '../css/post.css';
import axios from "axios";

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
      <div className="field-Post">
        <h1> Post an Item </h1>

        <div id="post-label">
          <Form.Label>Title*: </Form.Label>
          <div className="post-title">
          <input
            type="title" placeholder="Title*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Title required!")}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          </div>
          {/* <label htmlFor="title">Title*</label> */}
        </div>
        <div id="post-label">
          <Form.Label>Price*: </Form.Label>
          <div className="post-price">
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
          </div>
          {/* <label htmlFor="price">Price*</label> */}
        </div>
        <div id="post-label">
          <Form.Label>Description*: </Form.Label>
          <textarea classname="post-input"
            placeholder="Description*" cols="50" rows="2"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Description required!")}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <label htmlFor="description">Description*</label> */}
        </div>
        <div id="post-label">
          <Form.Label> Categories* </Form.Label>
          <Form.Select aria-label="Categories">
          <option>Select Category*</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
        </Form.Select>
          {/*<input
            type="category" placeholder="Category*"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Category required!")}
            required
            class="text-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          { <label htmlFor="category">Category*</label> */}
        </div>
        <div id="post-label">
          <Form.Label>Location* </Form.Label>
          <div className="post-pickup">
          <Form.Select aria-label="Pickup">
          <option>Select Pickup Location*</option>
            <option value="CesarChavezBldg">Cesar Chavez building </option>
            <option value="Library ">J. Paul Leaonard Library </option>
            <option value="AdminBldg">Administration building</option>
            <option value="CafeRusso">Cafe Russo</option>
            <option value="Quad">Quad</option>
          </Form.Select>
          </div>
        </div>
        <div className="upload-img">
          <h5>UPLOAD IMAGE</h5>
          {/* <label for="avatar"style={{ textalign: 'center',background:"lightgrey", padding:"5px 10px" }}>Choose a photo of item to upload:  </label> */}
          <input  type="file"
            id="avatar" name="avatar"
            accept="image/png, image/jpeg"/>
        </div>

        <p>The post will be approved by the admin within 24-48 hrs after the upload</p>
        <button className="registerButton">Post</button>

    </div>
  </div>

  );
};

export default Post;
