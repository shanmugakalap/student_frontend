import React, { useState } from 'react';
import './StudentForm.css'; // Import the CSS file

const StudentForm = () => {
    const [students, setStudents] = useState([{ 'name': '', 'dept': '', 'address': '', 'phonenumber': '' }]);

    const handleChange = (index, event) => {
        const values = [...students];
        values[index][event.target.name] = event.target.value;
        setStudents(values);
    };

    const handleAddStudent = () => {
        setStudents([...students, { 'name': '', 'dept': '', 'address': '', 'phonenumber': '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Data sent:', students);

            // Convert the students array to a JSON string and log it
        const jsonData = JSON.stringify(students);
        console.log('JSON Data sent:', jsonData); // Logs the JSON string

        try {
            const response = await fetch('http://127.0.0.1:8000/api/students/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(students),

            });

            if (response.ok) {
                alert('Students added successfully!');
                setStudents([{ 'name': '', 'dept': '', 'address': '', 'phonenumber': '' }]); // Reset form
            } else {
                const errorData = await response.json();
                console.error('Error data received from backend:', errorData);

                const errorMessage = 
                    errorData?.non_field_errors?.join(', ') || // Use join to format the array
                    errorData?.detail || 
                    'Unknown error';

                alert(`Failed to add students: ${errorMessage}`); // Show alert with the error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding students.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Students</h2>
            <form onSubmit={handleSubmit}>
                {students.map((student, index) => (
                    <div className="student-input" key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={student.name}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <input
                            type="text"
                            name="dept"
                            placeholder="Department"
                            value={student.dept}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={student.address}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Phone Number"
                            value={student.phonenumber}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddStudent}>
                    Add Another Student
                </button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StudentForm;
