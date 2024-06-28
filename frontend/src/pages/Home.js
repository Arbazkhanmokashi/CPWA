// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../assets/background.png';

const HomeContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
`;

const Heading = styled.h1`
  color: #333;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled(Link)`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <ContentBox>
        <Heading>Welcome to Car Pooling Ride Sharing</Heading>
        <Paragraph>
          Our Car Pooling Ride Sharing application is designed to make your commute easier and more cost-effective. By connecting drivers with passengers who are headed in the same direction, we help reduce traffic congestion and environmental impact. Join our community today to start saving money on gas, reduce your carbon footprint, and meet new people. Whether you're a driver looking to share your ride or a passenger in need of a lift, our platform offers a simple and reliable solution for all your transportation needs.
        </Paragraph>
        <div>
          
          <Button to="/login">Log In</Button>
          <Button to="/rides">Find Rides</Button>
          <Button to="/dashboard">Dashboard</Button>
          <Button to="/register">Register</Button>
        </div>
      </ContentBox>
    </HomeContainer>
  );
}

export default Home;
