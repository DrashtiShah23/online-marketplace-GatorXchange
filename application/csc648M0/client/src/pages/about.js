import React from "react";
import { Link } from "react-router-dom";
import '../css/about.css';
import img1 from "../pages/images/img1.jpg"; 
import img2 from "../pages/images/img2.jpg"; 
import img3 from "../pages/images/img3.jpg";
import img4 from "../pages/images/img4.jpg";
import img5 from "../pages/images/img5.jpg";
import img6 from "../pages/images/img6.jpg";



const About = () => {
return (
    <div>
        <header>
            <h1> MEET OUR TEAM </h1>
        </header>
        {/* <div className="about-section">
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
        </div> */}
        <div class="row">
  <div class="column">
    <div class="card">
    
      <div class="container">
      <Link to="../pages/About/AboutDrashti.html">
      <img src={img1} alt="1" />
         <h2>Drashti Pareshkumar Shah</h2>
                        </Link>
        <p class="title">Team Lead</p>
        <p>Some text that describes me </p>
        <p>dshah5@mail.sfsu.edu</p>
        
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={img2} alt="2" />
      <div class="container">
      <Link to="../pages/About/AboutMary.html">
                            <h2>Mary</h2>
                        </Link>
        <p class="title">Front End Lead</p>
        <p>Some text that describes me </p>
        <p>xyz@xyz.com</p>
        
      </div>
    </div>
  </div>


  <div class="column">
    <div class="card">
      <img src={img3} alt="3" />
      <div class="container">
      <Link to="../pages/About/AboutThomas.html">
                            <h2>Thomas</h2>
                        </Link>
        <p class="title">Back End Lead</p>
        <p>Some text that describes me </p>
        <p>xyz@xyz.com</p>
       
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={img4} alt="2" />
      <div class="container">
      <Link to="../pages/About/AboutWilfredo.html">
                            <h2>Wilfredo</h2>
                        </Link>
        <p class="title">Github Master</p>
        <p>Some text that describes me </p>
        <p>xyz@xyz.com</p>
        
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={img5} alt="2" />
      <div class="container">
      <Link to="../pages/About/AboutMicheas.html">
                            <h2>Micheas</h2>
                        </Link>
        <p class="title"></p>
        <p>Some text that describes me </p>
        <p>xyz@xyz.com</p>
        
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      
      <div class="container">
      <Link to="../pages/About/AboutJavier.html">
      <img src={img6} alt="2" />
                            <h2>Javier</h2>
                        </Link>
        <p class="title"></p>
        <p>Some text that describes me </p>
        <p>xyz@xyz.com</p>
        
      </div>
    </div>
  </div>




</div>
    </div>
    );
}


export default About;
