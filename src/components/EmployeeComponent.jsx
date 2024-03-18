import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';
import {useNavigate, useParams} from 'react-router-dom';

export const EmployeeComponent = () => {

    const [firstName, setFirstname] = useState(''); 
    const [lastName, setLastname] = useState(''); 
    const [email, setEmail] = useState(''); 

    const {id} = useParams();
    //const id = 5;
    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response)=>{
                console.log(response.data);
                setFirstname(response.data.firstName);
                setLastname(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])
    

    const [errors,setErrors] = useState({
        firstName:"",
        lastName:"",
        email:""
    })

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if (validateForm()){
            const employee = {
                firstName, lastName, email
            }

            if (id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch((error) => console.error(error))
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch((error) => console.error(error));
            }
            //console.log(employee);
    
        }

    }

    function validateForm () {
    /**
     * Valida os valores do formulário, caso haja algum nulo retorna false.
     * Caso todos estejam preenchidos retorna true.
     */
        let valid = true;

        const errorsCopy = {... errors};
        
        if (!firstName.trim()){
            errorsCopy.firstName = "First name is requeried";
            valid = false;
        }
        
        if (!lastName.trim()){
            errorsCopy.lastName = "Last Name is requeried";
            valid = false;
        }

        if (!email.trim()){
            errorsCopy.email = "email is requeried";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            <h2 className='text-center'>Add employee</h2>
        }
    }



  return (
    <div className='container pt-3'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'></div>
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>First name: </label>
                        <input 
                        type="text" 
                        placeholder="Enter employee First Name"
                        name="firstName"
                        value={firstName}
                        className={`form-control ${errors.firstName ? 'is-invalid': ''}`} 
                        onChange={(textForm) => setFirstname(textForm.target.value)}
                        />
                    {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}

                    </div>
                    
                    <div className='form-group mb-2'>
                        <label className='form-label'>Last name: </label>
                        <input 
                        type="text" 
                        placeholder="Enter employee Last Name"
                        name='lastName'
                        value={lastName}
                        className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                        onChange={(textForm) => setLastname(textForm.target.value)}
                        />
                    {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                    
                    </div>

                    <div className='form-group mb-2'>
                        <label className="form-label">Email: </label>
                        <input 
                        type="text"
                        placeholder="Enter employee Email"
                        name='email'
                        value={email}
                        className={`form-control ${errors.email ? 'is-invalid': ''}`}
                        onChange={(textForm) => setEmail(textForm.target.value)} 
                        />

                    {errors.email && <div className='invalid-feedback'> {errors.email} </div>}

                    </div>
                    <button className='btn btn-outline-success mb-2 mt-2' onClick={saveOrUpdateEmployee}>ADD EMPLOYEE</button>
                </form>
            </div>

        </div>

    </div>
  )
}
