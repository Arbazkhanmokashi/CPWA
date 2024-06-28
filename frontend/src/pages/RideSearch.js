import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/ride-search-background.jpg';
import sedanImage from '../assets/sedan.jpg';
import swiftImage from '../assets/swift.jpg';

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LocationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

const LocationItem = styled.li`
  cursor: pointer;
  padding: 5px 10px;
  background-color: ${(props) => (props.selected ? '#007bff' : 'transparent')};
  color: ${(props) => (props.selected ? 'white' : '#333')};
  border-radius: 5px;
  margin: 5px;
`;

const LoadingContainer = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const carAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(20px); }
  50% { transform: translateX(40px); }
  75% { transform: translateX(60px); }
  100% { transform: translateX(80px); }
`;

const Car = styled.span`
  display: inline-block;
  margin-left: 10px;
  animation: ${carAnimation} 0.5s linear infinite;
`;

const ResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ResultContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
`;

const CarImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const DriverDetails = styled.div`
  margin-top: auto;
`;

const DriverContact = styled.p`
  margin-bottom: 5px;
`;

const DriverRating = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ShareCode = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const BookingButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RideSearch = () => {
  const history = useHistory();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);
  const [loading, setLoading] = useState(false);

  const predefinedLocations = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Bangalore', 'Goa', 'Dehradun'];

  const handleOriginInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setOrigin(value);
    setShowOriginList(value.length > 0);
  };

  const handleDestinationInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setDestination(value);
    setShowDestinationList(value.length > 0);
  };

  const handleLocationClick = (location, type) => {
    if (type === 'origin') {
      setOrigin(location);
      setShowOriginList(false);
    } else if (type === 'destination') {
      setDestination(location);
      setShowDestinationList(false);
    }
  };

  const handleSearch = () => {
    if (!destination) {
      alert('Please enter a destination.');
      return;
    }

    if (!predefinedLocations.includes(origin.charAt(0).toUpperCase() + origin.slice(1)) || !predefinedLocations.includes(destination.charAt(0).toUpperCase() + destination.slice(1))) {
      alert('Location not available.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setSearchResults([
        {
          id: 1,
          origin,
          destination,
          car: 'Sedan',
          carNumber: 'MH 12 AB 1234',
          driverName: 'Muhammad Ali',
          seatsAvailable: 3,
          driverContact: '+91 9876543210',
          driverRating: '⭐⭐⭐⭐⭐',
          shareCode: 'XYZ123',
        },
        {
          id: 2,
          origin,
          destination,
          car: 'Swift',
          carNumber: 'MH 14 CD 5678',
          driverName: 'Mike Dawson',
          seatsAvailable: 2,
          driverContact: '+91 9876543211',
          driverRating: '⭐⭐⭐⭐',
          shareCode: 'ABC456',
        },
      ]);
    }, 5000);
  };

  const handleBookNow = (ride) => {
    console.log(`Booking ride with car ${ride.car} (${ride.carNumber})`);
    window.confirm('Booking Successful! Click OK to continue.');
    setSearchResults([]);
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <SearchBox>
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={handleOriginInputChange}
          />
          {showOriginList && (
            <LocationList>
              {predefinedLocations
                .filter((loc) => loc.toLowerCase().includes(origin))
                .map((loc) => (
                  <LocationItem
                    key={loc}
                    onClick={() => handleLocationClick(loc, 'origin')}
                    selected={origin === loc}
                  >
                    {loc}
                  </LocationItem>
                ))}
            </LocationList>
          )}
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={handleDestinationInputChange}
          />
          {showDestinationList && (
            <LocationList>
              {predefinedLocations
                .filter((loc) => loc.toLowerCase().includes(destination))
                .map((loc) => (
                  <LocationItem
                    key={loc}
                    onClick={() => handleLocationClick(loc, 'destination')}
                    selected={destination === loc}
                  >
                    {loc}
                  </LocationItem>
                ))}
            </LocationList>
          )}
          <BookingButton onClick={handleSearch} disabled={loading}>
            {loading ? (
              <>
                Searching
                <Car>&nbsp;🚗</Car>
              </>
            ) : (
              'Search'
            )}
          </BookingButton>
        </SearchBox>
        {loading && (
          <LoadingContainer>
            Searching for available rides
          </LoadingContainer>
        )}
        <ResultsContainer>
          {searchResults.map((ride) => (
            <ResultContainer key={ride.id}>
              <CarImage src={ride.car === 'Sedan' ? sedanImage : swiftImage} alt={ride.car} />
              <h3>{ride.car}</h3>
              <p>{ride.carNumber}</p>
              <p>{ride.driverName}</p>
              <DriverDetails>
                <DriverContact>Contact: {ride.driverContact}</DriverContact>
                <DriverRating>Rating: {ride.driverRating}</DriverRating>
                <p>Seats Available: {ride.seatsAvailable}</p>
              </DriverDetails>
              <ShareCode>Share Code: {ride.shareCode}</ShareCode>
              <ConfirmButton onClick={() => handleBookNow(ride)}>Book Now</ConfirmButton>
            </ResultContainer>
          ))}
        </ResultsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default RideSearch;
