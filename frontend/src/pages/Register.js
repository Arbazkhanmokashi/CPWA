// src/pages/Register.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation
import GradientContainer from '../components/GradientContainer';
import backgroundImage from '../assets/register.jpg';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavbarButton = styled.button`
  background-color: #ffd700; /* Deep Yellow */
  border: none;
  color: #000;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
`;

const RegisterContainer = styled.div`
  padding: 80px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 70px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8); /* Transparent black background */
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  margin-bottom: 15px;
  width: 90%;
  background: transparent;
  border: 1px solid #fff;
  color: #ffd700; /* Deep Yellow */
`;

const StyledButton = styled.button`
  margin-top: 15px;
  width: 90%;
  background-color: #ffd700; /* Deep Yellow */
  border: none;
  color: #000;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
`;

const StyledHeading = styled.h2`
  color: #ffd700; /* Deep Yellow */
`;

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    // Clear the form fields when the component mounts
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  const isValidEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('Failed to register!');
      return;
    }

    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registration successful');
      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
      // Redirect to login page
      history.push('/login');
    } catch (err) {
      console.error('Registration failed', err);
      alert('Registration failed');
    }
  };

  const goToHome = () => {
    history.push('/'); // Navigate to Home page
  };

  const goToDashboard = () => {
    history.push('/dashboard'); // Navigate to Dashboard page
  };

  return (
    <GradientContainer background={backgroundImage}>
      <NavbarContainer>
        <NavbarButton onClick={goToHome}>Home</NavbarButton>
        <NavbarButton onClick={goToDashboard}>Dashboard</NavbarButton>
        {/* Add more buttons for other pages as needed */}
      </NavbarContainer>
      <RegisterContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeading>Register</StyledHeading>
          <StyledInput
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton type="submit">Register</StyledButton>
        </StyledForm>
      </RegisterContainer>
    </GradientContainer>
  );
}
