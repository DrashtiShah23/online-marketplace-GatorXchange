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
                <Link to="../pages/About/AboutDrashti.html">
                    <img src="" alt="Drashti"/>
                </Link>
                <div className="container">
                    <h2>Drashti Pareshkumar Shah</h2>
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
