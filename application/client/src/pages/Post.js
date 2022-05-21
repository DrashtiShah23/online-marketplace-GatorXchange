/*****************************************************
 * Purpose: Allows the user to create a post from their 
 * account to buy or sell. Ensures if the user is logged in 
 * if not the users are given the link to register for
 * an account at the bottom.
 * Error Messages: None
 * Authors: Mary Tangog, Drashti Shah
 *****************************************************/

import React, { useState } from "react";
import { Form }from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/post.css";
import axios from "axios";

const Post = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [image, setImage] = useState({ preview: "", data: ""});
  

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

  const handleTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  }

  const handlePrice = (e) => {
    console.log(e.target.value);
    /** setting the price by using the event handler e */
    setPrice((v) =>
      e.target.validity.valid ? e.target.value : v );
  }

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  }

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  }

  const handlePickupLocation = (e) => {
    console.log(e.target.value);
    setPickupLocation(e.target.value);
  }

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img);
  };

  // Event handler for submitting the post information to send to backend
  const handleSubmit = (e) => {
    // Don't refresh the page upon submitting post queries
    e.preventDefault();
    // Prevents form from being submitted if form is not valid

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };

    // Grab form data to send to backend
    let formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("pickupLocation", pickupLocation);
    formData.append("image", image.data);
    // console.log(formData)

    // Send the form data over to /post endpoint
    axios.post("/upload/post", formData, config)
      .then((res) => {
        if (res.status === 200) {
          // For checking data is correct in inspector
          console.log("Data submitted is:");
          console.log(formData);
          console.log("Title input is: " + formData.title);
          console.log("Price input is " + formData.price);
          console.log("Description input is " + formData.description);
          console.log("Category input is " + formData.category);
          console.log("Pickup location input is " + formData.pickupLocation);
          console.log("Image input is " + formData.image.data);

          // Reset the state variables before after post success
          setTitle("");
          setPrice("");
          setDescription("");
          setCategory("");
          setPickupLocation("");
          setImage({ preview: "", data: ""});

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
    
  

    // Create post parameters that will be used for SQL queries into the database
    // const postData = {
    //   title: title,
    //   category: category,
    //   price: price,
    //   description: description,
    // };
    // // Send a POST request to the server
    // axios
    //   .post("/post", postData)
    //   .then((res) => {
    //     // If status is OK, redirect user to the home page
    //     if (res.status === 200) {
    //       // For checking data is correct in inspector
    //       console.log("Data submitted is:");
    //       console.log(postData);
    //       console.log("Title input is: " + postData.username);
    //       console.log("Category input is " + postData.email);
    //       console.log("Price input is " + postData.password);
    //       console.log("Description input is " + postData.id);

    //       // Redirect to the home page after successfully creating an account
    //       window.location = "/";
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       console.log("Server status is: " + err.response.status);
    //     } else if (err.request) {
    //       console.log(err.request);
    //       console.log("Network error or server is offline");
    //     }
    //     console.log("Upload of the post failed :(");
    //     console.log(err);
    //   });

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
              onChange={handleTitle}
              /** setting the title by using the event handler e */
            />
            <div className="invalid-feedback">Title is required</div>
        </div>

        <div className="col-12">
          <Form.Label className="form-label">Price*:</Form.Label>
            <input
              className="form-control"
              placeholder="Price"
              pattern="[0-9]*"
              value={price}
              required
              onChange={
                handlePrice
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
            value={description}
            onChange={handleDescription} /** setting the description by using the event handler e */
          />
          <div className="invalid-feedback">Description is required</div>
        </div>

        <div className="col-12">
          <Form.Label className="form-label"> Categories* </Form.Label>
          <Form.Select aria-label="Categories" required className="form-control" onChange={handleCategory}>
            <option value="">Select Category</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
          </Form.Select>
          <div className="invalid-feedback">Category is required</div>
        </div>

        <div className="col-12">
          <Form.Label>Location* </Form.Label>
            <Form.Select aria-label="Pickup" required className="form-control" onChange={handlePickupLocation}>
              <option value="">Select Pickup Location</option>
              <option value="Cesar Chavez Building">Cesar Chavez Building </option>
              <option value="J. Paul Leonard Library">J. Paul Leonard Library </option>
              <option value="Administration Building">Administration Building</option>
              <option value="Cafe Russo">Cafe Russo</option>
              <option value="Quad">Quad</option>
            </Form.Select>
            <div className="invalid-feedback">Location is required</div>
        </div>

        <div className="upload-img col-12">
          <h5>Upload image of the item</h5>
          <input
            className="upload"
            type="file"
            name="image"
            required
            accept="image/png, image/jpeg"
            // value={image}
            onChange={handleImage}
          />
          {/* Image preview before upload using inline css to resize */}
          <img src={image.preview} style={{width: "30%", height:"30%"}} alt="" />
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
