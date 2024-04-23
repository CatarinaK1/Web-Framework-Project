import './App.css';
import React, { useState, useEffect } from 'react';
import TrainNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import FavoriteDestination from './components/Home/FavoriteDestination';
import TrainSchedule from './components/Home/TrainSchedule';
import {Route, Routes} from "react-router-dom";
import LoginPage from './components/Login/login';
import SignUpPage from './components/SignUp/signup';
import UserSettings from './components/UserSettings/UserSettings';



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (e.g., by checking token in local storage)
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);


 /* let log = "inactive"
  if (isLoggedIn) log = "active"*/



  return (
    <>
      {/* <div> */}
      <TrainNavbar />
        <Routes>

          

          <Route path="/" element={<><Home /></>}/>

          {isLoggedIn && <Route path="/usersettings" element={<UserSettings />} />}

          <Route path="/login" element={<><LoginPage /></>}/>
          <Route path="/signup" element={<SignUpPage/>}/>


        </Routes>

        {/* {log} */}


      {/* </div> */}
      <Footer />
      </>
  );
}

export default App;
