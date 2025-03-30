import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const CustomerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-image: url('/images/liquorstore-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  min-height: 70vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 62, 80, 0.5);
    border-radius: 10px;
    z-index: -1;
  }
`;

const CustomerAvatar = styled.img`
  width: 150px;
  height: 150px;
  image-rendering: pixelated;
  border-radius: 10px;
  border: 4px solid #3498db;
  background-color: #FFFFFF;
  object-fit: contain;
  padding: 5px;
  animation: ${props => props.isLeaving ? slideOut : slideIn} 1s ease;
`;

const CustomerName = styled.h2`
  color: #ecf0f1;
  margin: 0;
  font-size: 24px;
  font-family: 'Courier New', monospace;
`;

const DialogueBox = styled.div`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  color: #2c3e50;
  font-size: 18px;
  text-align: center;
  min-width: 300px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', monospace;
  font-weight: bold;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 20px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #FFFFFF;
  }
`;

const SelectedBottle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: transparent;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
  min-height: 150px;

  &:hover {
    /* background-color: #e74c3c; */
  }
`;

const BottleImage = styled.img`
  max-width: 180px;
  max-height: 180px;
  width: auto;
  height: auto;
  image-rendering: pixelated;
  border-radius: 5px;
  object-fit: contain;
`;

const BottleName = styled.span`
  color: #ecf0f1;
  font-size: 14px;
  font-family: 'Courier New', monospace;
`;

const DeselectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 8px;
  font-family: 'Courier New', monospace;

  ${SelectedBottle}:hover & {
    opacity: 1;
  }
`;

const Customer = ({ customer, selectedBottle, isLeaving, onDeselect }) => {
  return (
    <CustomerContainer isLeaving={isLeaving}>
      <CustomerAvatar src={customer.avatar} alt={customer.name} isLeaving={isLeaving} />
      <CustomerName>{customer.name}</CustomerName>
      <DialogueBox>{customer.dialogue}</DialogueBox>
      {selectedBottle && (
        <SelectedBottle onClick={onDeselect}>
          <BottleImage src={selectedBottle.image} alt={selectedBottle.name} />
          <DeselectOverlay>X</DeselectOverlay>
        </SelectedBottle>
      )}
    </CustomerContainer>
  );
};

export default Customer; 