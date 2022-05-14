/*****************************************************
 * Purpose: Allows the user to create a post from their 
 * account to buy or sell. Ensures if the user is logged in 
 * if not the users are given the link to register for
 * an account at the bottom.
 * Error Messages: None
 * Author: Mary Tangog, Drashti Shah
 *****************************************************/

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../css/post.css";
import axios from "axios";

const Post = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [val, setVal] = useState();
  const [check, setcheckboxvalue] = useState(false);
  const uploadFileEle = document.getElementById("fileInput");

  // Event handler for submitting the post information to send to backend
  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting post queries
    e.preventDefault();
    // Prevents form from being submitted if form is not valid

    // Create post parameters that will be used for SQL queries into the database
    const postData = {
      title: title,
      category: category,
      price: price,
      description: description,
    };
    // Send a POST request to the server
    axios
      .post("/post", postData)
      .then((res) => {
        // If status is OK, redirect user to the home page
        if (res.status === 200) {
          // For checking data is correct in inspector
          console.log("Data submitted is:");
          console.log(postData);
          console.log("Title input is: " + postData.username);
          console.log("Category input is " + postData.email);
          console.log("Price input is " + postData.password);
          console.log("Description input is " + postData.id);

          // Redirect to the home page after successfully creating an account
          window.location = "/";
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("Server status is: " + err.response.status);
        } else if (err.request) {
          console.log(err.request);
          console.log("Network error or server is offline");
        }
        console.log("Upload of the post failed :(");
        console.log(err);
      });
  };

  /** Creating a post form where the user enters the details of the post */
  return (
    <div className="container">
      <div className="field-Post">
        <h1> Post an Item </h1>

        <div id="post-label">
          <Form.Label>Title*: </Form.Label>
          <div className="post-title">
            <input
              type="title"
              placeholder="Title*"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Title required!")}
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              } /** setting the title by using the event handler e */
            />
          </div>
        </div>
        <div id="post-label">
          <Form.Label>Price*:</Form.Label>
          <div className="post-price">
            <input
              value="price"
              placeholder="Price*"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Price required!")}
              pattern="[0-9]*"
              value={val}
              onChange={
                (e) =>
                  setPrice((v) =>
                    e.target.validity.valid ? e.target.value : v
                  ) /** setting the price by using the event handler e */
              }
            />
          </div>
        </div>
        <div id="post-label">
          <Form.Label>Description*: </Form.Label>
          <textarea
            classname="post-input"
            placeholder="Description*"
            cols="50"
            rows="2"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Description required!")}
            required
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            } /** setting the description by using the event handler e */
          />
        </div>
        <div id="post-label">
          <Form.Label> Categories* </Form.Label>
          <Form.Select aria-label="Categories">
            <option>Select Category*</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
          </Form.Select>
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
          <h5>Upload image of the item</h5>

          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
        </div>

        <p className="post-para">
          The post will be approved by the admin within 24-48 hrs after the
          upload
        </p>
        <button className="postButton" onSubmit={handleSubmit}>
          Post
        </button>
        {/* Having a cancel link so users can be directed to home page */}
        <Link className="cancel-link" to="/" c>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Post;
