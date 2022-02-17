
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Login from './pages/Login';
import SignUp from './pages/signup';
  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/index' element={<Home />} />
        <Route path='About/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
    </Router>
);
}
  
export default App;