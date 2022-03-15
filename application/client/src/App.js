import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Link }
    from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import AboutWilfredo from './pages/About/AboutWilfredo';
import AboutThomas from './pages/About/AboutThomas';
import AboutDrashti from './pages/About/AboutDrashti';
import AboutMary from './pages/About/AboutMary';
import AboutJavier from './pages/About/Aboutjavier';
import AboutMicheas from './pages/About/AboutMicheas';

import VP_Test_Home from './pages/VP_Test_Home'; // Vertical prototype test home page
import VP_Result from './pages/VP_Result'; // Vertical prototype search result page
// import LearnMore from '.pages/learnMore'
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>

        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        
        <Route path='/AboutWilfredo' element={<AboutWilfredo/>} />
        <Route path='/AboutThomas' element={<AboutThomas/>} />
        <Route path='/AboutDrashti' element={<AboutDrashti/>} />
        <Route path='/AboutMary' element={<AboutMary/>} />
        <Route path='/AboutJavier' element={<AboutJavier/>} />
        <Route path='/AboutMicheas' element={<AboutMicheas/>} />

        <Route path='/VP_Test_Home' element={<VP_Test_Home/>} />
        <Route path='/VP_Result' element={<VP_Result/>} />
        
    </Routes>
    </Router>
);
}

export default App;