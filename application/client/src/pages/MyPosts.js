import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Breadcrumb, Card} from 'react-bootstrap'
// Stylesheets
import '../css/App.css';


const iphonecharger = '/images/iphonecharger.jpg'


const MyPosts = () => {

    return (
        <div className="container">
            <div className="card">
                <h1>My Posts</h1>

                <div className="card">
                    <div className="card-content">
                        <h2>Lightning to USB Cable  </h2>
                    </div>
                    <div className="card-content">
                        <img id='iphonecharger' src={iphonecharger} alt="" />
                    <div className="description">
                        <h6>This charger is compatible with iPhone 5- iPhone 13</h6>
                    </div>
                    <div className="price">
                        <h2>$20</h2>
                    </div>
                    <div className="card-content">
                        <button className="Sold">
                            <h2>Sold</h2>
                        </button>
                    </div>
                </div>
            </div>
                <div className="card">
                    <div className="card-content">
                    <h2>Lightning to USB Cable  </h2>
                    </div>
                    <div className="card-content">
                        <img id='iphonecharger' src={iphonecharger} alt="" />
                    <div className="description">
                        <h6>This charger is compatible with iPhone 5- iPhone 13</h6>
                    </div>
                    <div className="price">
                        <h4>$20</h4>
                    </div>
                    <div className="card-content">
                        <button className="Sold">
                            <h2>Sold</h2>
                        </button>
                    </div>
                </div>
                    
            </div>
        </div>
    </div>


    )
}

export default MyPosts;