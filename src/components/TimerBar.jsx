import React from 'react';
import styled from 'styled-components';

const BASE_URL = import.meta.env.BASE_URL;

const TimerContainer = styled.div`
  background: #34495e;
  padding: 10px 15px; /* Adjust padding */
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px; /* Adjust gap */
`;

const TimerIcon = styled.img`
  width: 20px; /* Set icon size */
  height: 20px;
  image-rendering: pixelated; /* Optional for pixel art icons */
`;

const TimerText = styled.span`
  color: #ecf0f1;
  font-size: 18px;
  font-family: 'VT323', monospace;
  min-width: 40px; /* Give text some space */
  text-align: right;
`;

const TimerBarContainer = styled.div`
  width: 200px;
  height: 20px;
  background: #2c3e50;
  border-radius: 10px;
  overflow: hidden;
`;

const TOTAL_TIME = 60; // Define total time constant

const TimerBarFill = styled.div`
  width: ${props => (props.timeLeft / TOTAL_TIME) * 100}%; // Use total time constant
  height: 100%;
  background: ${props => {
    const percentageLeft = (props.timeLeft / TOTAL_TIME);
    if (percentageLeft > 0.5) return '#2ecc71'; // Green above 50%
    if (percentageLeft > 0.2) return '#f1c40f'; // Yellow above 20%
    return '#e74c3c'; // Red below 20%
  }};
  transition: width 1s linear, background-color 0.3s ease;
`;

const TimerBar = ({ timeLeft }) => {
  console.log("TimerBar re-render"); // Add log for debugging
  return (
    <TimerContainer>
      <TimerText>{timeLeft}s</TimerText>
      <TimerBarContainer>
        <TimerBarFill timeLeft={timeLeft} />
      </TimerBarContainer>
      <TimerIcon src={`${BASE_URL}images/time-doctor.webp`} alt="Timer Icon" />
    </TimerContainer>
  );
};

export default TimerBar; 