import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  background: #34495e;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScoreLabel = styled.span`
  color: #ecf0f1;
  font-size: 18px;
  font-family: 'Courier New', monospace;
`;

const ScoreValue = styled.span`
  color: #2ecc71;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
`;

const ScoreBoard = ({ score }) => {
  return (
    <ScoreContainer>
      <ScoreLabel>Score:</ScoreLabel>
      <ScoreValue>{score}</ScoreValue>
    </ScoreContainer>
  );
};

export default ScoreBoard; 