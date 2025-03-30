import React from 'react';
import styled from 'styled-components';

const GameOverContainer = styled.div`
  background: #34495e;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  animation: fadeIn 0.5s ease;
  max-width: 600px; /* Optional: limit width */
`;

const GameOverTitle = styled.h1`
  color: ${props => props.isVictory ? '#2ecc71' : '#e74c3c'};
  font-size: 48px;
  margin: 0;
  font-family: 'Courier New', monospace;
`;

const FinalScore = styled.div`
  color: #ecf0f1;
  font-size: 24px;
  font-family: 'Courier New', monospace;
`;

const FailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;

const FailAvatar = styled.img`
  width: 120px;
  height: 120px;
  image-rendering: pixelated;
  border-radius: 10px;
  border: 4px solid #e74c3c; /* Red border for fail */
  background-color: #FFFFFF;
  object-fit: contain;
  padding: 5px;
`;

const FailDialogueBox = styled.div`
  background: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
  color: #2c3e50;
  font-size: 16px;
  text-align: center;
  min-width: 250px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', monospace;
  font-weight: bold;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px; /* Point arrow down */
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #FFFFFF; /* Arrow points down */
  }
`;

const Message = styled.div`
  color: #ecf0f1;
  font-size: 18px;
  margin: 10px 0;
  font-family: 'Courier New', monospace;
`;

const RestartButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s;
  font-family: 'Courier New', monospace;

  &:hover {
    transform: scale(1.05);
  }
`;

const GameOverScreen = ({ score, onRestart, reason, lastCustomer }) => {
  const isVictory = reason === 'victory';
  const isTimeOut = reason === 'timeOut';
  const isWrongAnswer = reason === 'wrongAnswer';

  const getFailMessage = () => {
    if (isTimeOut) {
      return "Your idle time in the team-doctor is unacceptable!";
    }
    if (isWrongAnswer && lastCustomer) {
      return lastCustomer.failDialogue || "That wasn't right..."; // Fallback dialogue
    }
    return "Better luck next time!"; // Default fail message
  };

  const getFailAvatar = () => {
    if (isTimeOut) {
      return '/customers/amel.png'; // Specific avatar for timeout
    }
    if (isWrongAnswer && lastCustomer) {
      return lastCustomer.avatar;
    }
    return null; // No specific avatar for general game over
  };

  const failAvatarSrc = getFailAvatar();

  return (
    <GameOverContainer>
      <GameOverTitle isVictory={isVictory}>
        {isVictory ? 'Victory!' : 'Game Over!'}
      </GameOverTitle>
      <FinalScore>Final Score: {score}</FinalScore>

      {!isVictory && (
        <FailInfoContainer>
          {failAvatarSrc && (
            <>
              <FailAvatar src={failAvatarSrc} alt="Customer" />
              <FailDialogueBox>{getFailMessage()}</FailDialogueBox>
            </>
          )}
          {!failAvatarSrc && (
            <Message>{getFailMessage()}</Message> // Show simple message if no specific customer
          )}
        </FailInfoContainer>
      )}

      {isVictory && (
        <Message>
          Congratulations! You served all customers successfully!
        </Message>
      )}
      
      <RestartButton onClick={onRestart}>
        Play Again
      </RestartButton>
    </GameOverContainer>
  );
};

export default GameOverScreen; 