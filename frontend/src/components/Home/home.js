import React, { useState } from 'react';
import trainStationImage from '../../assets/trainStation3.jpg';
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import HomeCSS from './home.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Home = () => {
  // Calendar
  const [startDate, setStartDate] = useState(new Date());
  return (


    <section className={HomeCSS.home}>
      <div className={HomeCSS.homeContent}>
        <div className={HomeCSS.HeaderImage}>
          <img src={trainStationImage} alt="A train station"/>
          {/* Text on top of the image */}
          <div className={HomeCSS.TextOnImage}>
            <h1 className="homeTitle">Find your next trip</h1>
          </div>
        </div>
      </div>
      
    {/* Search form for trips | Need to connect this to API */}
    <div className={HomeCSS.TrainForm}>
  <form>
    <div className="form-row">
    <h2>Travelling routes</h2>
      <div className="row">
        <div className="col">
          {/* Departure input */}
        <h3>Departure <IoLocationSharp className={HomeCSS.LocationIcon}/></h3>
          <input type="text" className="form-control" placeholder="From" />
        </div>
        <div className="col">
          {/* Destination input */}
          <h3>Destination <IoLocationSharp className={HomeCSS.LocationIcon}/></h3>
          <input type="text" className="form-control" placeholder="To" />
        </div>
        <div className="col">
          {/* Date input */}
        <h3>Date <FaCalendarDays  className={HomeCSS.CalendarIcon}/></h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
            placeholderText="Departure"
          />
          </div>
          {/* Submit button */}
          <div className="col">
          <button type="submit" className={HomeCSS.TrainFormButton}>Search</button>
          </div>
      </div>
    </div>
  </form>
</div>

    </section>

  );
};

export default Home;
