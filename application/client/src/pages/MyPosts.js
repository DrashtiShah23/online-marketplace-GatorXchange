import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Breadcrumb, Card} from 'react-bootstrap'


const MyPosts = () => {

    return (
       <div>
        
                    <Breadcrumb style={{color : "blue"}}>
                    Post listing 1
                    </Breadcrumb>
                    <Breadcrumb>
                   Post listing 2
                    </Breadcrumb>
                </div>
       
          
                 
    )
    }
export default MyPosts;