/*********************************************************************
 * Purpose: Vertical prototype of home page in Milestone 2
 * Input: None
 * Output: List of search results based on user search parameters
 * Error Messages: None
 * Author: Thomas Nguyen
 *********************************************************************/
 //import SearchBar from '../components/SearchBar';
 import axios from 'axios';
 import React, { useState, useEffect } from "react";
 import {Button} from 'react-bootstrap'
 import { Form } from "react-bootstrap";
 import { Modal } from "react-bootstrap";
 import '../css/App.css';
 
 const VPTestHome = () => {
   //message box modal
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
 
   let [results, updateResults] = useState([]);
 
   const displayProductsHome = results.map((result, i) => {
     return (
       <div className="card" key={i}>
         <div className="card-content">
           <p>Category: {result.category}</p>
           <p>Image: <img src={result.thumbnail}/></p>
           <p>Title: {result.title}</p>
           <p>Price: ${result.price}.00</p>
           <p>Description: {result.description}</p>
         </div>
         <div> 
           <Button variant="primary" onClick={handleShow}>
           Contact Seller
           </Button>
         </div>
     </div>
     )
   });
 
   const getAllResultsHome = () => {
     axios.post("/search",{category: '', searchTerm: ''})
     axios.get('/search')
       .then((res) => {
         results = [...res.data];
         console.log(results);        
         updateResults(results);
       })
       .catch((err) => {
         console.log('Failed to get search results' + err);
       })
   }
 
   useEffect(() => {
     getAllResultsHome();
   }, []);
   
   return (
     <div className="container">  
       <h1>Welcome to GatorXChange <br/> The platform made for gators, by gators.</h1>
      
       <div className="card-container">      
       {displayProductsHome}
         <main>      
           {/* "contact seller" pop up sample MODAL */}
 
       <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
             <Modal.Title>Contact Seller</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form>
               <Form.Group className="email" >
                 <Form.Label>Email address</Form.Label>
                 <Form.Control
                   type="email"
                   placeholder="@sfsu.com"
                   autoFocus
                 />
               </Form.Group>
               <Form.Group className="item">
                 <Form.Label>Item</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Item Title"
                   />
               </Form.Group>
               <Form.Group
                 className="messagebox"
               >
                 <Form.Label>Message</Form.Label>
                 <Form.Control as="textarea" rows={3} placeholder="Message here..."/>
               </Form.Group>
             </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
               Cancel
             </Button>
             <Button variant="primary" onClick={handleClose}>
               Send
             </Button>
           </Modal.Footer>
         </Modal>
       {/*---------------------*/}
         </main>
       </div>
     </div>
   );
 };
 
 export default VPTestHome;