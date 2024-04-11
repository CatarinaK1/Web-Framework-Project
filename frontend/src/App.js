import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrainNavbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/home';
import FavoriteDestination from './components/Home/FavoriteDestination';




const App = () => {
  return (

      <div>
        <TrainNavbar />
        <Home/>
        <FavoriteDestination/>
        <Footer />
      </div>

  );
}

export default App;
