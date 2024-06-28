// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImage from '../assets/login-background.jpg'; // Import your background image

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TransparentContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7); /* Transparent black background */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  color: #ffd700; /* Deep Yellow */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Clear the form fields when the component mounts
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      history.push('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid credentials');
      alert('Invalid credentials'); // Display an alert for invalid credentials
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <TransparentContainer>
                <h2 className="text-center mb-4 text-white">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label className="text-white">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-4 w-100">
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <p className="text-white">
                    Not registered? <StyledLink to="/register">Register now</StyledLink>
                  </p>
                </div>
              </TransparentContainer>
            </Col>
          </Row>
        </Container>
      </ContentContainer>
    </PageContainer>
  );
}

export default Login;
