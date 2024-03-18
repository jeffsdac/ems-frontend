import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService';
import {useNavigate} from 'react-router-dom'

function ListEmployeeComponent() {

    const [employee, setEmployee] = useState([]);


    const navigator = useNavigate();

    useEffect(()=>{
        getAllEmployees();
    },[])

    function getAllEmployees(){
        listEmployees().then((response) => {
            console.log(response.data);
            setEmployee(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee () {
        navigator('/add-employee')
    }

    function updateEmployee (id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee (id){
        console.log(id);
        deleteEmployee(id).then((response)=>{
            console.log("User remove!");
            getAllEmployees();
        }).catch((error) => console.error(error));
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of employees</h2>

        <button className="btn btn-outline-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
        <table className="table table-striped-columns table-bordered border-secondary">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                
                {employee.map((employee) => 
                <tr id={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                        <button className='btn btn-info' 
                        onClick={() => updateEmployee(employee.id)}>
                        Update</button>
                        <button className='btn btn-danger ms-1' 
                        onClick={() => removeEmployee(employee.id)}>
                        Delete</button>
                    </td>
                </tr>
                    
                )}

            </tbody>

        </table>

    </div>
  )
}

export default ListEmployeeComponent;