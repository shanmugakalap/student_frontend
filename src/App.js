import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentSearchForm from './components/StudentSearchForm';
import StudentUpdateForm from './components/StudentUpdateForm';
import Exceldataupload from './components/Exceldataupload';
import Navigation from './components/Navigation'; // Import the Navigation component
import HomePage from './components/homepage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navigation /> {/* Add the navigation menu */}
                <Routes>
                    <Route path ="" element={<HomePage/>} />
                    <Route path="/students/search" element={<StudentSearchForm />} />
                    <Route path="/students/bulkupload" element={<Exceldataupload />} />
                    <Route path="/students/create" element={<StudentForm />} />
                    <Route path="/students/update/:studentId" element={<StudentUpdateForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
