/*****************************************************
 * Purpose: Allows the user to create a post from their 
 * account to buy or sell. Ensures if the user is logged in 
 * if not the users are given the link to register for
 * an account at the bottom.
 * Error Messages: None
 * Author: Mary Tangog, Drashti Shah
 *****************************************************/

import React, { useState } from "react";
import { Form }from "react-bootstrap";
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

    // Prevents form from being submitted if form is not valid
  (function () {
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

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
  <div className="containerPost" >
    <form
      className="row row-cols-lg-auto g-3 align-items-center needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="container">
        <div className="field">
        <h1> Post an Item </h1>

        <div className="col-12">
          <Form.Label className="form-label">Title*: </Form.Label>
            <input
              className="form-control"
              type="title"
              placeholder="Title"
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              } /** setting the title by using the event handler e */
            />
            <div className="invalid-feedback">Title is required</div>
        </div>

        <div className="col-12">
          <Form.Label className="form-label">Price*:</Form.Label>
            <input
              className="form-control"
              value="price"
              placeholder="Price"
              pattern="[0-9]*"
              value={val}
              required
              onChange={
                (e) =>
                  setPrice((v) =>
                    e.target.validity.valid ? e.target.value : v
                  ) /** setting the price by using the event handler e */
              }
            />
            <div className="invalid-feedback">Price is required</div>
        </div>

        <div className="col-12">
          <Form.Label className="form-label">Description*: </Form.Label>
          <textarea
            required
            className="form-control"
            placeholder="Description"
            cols="50"
            rows="5"
            required
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            } /** setting the description by using the event handler e */
          />
          <div className="invalid-feedback">Description is required</div>
        </div>

        <div className="col-12">
          <Form.Label className="form-label"> Categories* </Form.Label>
          <Form.Select aria-label="Categories" required className="form-control">
            <option value="">Select Category</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
          </Form.Select>
          <div className="invalid-feedback">Category is required</div>
        </div>

        <div className="col-12">
          <Form.Label>Location* </Form.Label>
            <Form.Select aria-label="Pickup" required className="form-control">
              <option value="">Select Pickup Location</option>
              <option value="CesarChavezBldg">Cesar Chavez building </option>
              <option value="Library ">J. Paul Leaonard Library </option>
              <option value="AdminBldg">Administration building</option>
              <option value="CafeRusso">Cafe Russo</option>
              <option value="Quad">Quad</option>
            </Form.Select>
            <div className="invalid-feedback">Location is required</div>
        </div>

        <div className="upload-img" className="col-12">
          <h5>Upload image of the item</h5>
          <input
            className="upload"
            required
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
          <div className="invalid-feedback">Image of item is required</div>
        </div>

        <div className="hasAccount col-12">

        <p className="post-para">
          The post will be approved by the admin within 24-48 hrs after the
          upload
        </p>
        <button className="postButton" type="submit">
          Post
        </button>
        {/* Having a cancel link so users can be directed to home page */}
        <Link className="cancel-link" to="/" >
          Cancel
        </Link>
        </div>
        </div>
      </div> 
    </form>
  </div>
  );
};

export default Post;
