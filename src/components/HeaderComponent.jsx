import React from 'react'
import {useNavigate} from 'react-router-dom';


function HeaderComponent() {
    const navigator = useNavigate();

    function homePage (){
      navigator("/");
    }
  return (
    <div>
        <header>

        <nav className='navbar navbar-dark bg-dark'>
            <button className='btn btn-primary ms-2' onClick={homePage}>Homepage</button>
            <a className="navbar-brand">Employee Management System</a>
        </nav>

        </header>
    </div>
  )
}

export default HeaderComponent