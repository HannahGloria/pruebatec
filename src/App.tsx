import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AttendanceForm from './AttendanceForm';
import Home from './Home'; 
import SignUpForm from './SignUpForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<AttendanceForm />} />
        <Route path='/signup' element={<SignUpForm />}/>
      </Routes>
    </Router>
  );
};

export default App;