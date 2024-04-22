import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import UserCSS from './usersettings.module.css'; // Import CSS for styling

// import { updateUsername } from './components/utils';


const UserSettingsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        // Check if the user is logged in by fetching the access token from local storage
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken); // Convert to boolean
        //setUsername(localStorage.getItem('user'));
        setUser(localStorage.getItem('user'));
      }, []);
    


    const handleUsernameSubmit = async (event) => {
        event.preventDefault();
  
        // Debugging
        console.log('Username Form submitted');
        console.log('Username:', username);
        console.log('New Username:', newUsername);
        console.log('Email:', email);
        console.log('Password:', password);
    
        try {
          const response = await fetch('http://localhost:3080/newusername', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, newUsername, email, password })
          });
    
          if (!response.ok) {
            throw new Error('Failed to change username');
          }
    
          const data = await response.json();
          console.log(data);
          
          // Update the username in local storage
          localStorage.setItem('user', newUsername);
    
          // Show success message
          setError('Username changed successfully');
        } catch (error) {
          console.error('Username change error:', error);
          setError('Failed to change username');
        }
      };
  
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
  
        // Debugging
        console.log('Password Form submitted');
        console.log('Username:', username);
        console.log('Current Password:', password);
        console.log('New Password:', newpassword);
        console.log('Email:', email);

    
        try {
          const response = await fetch('http://localhost:3080/newpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, newpassword })
          });
    
          if (!response.ok) {
            throw new Error('Failed to change password');
          }
    
          const data = await response.json();
          console.log(data);
    
          // Show success message
          setError('Password changed successfully');
        } catch (error) {
          console.error('Password change error:', error);
          setError('Failed to change password');
        }
      };

  
    return (
        <div>
            <div className={UserCSS.WelcomeUser}><h1>Welcome {user}</h1></div>
            <div className={UserCSS.UserSettingsContainer}>
                <div className={UserCSS.ChangeUserForm}>
                    <h2><FaUserCircle className={UserCSS.UserIcon}/>Change Username</h2>
                    <form onSubmit={handleUsernameSubmit}>
                        <div className='ChangeUserForm'>
                            <label>Current Username:</label>
                            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>New Username:</label>
                            <input type="text" name="newUsername" onChange={(e) => setNewUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={UserCSS.ChangeFormButton}>
                            <button type="submit">Change Username</button>
                        </div>
                    </form>
                </div>
    
                <div className={UserCSS.ChangePasswordForm}>
                    <h2>New Password</h2>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className='ChangeUserForm'>
                            <label>Current Username:</label>
                            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>New Password:</label>
                            <input type="password" name="newpassword" onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={UserCSS.ChangeFormButton}>
                            <button type="submit">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
            {error && <p className={UserCSS.error}>{error}</p>}
        </div>
    );
    
}; 
  export default UserSettingsPage;