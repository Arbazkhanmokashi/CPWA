// src/pages/RideDetails.js

import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

function RideDetails() {
  const location = useLocation();
  const ride = location.state.ride;

  return (
    <div>
      <Navbar />
      <h2>Ride Details</h2>
      <div>
        <img
          src={ride.car === 'Sedan' ? '/path/to/sedan.jpg' : '/path/to/swift.jpg'}
          alt="Car"
          style={{ width: '100px', height: '100px', borderRadius: '10px', marginBottom: '10px' }}
        />
        <p>Car: {ride.car}</p>
        <p>Car Number: {ride.carNumber}</p>
        <p>Seats Available: {ride.seatsAvailable}</p>
        <p>Driver Name: {ride.driverName}</p>
        <p>Contact: {ride.driverContact}</p>
        <p>Driver Rating: {ride.driverRating}</p>
        <p>Share this code with the driver: {ride.shareCode}</p>
      </div>
    </div>
  );
}

export default RideDetails;
