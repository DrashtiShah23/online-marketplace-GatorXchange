// Stylesheets
import '../css/App.css';
import '../css/about.css';

// Library imports and individual team member's about pages
import React from "react";
import { Link } from "react-router-dom";
import AboutThomas from "./About/AboutThomas";
import AboutWilfredo from "./About/AboutWilfredo";
import AboutJavier from "./About/Aboutjavier";
import AboutDrashti from "./About/AboutDrashti";
import AboutMary from "./About/AboutMary";
import AboutMicheas from "./About/AboutMicheas";

// Team member images
const javi = "/images/javi.jpg"
const drashti = "/images/drashti.jpeg"
const mary = '/images/mary.jpg'
const thomas = '/images/thomas.jpg'
const wilfredo = '/images/wilfredo.jpg'
const Mike = '/images/Mike.jpg'

const About = () => {
  return (
    <div className="container">
      <div className="card-container">

        {/*Drashti's Card*/}
        <div className="card">
          <div className="card-content">
            <Link to="/AboutDrashti" element={<AboutDrashti />}>
              <img id='drashti' src={drashti} alt="" />
            </Link>
          </div>
          <div className="card-content">
            <h2>Drashti Pareshkumar Shah</h2>
          </div>
          <div className="card-content">
            <p className="title">Team Lead</p>
            <p>Senior at SFSU pursuing computer science!</p>
            <p>dshah5@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutDrashti" element={<AboutDrashti />}>
              <button className="btn-learn-more">
                <h2>Learn More</h2>
              </button>
            </Link>
          </div>
        </div>

        {/*Mary's Card*/}
        <div className="card">
          <div className="card-content">
            <Link to="/AboutMary" element={<AboutMary />}>
              <img
                id='mary'
                src={mary}
                alt=""
              />
            </Link>
          </div>
          <div className="card-content">
            <h2>Mary Nicole Tangog</h2>
          </div>
          <div className="card-content">
            <p className="title">Front End Lead</p>
            <p>
              Computer Science Major <br />
              San Francisco State University
            </p>
            <p>mtangog@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutMary" element={<AboutMary />}>
              <button className="btn-learn-more">
                <h2>Learn More</h2>
              </button>
            </Link>
          </div>
        </div>

        {/*Thomas's Card*/}
        <div className="card">
          <div className="card-content">
            <Link to="/AboutThomas" element={<AboutThomas />}>
              <img
                src={thomas}
                alt=""
              />
            </Link>
          </div>
          <div className="card-content">
            <h2>Thomas Nguyen</h2>
          </div>
          <div className="card-content">
            <p className="title">Back End Lead</p>
            <p>Incoming SFSU Spring 2022 CS graduate.</p>
            <p>tnguyen135@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutThomas" element={<AboutThomas />}>
              <button className="btn-learn-more">
                <h2>Learn More</h2>
              </button>
            </Link>
          </div>
        </div>

        {/*Wilfredo's Card*/}
        <div className="card">
          <div className="card-content">
            <Link to="/AboutWilfredo" element={<AboutWilfredo />}>
              <img
                src={wilfredo}
                alt=""
              />
            </Link>
          </div>
          <div className="card-content">
            <h2>Wilfredo</h2>
          </div>
          <div className="card-content">
            <p className="title">Github Master</p>
            <p>Computer Science Major at San Francisco State University</p>
            <p>waceytun@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutWilfredo" element={<AboutWilfredo />}>
              <button className="btn-learn-more">
                <h2>Learn More</h2>
              </button>
            </Link>
          </div>
        </div>

        {/*Micheas's Card*/}
        <div className="card">
          <div className="card-content">
            <Link to="/AboutMicheas" element={<AboutMicheas />}>
              <img
                id='Mike'
                src={Mike}
                alt=""
              />
            </Link>
          </div>
          <div className="card-content">
            <h2>Micheas</h2>
          </div>
          <div className="card-content">
            <p className="title">Team Member</p>
            <p>Computer Science Major at San Francisco State University</p>
            <p>Mgebere@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutMicheas" element={<AboutMicheas />}>
              <button className="btn-learn-more">
                <h2>Learn More</h2>
              </button>
            </Link>
          </div>
        </div>

        {/*Javier's Card*/}
        <div className="card">
          <div className="card-content">
            <Link to="/Aboutjavier" element={<AboutJavier />}>
              <img
                id='javi'
                src={javi}
                alt=""
              />
            </Link>
          </div>
          <div className="card-content">
            <h2>Javier</h2>
          </div>
          <div className="card-content">
            <p className="title">Back End</p>
            <p>"Best revenge is massive success"</p>
            <p>-Frank Sinatra</p>
            <p>jmarquez21@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/Aboutjavier" element={<AboutJavier />}>
              <button className="btn-learn-more">
                <h2>Learn More</h2>
              </button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};



export default About;
