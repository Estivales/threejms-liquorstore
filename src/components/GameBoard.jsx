import React from 'react';
import styled from 'styled-components';
import Customer from './Customer';
import BottleShelf from './BottleShelf';
import TimerBar from './TimerBar';
import ScoreBoard from './ScoreBoard';

const CONFIRM_BUTTON_HEIGHT_MOBILE = '80px'; // Define height for padding calculation

const GameBoardContainer = styled.div`
  width: 90vw;
  max-width: 1500px; /* Reduced max width again */
  height: 90vh;
  max-height: 900px; /* Optional max height */
  background: #34495e;
  border-radius: 10px;
  padding: 20px;
  display: grid; /* Default: Desktop grid */
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex; /* Mobile: Flex column */
    flex-direction: column;
    height: 100vh; /* Take full viewport height */
    width: 100vw; /* Take full viewport width */
    max-height: none;
    max-width: none; /* No max-width on mobile */
    border-radius: 0;
    padding: 10px;
    /* Add padding at bottom ONLY IF button is shown, to prevent overlap */
    padding-bottom: ${props => props.showConfirm ? `calc(${CONFIRM_BUTTON_HEIGHT_MOBILE} + 10px)` : '10px'}; 
    gap: 10px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  @media (max-width: 768px) {
    height: auto; /* Reset height */
    flex-shrink: 0; /* Prevent shrinking below content size initially */
    overflow: hidden; /* Hide any overflow from this section */
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    flex-grow: 1; // Takes remaining space
    min-height: 0; 
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto; /* Push to bottom in LeftSection on desktop */

  @media (max-width: 768px) {
    position: fixed; /* Fixed position on mobile */
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 0;
    background: #34495e; /* Give it a background */
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
    z-index: 100;
    height: ${CONFIRM_BUTTON_HEIGHT_MOBILE};
    /* Visibility is handled by ConfirmButton's opacity */
  }
`;

const ConfirmButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out, transform 0.2s;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  font-family: 'Courier New', monospace;
  width: 90%;
  max-width: 400px;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 769px) { 
     width: auto; 
     max-width: none;
  }
`;

const GameBoard = ({ gameState, onBottleSelect, onBottleDeselect, onConfirm, bottles, currentCustomer }) => {
  return (
    <GameBoardContainer showConfirm={gameState.showConfirmButton}>
      <LeftSection>
        <TopSection>
          <ScoreBoard score={gameState.score} />
          <TimerBar timeLeft={gameState.timeLeft} />
        </TopSection>

        <Customer 
          customer={currentCustomer}
          selectedBottle={gameState.selectedBottle}
          isLeaving={gameState.isCustomerLeaving}
          onDeselect={onBottleDeselect}
        />

        {/* BottomSection is part of LeftSection flow on desktop, fixed on mobile */}
        <BottomSection>
          <ConfirmButton 
            show={gameState.showConfirmButton}
            onClick={onConfirm}
          >
            Confirm Selection
          </ConfirmButton>
        </BottomSection>
      </LeftSection>

      <RightSection>
        <BottleShelf 
          bottles={bottles}
          onBottleSelect={onBottleSelect}
          selectedBottle={gameState.selectedBottle}
        />
      </RightSection>
    </GameBoardContainer>
  );
};

export default GameBoard;