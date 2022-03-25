import React from 'react';
import { Card, Container, Carousel } from 'react-bootstrap'
const Home = () => {
    return (
        /* testing img, will be actual items on the Database once the user connects */
        <Container>
            <Card>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="images/img5.jpg" 
                        alt="First slide"
                    />

                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>"If you can dream it, you can do it."</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="images/img1.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>"Best revenge is massive success".</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                            src="images/giga.gif"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>"when in doubt, GIGACHAD"</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </Card>
        </Container>

    );
};

export default Home;
