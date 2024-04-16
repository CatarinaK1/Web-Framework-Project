import React, { useState } from 'react';
//import LoginCSS from './login.module.css'; // Import CSS for styling

const LoginForm = () => {
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
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="red-column"></div> {/* Red column */}
    </div>
  );
};

export default LoginForm;
