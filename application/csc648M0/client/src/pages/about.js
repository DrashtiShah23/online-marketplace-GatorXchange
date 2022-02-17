import React from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import '../css/about.css';
import AboutThomas from "./About/AboutThomas";


const About = () => {
  return (
    <div className="container">
      <header>
          <h1> MEET OUR TEAM </h1>
      </header>

      
      <div className="card-container">
      
        {/*Drashti's Card*/}
        <div className="card">
          <div className="card-content">
            <img className="thumbnail"
              src="https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"
              alt="placeholder-image" 
            />
          </div>
          <div className="card-content">
            <h2>Drashti Pareshkumar Shah</h2>
          </div>
          <div className="card-content">
            <p className="title">Team Lead</p>
            <p>Some text that describes me</p>
            <p>dshah5@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutDrashti.html">
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Mary's Card*/}
        <div className="card">
          <div className="card-content">
            <img className="thumbnail"
              src="https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"
              alt="placeholder-image" 
            />
          </div>
          <div className="card-content">
            <h2>Mary</h2>
          </div>
          <div className="card-content">
            <p className="title">Front End Lead</p>
            <p>Some text that describes me</p>
            <p>xyz@xyz.com</p>
          </div>
          <div className="card-content">
            <Link to="/AboutMary.html">
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Thomas's Card*/}
        <div className="card">
          <div className="card-content">
            <img className="thumbnail"
              src="https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"
              alt="placeholder-image" 
            />
          </div>
          <div className="card-content">
            <h2>Thomas</h2>
          </div>
          <div className="card-content">
            <p className="title">Back End Lead</p>
            <p>Incoming SFSU Spring 2022 CS graduate.</p>
            <p>tnguyen135@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/about/Thomas" element={<AboutThomas/>}>
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Wilfredo's Card*/}
        <div className="card">
          <div className="card-content">
            <img className="thumbnail"
              src="https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"
              alt="placeholder-image" 
            />
          </div>
          <div className="card-content">
            <h2>Wilfredo</h2>
          </div>
          <div className="card-content">
            <p className="title">Github Master</p>
            <p>Some text that describes me</p>
            <p>xyz@xyz.com</p>
          </div>
          <div className="card-content">
            <Link to="/AboutWilfredo.html">
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Micheas's Card*/}
        <div className="card">
          <div className="card-content">
            <img className="thumbnail"
              src="https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"
              alt="placeholder-image" 
            />
          </div>
          <div className="card-content">
            <h2>Micheas</h2>
          </div>
          <div className="card-content">
            <p className="title"></p>
            <p>Some text that describes me</p>
            <p>xyz@xyz.com</p>
          </div>
          <div className="card-content">
            <Link to="/AboutMicheas.html">
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Javier's Card*/}
        <div className="card">
          <div className="card-content">
            <img className="thumbnail"
              src="https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"
              alt="placeholder-image" 
            />
          </div>
          <div className="card-content">
            <h2>Javier</h2>
          </div>
          <div className="card-content">
            <p className="title"></p>
            <p>Some text that describes me</p>
            <p>xyz@xyz.com</p>
          </div>
          <div className="card-content">
            <Link to="/AboutJavier.html">
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>
        
      </div>

    </div>
  );
}


export default About;
