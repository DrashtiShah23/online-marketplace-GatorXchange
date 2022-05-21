import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
import {
  Modal, Form, Button, Container, Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Join.css";
import { Socket } from "socket.io-client";

function Join(socket, user, users, setUsers) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <main>
      <Button variant="primary" onClick={handleShow}>
        Contact Seller
      </Button>

      <Modal size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Contact Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(name)}
                // placeholder="Enter Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Room</Form.Label>
              <Form.Control
                type="string"
                onChange={(e) => setRoom(room)}
                placeholder="Enter Room"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="messagebox"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Message here..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={`/Chat?name=${name}&room=${room}`}
            onClick={(e) => (room && name ? null : e.preventDefault())}
          >
            <Button variant="secondary" onClick={handleClose}>
              sign in
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Send Message
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </main>

  );
}

export default Join;