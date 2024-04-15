import React from 'react';
import NavbarCSS from './navbar.module.css';
import { FaTrainSubway } from 'react-icons/fa6';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import {Link} from "react-router-dom";

//import Home from '../Home/home'; // Import the Home component here

function TrainNavbar() {
  return (

      <Navbar collapseOnSelect expand="lg" className={NavbarCSS.navbar}>
        <Container>
          <FaTrainSubway className="icon" />
          <Navbar.Brand href="/"> TrainAPI</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Login">Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  );
}

export default TrainNavbar;
