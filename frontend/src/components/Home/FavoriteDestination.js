import React, { useState, useEffect } from 'react';
import HomeCSS from './home.module.css';
import { MdLocationPin } from "react-icons/md";
import axios from 'axios';

const FavoriteDestination = () => {
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);

  useEffect(() => {
    const fetchFavoriteDestinations = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 

        // Set up the headers with the authentication token
        const headers = {
          'authorization': `Bearer ${token}`
        };

        // Make a GET request to fetch favorite destinations from the backend
        const response = await axios.get('http://localhost:3080/getfavorite', { headers });
        setFavoriteDestinations(response.data.favoriteTrips);
      } catch (error) {
        console.error('Error fetching favorite destinations:', error);
      }
    };

    fetchFavoriteDestinations();
  }, []);

  return (
    <div className="educational-background container mt-5">
      <h2 className={`mb-4 ${HomeCSS.destination}`}>Favorite Destinations </h2>
      <div className="row justify-content-center">
        {/* iterate through the favorite destinations fetched from the backend */}
        {favoriteDestinations.map((favoriteDestinationItem) => (
          <div className="col-md-6 col-lg-4 mb-4" key={favoriteDestinationItem._id} style={{ height: '300px',  width: '300px' }}>
            <div className="card h-100 shadow">
              <img src={favoriteDestinationItem.image} className={`card-img-top ${HomeCSS.cardImage}`} alt="City" />
              <div className="card-header text-muted">
                <h5 className="card-title mb-0">{favoriteDestinationItem.departure}</h5>
              </div>
              <div className="card-body">
                <h6 className={`card-subtitle mb-2 bold ${HomeCSS.card}`}>
                  <MdLocationPin />{favoriteDestinationItem.destination}
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
