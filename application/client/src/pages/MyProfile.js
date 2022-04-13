import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Breadcrumb, Card} from 'react-bootstrap'


const MyProfile = () => {

return (
    <div className="container">
        <div className="card">
            <h1>My Profile</h1>
    
                <Breadcrumb>
                Name:
                </Breadcrumb>
                <Breadcrumb>
                Email:
                </Breadcrumb>
                <Breadcrumb>
                SFSU ID:
                </Breadcrumb>
        </div>
    </div>
        
    )
}

export default MyProfile;
