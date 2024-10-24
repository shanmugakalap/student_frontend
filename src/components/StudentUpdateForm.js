import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentForm.css'; // Import the CSS file


const StudentUpdateForm = () => {
    const { studentId } = useParams(); // Get the studentId from the URL
    const [student, setStudent] = useState({ name: '', dept: '', address: '', phonenumber: '',DOB:'' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/students/${studentId}/`);
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/students/${studentId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            if (response.ok) {
                alert('Student updated successfully!');
                navigate('/'); // Navigate back to the search page
            } else {
                alert('Failed to update student.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container"> {/* Use the background image class */}
            <form onSubmit={handleUpdate}>
                <h2>Update Student</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="dept"
                    placeholder="Department"
                    value={student.dept}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={student.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phonenumber"
                    placeholder="Phone Number"
                    value={student.phonenumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="DOB"
                    placeholder="Date of Birth"
                    value={student.DOB}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
};

export default StudentUpdateForm;
