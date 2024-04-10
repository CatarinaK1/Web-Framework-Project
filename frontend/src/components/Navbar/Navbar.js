import React from 'react';
import NavbarCSS from './navbar.module.css';
import { FaTrainSubway } from "react-icons/fa6";

const Navbar = () => {

  return (
    
        <section className='navbarSection'>
           <header className= "header flex">
           <div className="logoDiv">
            <a href="#" className="logo flex">
                <h1><FaTrainSubway className="icon"/> TrainAPI</h1>
            </a>
            </div> 
    

           </header>
        </section>


  );
};

export default Navbar;
