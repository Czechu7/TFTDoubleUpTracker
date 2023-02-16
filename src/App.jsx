import React from 'react';
import './css/App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSearch from './components/MainSearch';
import Champions from './components/Champions';

  
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={<MainSearch/>} />
        <Route path='/champions' component={<Champions/>} />
      </Routes>
    </Router>
  );
}
  
export default App;