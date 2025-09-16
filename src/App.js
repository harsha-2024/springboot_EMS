import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', emailId: '' });

  const API_URL = 'http://localhost:8081/api/v1/employees';

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(API_URL);
    setEmployees(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, newEmployee);
    setNewEmployee({ firstName: '', lastName: '', emailId: '' });
    fetchEmployees();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
        
        <h2>Add New Employee</h2>
        <form onSubmit={addEmployee}>
          <input type="text" name="firstName" value={newEmployee.firstName} onChange={handleInputChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={newEmployee.lastName} onChange={handleInputChange} placeholder="Last Name" required />
          <input type="email" name="emailId" value={newEmployee.emailId} onChange={handleInputChange} placeholder="Email" required />
          <button type="submit">Add Employee</button>
        </form>

        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;