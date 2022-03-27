import React from 'react';
import './css/App.css';
import Navbar from './components/Index';
import { BrowserRouter as Router, Routes, Route }
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
// Vertical prototype test home page. Replace with Home component later
import VPTestHome from './pages/VPTestHome';
import SearchResults from './components/SearchResults';
import Test from './components/Test'


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>

                {/* <Route exact path='/' element={<Home />} /> */}
                <Route exact path='/' element={<VPTestHome/>} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/search' element={<SearchResults />} />
                
                <Route path='/AboutWilfredo' element={<AboutWilfredo/>} />
                <Route path='/AboutThomas' element={<AboutThomas/>} />
                <Route path='/AboutDrashti' element={<AboutDrashti/>} />
                <Route path='/AboutMary' element={<AboutMary/>} />
                <Route path='/AboutJavier' element={<AboutJavier/>} />
                <Route path='/AboutMicheas' element={<AboutMicheas/>} />
                
                <Route path='/upload' element={<Test />} />
                
            </Routes>
        </Router>
    );
}

export default App;