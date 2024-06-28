import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/dashboard.png'; // Import the background image
import NavigationHelp from '../components/NavigationHelp'; // Import the NavigationHelp component
import api from '../services/api';
import FeedbackForm from '../components/FeedbackForm';

const DashboardContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  position: relative; /* Ensure the container is positioned relatively */
  overflow: auto; /* Allow scrolling */
`;

const ContentBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  max-width: 800px; /* Increase the max-width */
  margin: 50px auto; /* Center the content horizontally */
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

const AdminButton = styled.button`
  background-color: #ff0000; /* Red color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Input = styled.input`
  margin-bottom: 15px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FeedbackContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5); /* Transparent white background */
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #007bff; /* Bootstrap primary blue color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

function Dashboard() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [viewAllFeedbacks, setViewAllFeedbacks] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchFeedback();
      fetchFeedbackCount();
    }
  }, [isAdminLoggedIn]);

  const handleAdminModeToggle = () => {
    setIsAdminMode(!isAdminMode); // Toggle admin mode
    setUsername('');
    setPassword('');
    setIsAdminLoggedIn(false); // Reset admin login state
    setFeedback([]); // Clear feedback when toggling admin mode
    setFeedbackCount(0); // Reset feedback count when toggling admin mode
    setViewAllFeedbacks(false); // Reset view all feedbacks state
    setError(null); // Reset error state
  };

  const handleAdminLogin = () => {
    // Authenticate admin credentials
    if (username === 'admin' && password === 'admin123') {
      alert('Welcome, Admin! Showing admin dashboard...');
      setIsAdminLoggedIn(true);
    } else {
      alert('Invalid admin credentials. Please try again.');
      setIsAdminLoggedIn(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await api.get('/feedback');
      setFeedback(response.data.feedback || []); // Ensure feedback is initialized as an array
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback([]); // Reset feedback to empty array on error
      setError('Error fetching feedback. Please try again.'); // Set error state
    }
  };

  const fetchFeedbackCount = async () => {
    try {
      const response = await api.get('/feedback/count');
      setFeedbackCount(response.data.feedbackCount || 0); // Ensure feedback count is initialized correctly
    } catch (error) {
      console.error('Error fetching feedback count:', error);
      setFeedbackCount(0); // Reset feedback count on error
      setError('Error fetching feedback count. Please try again.'); // Set error state
    }
  };

  const feedbackTypes = [

    { comments: 'Great experience! Will use again.', rating: 5 },
    { comments: 'Average service, could be better.', rating: 3 },
    { comments: 'Very convenient and affordable.', rating: 4 },
    { comments: 'Needs improvement in punctuality.', rating: 2 },
    { comments: 'Great experience in its first time only', rating: 4 },
    { comments: 'Excellent customer support.', rating: 5 }
  ];

  const handleViewAllFeedbacks = () => {
    // Randomly select 5 feedback types from feedbackTypes array
    const selectedFeedbacks = [];
    const indices = [];
    while (indices.length < 5) {
      const randomIndex = Math.floor(Math.random() * feedbackTypes.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
        selectedFeedbacks.push(feedbackTypes[randomIndex]);
      }
    }
    setFeedback(selectedFeedbacks); // Update feedback with selected feedback types
    setViewAllFeedbacks(true); // Set viewAllFeedbacks state to true to display feedbacks
    setError(null); // Clear any previous error
  };

  return (
    <DashboardContainer>
      <Navbar />
      <NavigationHelp />
      <ContentBox>
        <Heading>Dashboard</Heading>
        <Paragraph>
          Welcome to the Car Pooling Ride Sharing application dashboard. Here, you can access various features and services that enhance your commuting experience. Discover affordable travel options by sharing rides with others heading in the same direction. Save on fuel costs, reduce your carbon footprint, and make new connections with our platform. Enjoy the convenience and benefits of carpooling with us.
        </Paragraph>
        <AdminButton onClick={handleAdminModeToggle}>
          {isAdminMode ? 'Turn Off Admin Mode' : 'Turn On Admin Mode'}
        </AdminButton>
        {isAdminMode && !isAdminLoggedIn && (
          <div>
            <Input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAdminLogin}>Login</button>
          </div>
        )}
      </ContentBox>
      {!isAdminLoggedIn && (
        <FeedbackForm />
      )}
      {isAdminLoggedIn && (
        <FeedbackContainer>
          <h3>Feedback Count: {feedbackCount}</h3>
          {error && <p>{error}</p>}
          {!viewAllFeedbacks && (
            <Button onClick={handleViewAllFeedbacks}>View All Feedbacks</Button>
          )}
          {viewAllFeedbacks && (
            <div>
              <Button onClick={() => setViewAllFeedbacks(false)}>Go Back</Button>
              <ul>
                {feedback.map((fb, index) => (
                  <li key={index}>{fb.comments} - Rating: {fb.rating}</li>
                ))}
              </ul>
            </div>
          )}
        </FeedbackContainer>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
