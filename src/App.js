import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HTBList from './components/HTBList';
import HTBWalkthrough from './components/HTBWalkthrough';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/htb" element={<HTBList />} />
          <Route path="/htb/:slug" element={<HTBWalkthrough />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
