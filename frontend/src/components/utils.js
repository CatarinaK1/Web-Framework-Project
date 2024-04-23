// utils.js
export const updateUsername = (newUsername) => {
    // This function updates the username in local storage
    localStorage.setItem('user', newUsername);
  };
  