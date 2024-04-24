import React, { useState, useEffect } from 'react';
import TrainCSS from './trainSchedule.module.css';
import { FaTrainSubway } from 'react-icons/fa6';
import { BiCurrentLocation } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import searchTrains from './scheduleData'; // js for searching trains with api


const TrainSchedule = ({ Search1 = 'TPE', Search2 = 'HL' , isoString = ''}) => {
  const [departureCity, setDepartureCity] = useState('Tampere');
  const [destinationCity, setDestinationCity] = useState('Hämeenlinna');
  const [scheduleData, setScheduleData] = useState([]);
  //console.log("sascömöckaölkckmamcökaofeadsad");
  //console.log(isoString);
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchTrains(Search1, Search2, isoString);
      setScheduleData(data);
    };

    fetchData();
  }, [Search1, Search2, isoString]);

  useEffect(() => {
    // Päivitä kaupunkitiedot aina, kun hakutiedot muuttuvat
    setDepartureCity(Search1);
    setDestinationCity(Search2);
  }, [Search1, Search2, isoString]);

  const renderScheduleRows = (scheduleData) => {
    return scheduleData.map((item, index) => (
      <div className={`row ${TrainCSS.scheduleRow}`} key={index}>
        <div className="col">
          <p>{item.Departurehour}</p>
        </div>
        <div className="col">
          <p>{item.Arrivalhour}</p>
        </div>
        <div className="col">
          <p>{item.train}</p>
        </div>
        <div className="col">
          <p>{item.track}</p>
        </div>
      </div>
    ));
  };

  const renderTrainSchedule = () => {
    return (
      <section className={TrainCSS.trainScheduleSection}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={TrainCSS.TrainScheduleTitle}>
                <FaTrainSubway className={TrainCSS.TrainScheduleTitleIcon} />
                <h2>Train Schedule</h2>
              </div>
              <div className={TrainCSS.DepartureDestinationContainer}>
                <div className={TrainCSS.TrainDestinationDeparture}>
                  <p>Departure</p>
                  <div className={TrainCSS.CityandIcon}>
                    <BiCurrentLocation className={TrainCSS.LocationIcon} />
                    <h3>{departureCity}</h3>
                  </div>
                </div>
                <div className={TrainCSS.TrainDestinationDeparture}>
                  <p>Destination </p>
                  <div className={TrainCSS.CityandIcon}>
                    <FaLocationDot className={TrainCSS.LocationIconDestination} />
                    <h3>{destinationCity}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-md-8 ${TrainCSS.trainSchedule}`}>
              <div className={`row ${TrainCSS.scheduleRow}`}>
                <div className="col">
                  <h3>Departure Time</h3>
                </div>
                <div className="col">
                  <h3>Arrival time</h3>
                </div>
                <div className="col">
                  <h3>Train Number</h3>
                </div>
                <div className="col">
                  <h3>Track</h3>
                </div>
              </div>
              {renderScheduleRows(scheduleData)}
            </div>
          </div>
        </div>
      </section>
    );
  };
  if (!scheduleData) {
    return <p>No trains were found for this route.</p>; // Näytä latausviesti, jos scheduleData ei ole vielä saatavilla
  }
  return renderTrainSchedule();
};

export default TrainSchedule;
