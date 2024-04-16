import React, { useState } from 'react';
import trainStationImage from '../../assets/trainStation3.jpg';
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import HomeCSS from './home.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import passengerstations from '../../stationsjson/passengerstations.json';
import searchTrains from './scheduleData';
import TrainSchedule from './TrainSchedule';

const Home = () => {
  // Calendar
  const [startDate, setStartDate] = useState(new Date());
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureCity, setDepartureCity] = useState('Helsinki');
  const [destinationCity, setDestinationCity] = useState('Tampere');

  const handleSearch = async () => {
    //const data = await searchTrains(departure, destination); // Korvaa TPE ja HL todellisilla kaupunkikoodeilla
    console.log("nappipainettu");
    TrainSchedule();
  };

  return (
    <section className={HomeCSS.home}>
      <div className={HomeCSS.homeContent}>
        <div className={HomeCSS.HeaderImage}>
          <img src={trainStationImage} alt="A train station"/>
          <div className={HomeCSS.TextOnImage}>
            <h1 className="homeTitle">Find your next trip</h1>
          </div>
        </div>
      </div>
      
      {/* Search form for trips | Need to connect this to API */}
      <div className={HomeCSS.TrainForm}>
        <form onSubmit={handleSearch}return false>
          <div className="form-row">
            <h2>Travelling routes</h2>
            <div className="row">
              <div className="col">
                {/* Departure input */}
                <h3>Departure <IoLocationSharp className={HomeCSS.LocationIcon}/></h3>
                <input 
                  list="stations" 
                  type="text" 
                  className="form-control" 
                  placeholder="From" 
                  value={departure} 
                  onChange={(e) => setDeparture(e.target.value)}
                />
                <datalist id="stations">
                  {passengerstations.map((station, index) => (
                    <option key={index} value={station.stationShortCode}>{station.stationName}</option>
                  ))}
                </datalist>
              </div>
              <div className="col">
                {/* Destination input */}
                <h3>Destination <IoLocationSharp className={HomeCSS.LocationIcon}/></h3>
                <input 
                  list="stations" 
                  type="text" 
                  className="form-control" 
                  placeholder="To" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                />
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
