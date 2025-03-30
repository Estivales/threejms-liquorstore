import React from 'react';
import styled from 'styled-components';
import Customer from './Customer';
import BottleShelf from './BottleShelf';
import TimerBar from './TimerBar';
import ScoreBoard from './ScoreBoard';

const GameBoardContainer = styled.div`
  width: 90vw;
  height: 90vh;
  background: #34495e;
  border-radius: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  overflow: hidden;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  position: sticky;
  top: 0;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;
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
`;

const ConfirmButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  font-family: 'Courier New', monospace;

  &:hover {
    transform: scale(1.05);
  }
`;

const GameBoard = ({ gameState, onBottleSelect, onBottleDeselect, onConfirm, bottles, currentCustomer }) => {
  return (
    <GameBoardContainer>
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