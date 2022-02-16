import React from "react";
import { Link } from "react-router-dom";
import '../css/about.css';

const About = () => {
return (
    <div>
        <header>
            <h1> MEET OUR TEAM </h1>
        </header>
        <div className="about-section">
                <div className="card">
                    <img src="" alt="Drashti"/>
                    <div className="container">
                        <Link to="../pages/About/AboutDrashti.html">
                            <h2>Drashti Pareshkumar Shah</h2>
                        </Link>
                        <h3>Lead</h3>
                        <p>Some description</p>
                        <p>dshah5@mail.sfsu.edu</p>
                    </div>
            </div> 
        </div>
    </div>
    );
}





export default About;
