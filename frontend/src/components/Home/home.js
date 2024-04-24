import React, { useState } from 'react';
import trainStationImage from '../../assets/trainStation3.jpg';
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import HomeCSS from './home.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TrainSchedule from './TrainSchedule';
import FavoriteDestination from './FavoriteDestination';
import passengerstations from '../../stationsjson/passengerstations.json';


const Home = () => {
  // Calendar
  const [startDate, setStartDate] = useState(new Date());
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [isoString, setisoString] = useState(makeIsoString);
  
  function makeIsoString() {
    const timenow =new Date();
    return timenow.toISOString();
  }

  console.log(isoString);
  const handleSubmit = (event) => {
    event.preventDefault(); // Estä lomakkeen oletuslähetyskäyttäytyminen
    //console.log(startDate);
    //variables to check if the startday is today
    const startDateCopy = new Date(startDate);
    const today = new Date();
    const isSameDay = startDateCopy.getDate() === today.getDate() &&
                  startDateCopy.getMonth() === today.getMonth() &&
                  startDateCopy.getFullYear() === today.getFullYear();
    //console.log(isSameDay);
    // If the startDate is not today, set the time to 0:00
    if (!isSameDay) {
      //increment the day by one because the time zone
      startDateCopy.setDate(startDateCopy.getDate() + 1);
      //this set time to 0:00
      startDateCopy.setHours(0, 0, 0, 0);
    }
    setisoString(startDateCopy.toISOString());
    console.log(isoString);
    setSearchClicked(true);
  };

  async function saveFavorite(){
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:3080/savefavorite', {

      method: 'POST',
      headers: {
       'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ departure, destination })
    })
  };

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
  <form onSubmit={handleSubmit}>
    <div className="form-row">
    <h2>Travelling routes</h2>
      <div className="row">
        <div className="col">
          {/* Departure input */}
        <h3>Departure <IoLocationSharp className={HomeCSS.LocationIcon}/></h3>
        <input list="stations" type="text" onChange={(e) =>setDeparture(e.target.value)} className="form-control" placeholder="From" />
          <datalist id="stations">
              {passengerstations.map((station, index) => (
                <option key={index} value={station.stationShortCode}>{station.stationName}</option>
              ))}
            </datalist>
        </div>
        <div className="col">
          {/* Destination input */}
          <h3>Destination <IoLocationSharp className={HomeCSS.LocationIcon}/></h3>
          <input list="stations" type="text" onChange={(e) =>setDestination(e.target.value)} className="form-control" placeholder="To" />
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
          <button onClick={saveFavorite} className={HomeCSS.TrainFormButton}>Save</button>
      </div>
    </div>
  </form>
</div>
<FavoriteDestination />
{searchClicked && <TrainSchedule Search1={departure} Search2={destination} isoString={isoString}/>}
    </section>

  );
};

export default Home;
