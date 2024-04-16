import React, { useState } from 'react';
import LoginCSS from './signup.module.css'; // Import CSS for styling
import TravelersImage from '../../assets/travelers1.jpg';

const SignUpForm = () => {
  // State variables for email and password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })
    // .then ((r) => r.json())
    // .then ((r) => console.log(r))
    .then((response) => {
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Handle successful login response

    })
    .catch((error) => {
      console.error('Registration error:', error); // Handle login error
      setError('Invalid username or password'); // Set error message
    });


  };

  return (
    <div className={LoginCSS.loginContainer}>
      <div className={LoginCSS.imageColumn}>
      <img className={LoginCSS.Travelerimage} src={TravelersImage} alt="A train station"/></div> {/* Red column */}
      <div className={LoginCSS.loginForm}>
        <h1 className={LoginCSS.loginForm}>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className={LoginCSS.loginForm}>
            <h2>Username</h2>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={LoginCSS.loginForm}>
            <h2>Email</h2>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={LoginCSS.loginForm}>
            <h2>Password</h2>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={LoginCSS.loginForm}>Create</button>
        </form>
      </div>

    </div>
  );
};

export default SignUpForm;
