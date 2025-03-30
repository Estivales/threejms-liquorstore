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
  /* flex-grow: 1; */ /* Remove flex-grow */
  width: 200px; /* Restore fixed width */
  height: 20px;
  background: #2c3e50;
  border-radius: 10px;
  overflow: hidden;
`;

const TOTAL_TIME = 30; // Update total time for bar calculation

const TimerBarFill = styled.div`
  height: 100%;
  width: ${props => (props.timeLeft / TOTAL_TIME) * 100}%;
  background: ${props => props.timeLeft <= 10 ? '#e74c3c' : '#2ecc71'}; // Red if <= 10 seconds
  border-radius: 10px;
  transition: width 0.5s linear, background-color 0.5s linear;
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