import React, { useState } from 'react';
//import LoginCSS from './login.module.css'; // Import CSS for styling

const LoginForm = () => {
  // State variables for email and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform login logic here (e.g., call an authentication API)
    console.log('Username:', username);
    console.log('Password:', password);



    try {
      const response = await fetch('http://localhost:3080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }


      const data = await response.json();
      console.log(data);

      // Save access token to local storage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', data.username);

      // Redirect to homepage after successful login
      window.location.assign('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };







  //  fetch('http://localhost:3080/login', {
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': 'application/json'
  //    },
  //    body: JSON.stringify({username, password})
  //   })


  //   .then((response) => {
  //    if (!response.ok) {
  //      throw new Error('Login failed');
  //    }
  //   //  const data = response.json();
  //    return response.json();
  //  })
        
  //  .then((data) => {
  //    console.log(data); // Handle successful login response
  //     //Redirect to homepage
  //     window.location.assign('/'); 
  //  })
  //   .catch((error) => {
  //     console.error('Login error:', error); // Handle login error
  //     setError('Invalid username or password'); // Set error message
 
  //  });


  // };

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

          {/* Create an account button */}
          <div className={LoginCSS.CreateAccount}><p>Don't have an account? <Link to="/signup">Create an account</Link></p></div>
          <button type="submit" className={LoginCSS.loginForm}>Login</button>

        </form>

     
      {/* Error message */}
      {error && <span className={LoginCSS.error}>{error}</span>}

      </div>
      <div className="red-column"></div> {/* Red column */}
    </div>
  );
};

export default LoginForm;
