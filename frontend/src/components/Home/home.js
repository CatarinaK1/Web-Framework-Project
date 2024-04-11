import React, { useState } from 'react';
import trainStationImage from '../../assets/trainStation3.jpg';
import { IoLocationSharp } from "react-icons/io5";
import HomeCSS from './home.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (


    <section className={HomeCSS.home}>
      <div className={HomeCSS.overlay}></div>
      <div className={HomeCSS.homeContent}>
        <div className={HomeCSS.HeaderImage}>
          <img src={trainStationImage} alt="A train station"/>
          <div className={HomeCSS.TextOnImage}>
            <h1 className="homeTitle">Find your next trip</h1>
          </div>
        </div>
      </div>
      

    <div className={HomeCSS.TrainForm}>
  <form>
    <div className="form-row">
    <h2>Travelling routes</h2>
      <div className="row">
        <div className="col">
        <h3>Leaving <IoLocationSharp /></h3>
          <input type="text" className="form-control" placeholder="From" />
        </div>
        <div className="col">
          <h3>Destination <IoLocationSharp /></h3>
          <input type="text" className="form-control" placeholder="To" />
        </div>
        <div className="col">
        <h3>Date <IoLocationSharp /></h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
            placeholderText="Departure"
          />
          </div>
          <div className="col">
          <button type="submit" className="btn btn-primary">Search</button>
          </div>
      </div>
    </div>
  </form>
</div>

    </section>

  );
};

export default Home;
