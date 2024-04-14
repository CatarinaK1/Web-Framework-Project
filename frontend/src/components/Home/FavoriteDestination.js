import React from 'react';
import HomeCSS from './home.module.css';
// import trainStationImage from '../../assets/trainStation3.jpg';
import HelsinkiImage from '../../assets/Helsinki.jpg';
import TurkuImage from '../../assets/Turku.jpg';
import TampereImage from '../../assets/Tampere.jpg';
import { MdLocationPin } from "react-icons/md";

const FavoriteDestination = () => {


  const FavoriteDestinationCity = [
    {
      id: 1,
      Departure: 'Helsinki',
      Destination: 'Tampere',
     image: TampereImage

    },
    {
        id: 2,
        Departure: 'Tampere',
        Destination: 'Helsinki',
       image: HelsinkiImage
      },
    {
        id: 3,
        Departure: 'Helsinki',
        Destination: 'Turku',
       image: TurkuImage,
      },


  ];

  return (
    <div className="educational-background container mt-5">
      <h2 className={`mb-4 ${HomeCSS.destination}`}>Favorite Destinations </h2>
      <div className="row justify-content-center">

        {/* iterate through the objects, they are treated as an array of objects */}
        {FavoriteDestinationCity.map((FavoriteDestinationCityItem) => (
          <div className="col-md-6 col-lg-4 mb-4" key={FavoriteDestinationCityItem.id} style={{ height: '300px',  width: '300px' }}>
            <div className="card h-100 shadow">
            <img src={FavoriteDestinationCityItem.image} className={`card-img-top ${HomeCSS.cardImage}`} alt="City" />
              <div className="card-header text-muted">
                <h5 className="card-title mb-0">{FavoriteDestinationCityItem.Departure}</h5>
              </div>
              <div className="card-body">
                <h6 className={`card-subtitle mb-2 bold ${HomeCSS.card}`}>
                <MdLocationPin />{FavoriteDestinationCityItem.Destination}
                </h6>
                <div className="d-flex justify-content-center">
                {/* Need to create a button to autofill search options */}
                {/* <a href="" target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${ProjectCSS.socialButton}`}>
                </a> */}
              </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FavoriteDestination;
