import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrainNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import FavoriteDestination from './components/Home/FavoriteDestination';
import TrainSchedule from './components/Home/TrainSchedule';




const App = () => {
  return (

      <div>
        <TrainNavbar />
        <Home/>
        <FavoriteDestination/>
        <TrainSchedule/>
        <Footer />
      </div>

  );
}

export default App;
