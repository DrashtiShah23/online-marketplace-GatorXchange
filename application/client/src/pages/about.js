import React from "react";
import { Link } from "react-router-dom";
import '../css/about.css';
import AboutThomas from "./About/AboutThomas";
import AboutWilfredo from "./About/AboutWilfredo";
import AboutJavier from "./About/Aboutjavier";
import AboutDrashti from "./About/AboutDrashti";
import AboutMary from "./About/AboutMary";
import AboutMicheas from "./About/AboutMicheas";
import javi from "./images/javi.jpg"
import drashti from "./images/drashti.jpeg"
import mary from './images/mary.jpg'
import thomas from './images/thomas.jpg'
import wilfredo from './images/wilfredo.jpg'
import Mike from './images/Mike.jpg'

const About = () => {
  return (
    <div className="container">
      <header className="aboutHeader">
          <h1>  
            Software Engineering class SFSU <br /> Spring, 2022 <br /> Section 03 <br /> Team 01 
          </h1>
      </header>

      
      <div className="card-container">
      
        {/*Drashti's Card*/}
        <div className="card">
          <div className="card-content">
          <Link to="/AboutDrashti" element={<AboutDrashti/>}>
          <img className="thumbnail" id = 'drashti' src= {drashti}alt="placeholder-image"/>
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
            <Link to="/AboutDrashti" element={<AboutDrashti/>}>
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Mary's Card*/}
        <div className="card">
          <div className="card-content">
          <Link to="/AboutMary" element={<AboutMary/>}> 
          <img className="thumbnail"
              id = 'mary'
              src= {mary}
              alt="placeholder-image" 
            />
          </Link>   
          </div>
          <div className="card-content">
            <h2>Mary</h2>
          </div>
          <div className="card-content">
            <p>
              Computer Science Major <br/>
              San Francisco State University
            </p>
            <p>mtangog@mail.sfsu.edu</p>
          </div>
          <div className="card-content">
            <Link to="/AboutMary" element={<AboutMary/>}>
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Thomas's Card*/}
        <div className="card">
          <div className="card-content">
          <Link to="/AboutThomas" element={<AboutThomas/>}>  
            <img className="thumbnail"
              src={thomas}
              alt="Picture of Thomas" 
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
            <Link to="/AboutThomas" element={<AboutThomas/>}>
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Wilfredo's Card*/}
        <div className="card">
          <div className="card-content">
          <Link to="/AboutWilfredo" element={<AboutWilfredo/>}>
            <img className="thumbnail"
              src={wilfredo}
              alt="Wilfredo Aceytuno"  
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
          <Link to="/AboutWilfredo" element={<AboutWilfredo/>}>
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Micheas's Card*/}
        <div className="card">
          <div className="card-content">
          <Link to="/AboutMicheas" element={<AboutMicheas/>}>
            <img className="thumbnail"
              id = 'Mike'
              src={Mike}
              alt="placeholder-image" 
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
          <Link to="/AboutMicheas" element={<AboutMicheas/>}>
            <button className="btn-learn-more">
            <h2>Learn More</h2>
            </button>
            </Link>
          </div>
        </div>

        {/*Javier's Card*/}
        <div className="card">
          <div className="card-content">
          <Link to="/Aboutjavier" element={<AboutJavier/>}>
            <img className="thumbnail"
              id = 'javi'
              src= {javi}
              alt="placeholder-image" 
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
            <Link to="/Aboutjavier" element={<AboutJavier/>}>
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
