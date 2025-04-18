import React from 'react';
import styled from 'styled-components';
import { getCdnUrl } from '../utils/getCdnUrl';

const BASE_URL = import.meta.env.BASE_URL;

const StartScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 40px;
  background: #34495e;
  border-radius: 20px;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 200px; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 20px; /* Space below logo */
`;

const GameTitle = styled.h1`
  color: #ecf0f1;
  font-size: 48px;
  margin: 0;
  font-family: 'VT323', monospace;
`;

const StartButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;
  font-family: 'VT323', monospace;

  &:hover {
    transform: scale(1.05);
  }
`;

const StartScreen = ({ onStart }) => {
  return (
    <StartScreenContainer>
      <LogoImage src={getCdnUrl('images/logo.png')} alt="3JMS Liquor Store Logo" />
      <GameTitle>3JMS Liquor Store</GameTitle>
      <StartButton onClick={onStart}>Start Serving!</StartButton>
    </StartScreenContainer>
  );
};

export default StartScreen; 