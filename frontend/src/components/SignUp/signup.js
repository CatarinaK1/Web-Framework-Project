import React, { useState } from 'react';
import LoginCSS from './signup.module.css'; // Import CSS for styling
import TravelersImage from '../../assets/travelers1.jpg';

const SignUpForm = () => {
  // State variables for email and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here (e.g., call an authentication API)
    console.log('Username:', username);
    console.log('Password:', password);

    fetch('http://localhost:3080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then ((r) => r.json())
    .then ((r) => console.log(r))


  };

  return (
    <div className={LoginCSS.loginContainer}>
      <div className={LoginCSS.imageColumn}>
      <img className={LoginCSS.Travelerimage} src={TravelersImage} alt="A train station"/></div> {/* Red column */}
      <div className={LoginCSS.loginForm}>
        <h1 className={LoginCSS.loginForm}>Sign in</h1>
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
          <button type="submit" className={LoginCSS.loginForm}>Login</button>
        </form>
      </div>

    </div>
  );
};

export default SignUpForm;
