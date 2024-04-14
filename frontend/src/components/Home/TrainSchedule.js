import React, { useState } from 'react'; // Import useState from React
import TrainCSS from './trainSchedule.module.css';
import { FaTrainSubway } from 'react-icons/fa6';
import { BiCurrentLocation } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const TrainSchedule = () => {
    // Sample data for train schedule
    const scheduleData = [
      { hour: '08:00', train: 'Express 123', track: 'A' },
      { hour: '10:30', train: 'Local 456', track: 'B' },
      { hour: '12:45', train: 'Express 789', track: 'C' },
      { hour: '08:00', train: 'Express 123', track: 'A' },
      { hour: '10:30', train: 'Local 456', track: 'B' },
      { hour: '12:45', train: 'Express 789', track: 'C' },
      { hour: '08:00', train: 'Express 123', track: 'A' }

      // Add more schedule data as needed
    ];

    // Sample for city name data
    const [departureCity, setDepartureCity] = useState('Helsinki');
    const [destinationCity, setDestinationCity] = useState('Tampere');
  
    return (
      <section className={TrainCSS.trainScheduleSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            <div className={TrainCSS.TrainScheduleTitle}>
              <FaTrainSubway className={TrainCSS.TrainScheduleTitleIcon}/>
              <h2>Train Schedule</h2>
            </div>
            <div className={TrainCSS.DepartureDestinationContainer}>
              <div className={TrainCSS.TrainDestinationDeparture}>
                <p>Departure</p>
                <div className={TrainCSS.CityandIcon}>
                  <BiCurrentLocation className={TrainCSS.LocationIcon}/>
                  <h3>{departureCity}</h3>
                </div>
              </div>
              <div className={TrainCSS.TrainDestinationDeparture}>
              <p >Destination </p>
              <div className={TrainCSS.CityandIcon}>
                <FaLocationDot className={TrainCSS.LocationIconDestination}/>
                <h3>{destinationCity}</h3>
                </div>
              </div>
              </div>
            </div>
            <div className={`col-md-8 ${TrainCSS.trainSchedule}`}>
              <div className={`row ${TrainCSS.scheduleRow}`}>
                <div className="col">
                  <h3>Hour</h3>
                </div>
                <div className="col">
                  <h3>Train Number</h3>
                </div>
                <div className="col">
                  <h3>Track</h3>
                </div>
              </div>
              {/* Render train schedule data */}
              {scheduleData.map((item, index) => (
                <div className={`row ${TrainCSS.scheduleRow}`} key={index}>
                  <div className="col">
                    <p>{item.hour}</p>
                  </div>
                  <div className="col">
                    <p>{item.train}</p>
                  </div>
                  <div className="col">
                    <p>{item.track}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default TrainSchedule;