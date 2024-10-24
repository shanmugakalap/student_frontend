import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and delete
import './StudentForm.css'; // Import the CSS file

const StudentSearchForm = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch all students when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/students/');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phonenumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEdit = (studentId) => {
        navigate(`/students/update/${studentId}`); // Updated to directly use navigate
    };

    // Handle delete button click with confirmation
    const handleDelete = async (studentId) => {
        const confirmation = window.confirm('Are you sure you want to delete this student?');
        if (confirmation) {
            try {
                await fetch(`http://127.0.0.1:8000/api/students/${studentId}/`, {
                    method: 'DELETE',
                });
                setStudents(students.filter(student => student.id !== studentId));
                alert('Student deleted successfully.');
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Search Students</h2>
            <input
                type="text"
                placeholder="Search by Name, Department, Address, or Phone Number"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: '50%' }}
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.dept}</td>
                            <td>{student.address}</td>
                            <td>{student.phonenumber}</td>
                            <td>{student.DOB}</td>
                            <td>
                                <FaEdit
                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                    onClick={() => handleEdit(student.id)} // Updated here
                                />
                                <FaTrashAlt
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(student.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentSearchForm;
