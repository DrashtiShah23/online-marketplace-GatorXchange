import React, { useState } from "react";
import Button from "@restart/ui/esm/Button";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import '../css/App.css';


const VPTestHome = () => {
  //message box modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="container">
      <header>
        <h1>Vertical Prototype Test Home Page</h1>
      </header>
    
      <div>
        <main>
          <h2>The platform made for gators, by gators.</h2>
          <br />
          <h2>Try using our search bar above to browse products.</h2>

          {/* "contact seller" pop up sample MODAL */}
      
      <Button variant="primary" onClick={handleShow}>
          Contact Seller
      </Button>

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