import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrainNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import FavoriteDestination from './components/Home/FavoriteDestination';
import TrainSchedule from './components/Home/TrainSchedule';
import {Route, Routes} from "react-router-dom";
import LoginPage from './components/Login/login';
import SignUpPage from './components/SignUp/signup';



const App = () => {
  return (
    <>
      {/* <div> */}
      <TrainNavbar />
        <Routes>

          <Route path="/" element={<><Home /><FavoriteDestination /><TrainSchedule /></>}/>
          <Route path="/login" element={<><LoginPage /></>}/>
          <Route path="/signup" element={<SignUpPage/>}/>


        </Routes>
      {/* </div> */}
      <Footer />
      </>
  );
}

export default App;
