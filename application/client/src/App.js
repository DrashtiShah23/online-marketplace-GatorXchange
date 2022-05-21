/******************************************************
 * Purpose: Displays the routes to each functionality in 
 * the website
 * Error Messages: None
 * Author: Wilfredo Aceytuno, Drashti Shah, Thomas Nguyen,
 * Javier Marquez
 ******************************************************/
import React, { useState } from 'react';
import './css/App.css';


import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
// import Home from './pages/index';
import About from './pages/about';
import Login from './pages/Login';
import SignUp from './pages/signup';
import Post from './pages/Post'
import AboutWilfredo from './pages/About/AboutWilfredo';
import AboutThomas from './pages/About/AboutThomas';
import AboutDrashti from './pages/About/AboutDrashti';
import AboutMary from './pages/About/AboutMary';
import AboutJavier from './pages/About/Aboutjavier';
import AboutMicheas from './pages/About/AboutMicheas';
import Home from './pages/Home';
import Test from './components/Test'
import MyProfile from './pages/MyProfile';
import MyPosts from './pages/MyPosts';
// import { UserContext } from './UserContext';
// import { LoginContext} from './LoginContext';
import MyMessages from './pages/MyMessages';



function App() {
    // const [loginState, setLoginState] = useState(false);
    // const [user, setUser] = useState({});
    return (
        <Router>
            {/* <LoginContext.Provider value={{loginState, setLoginState}}>
            <UserContext.Provider value={{user, setUser}}> */}
            <Navbar />
            <Routes>

                
                <Route exact path='/' element={<Home/>} />
                <Route path='/about' element={<About />} />
                <Route path='/Post' element={<Post />} />
                <Route path='/login' element={<Login />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/MyProfile' element={<MyProfile/>} />
                <Route path='/MyPosts' element={<MyPosts/>} />
                <Route path='/MyMessages' element={<MyMessages/>} />
                 {/* <Route path='/search' element={<SearchResults />} /> */}
                
                <Route path='/AboutWilfredo' element={<AboutWilfredo/>} />
                <Route path='/AboutThomas' element={<AboutThomas/>} />
                <Route path='/AboutDrashti' element={<AboutDrashti/>} />
                <Route path='/AboutMary' element={<AboutMary/>} />
                <Route path='/AboutJavier' element={<AboutJavier/>} />
                <Route path='/AboutMicheas' element={<AboutMicheas/>} />
                
                <Route path='/upload' element={<Test />} />
                
            </Routes>
            {/* </UserContext.Provider>
            </LoginContext.Provider> */}
        </Router>
        
    );
}

export default App;