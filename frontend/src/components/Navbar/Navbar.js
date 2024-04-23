import React, { useEffect, useState } from 'react';
import NavbarCSS from './navbar.module.css';
import { FaTrainSubway } from 'react-icons/fa6';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// import { updateUsername } from '../../utils';



function TrainNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  // const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is logged in by fetching the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken); // Convert to boolean
    //setUsername(localStorage.getItem('user'));
    setUser(localStorage.getItem('user'));
  }, []);


  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem('accessToken');
    // Update the isLoggedIn state to false
    setIsLoggedIn(false);
    // Redirect the user to the login page or homepage
    // You can use react-router-dom for navigation
    // Example: history.push('/login') or window.location.href = '/login';
  };





  return (

      <Navbar collapseOnSelect expand="lg" className={NavbarCSS.navbar}>
        <Container>
          <FaTrainSubway className="icon" />
          <Navbar.Brand href="#home"> TrainAPI</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>

            {isLoggedIn ? (
              <>
                <Nav.Link>Welcome, {user}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link href="/usersettings">Settings</Nav.Link>



              </>
            ) : (
              <Nav.Link href="/login">Sign in</Nav.Link>
            )}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  );
}

export default TrainNavbar;
