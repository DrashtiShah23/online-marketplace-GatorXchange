import React from 'react';
import { useState } from 'react';
import { Card, Container, Button } from "react-bootstrap";


/* Uploading picture for user's items */
function Test() {
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        /* end routes when user uploads image. */
        const response = await fetch('http://localhost:3001/post', {
            method: 'POST',
            body: formData,
        })
        if (response) setStatus(response.statusText);
    };

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    };


    return (
        <Container>
            <Card className="mb" style={{ width: 'ms-auto' }}>
                <Card.Img variant='ms-auto' src={image.preview} />
                <Card.Body>
                    <Card.Title>Upload to server</Card.Title>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <input type='file' name='file' onChange={handleFileChange}></input>
                        <Button variant="primary" type='submit'>Submit</Button>
                    </form>
                    {status && <h4>{status}</h4>}
                    {/* </div> */}
                </Card.Body>
            </Card>
        </Container>
    );
};
export default Test;