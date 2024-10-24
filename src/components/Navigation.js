import React from 'react';
import { Link } from 'react-router-dom';
import './StudentForm.css'; // Import the CSS file

const Navigation = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home Page</Link>
                </li>
                <li>
                    <Link to="/students/create">Create Student</Link>
                </li>
                <li>
                    <Link to="/students/search">All Student Details</Link>
                </li>
                <li>
                    <Link to="/students/bulkupload">Bulk Upload Students</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
