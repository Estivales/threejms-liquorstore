import React from 'react';
import styled from 'styled-components';

const ShelfContainer = styled.div`
  background: #2c3e50; /* Restore solid background */
  /* background-image: url('/images/shelf-default.png'); */ /* Remove background image */
  /* background-repeat: repeat; */
  /* background-size: 1000px 1000px; */
  border-radius: 10px; 
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 100%;

  // Scrollbar styles
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #2c3e50; /* Match restored background */
  }
  &::-webkit-scrollbar-thumb {
    background: #34495e; 
    &:hover {
      background: #3498db;
    }
  }
`;

const BottleContainer = styled.div`
  width: 310px;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* transition: transform 0.2s; */ /* No transition needed here now */
  background-image: url('/images/shelf-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative;
  overflow: hidden;

  /* Remove direct hover transform */
  /* &:hover { ... } */

  &::after { // Selection overlay
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(52, 152, 219, 0.5);
    opacity: ${props => props.selected ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }
`;

const BottleImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  /* Remove hover transition/transform */
  /* transition: transform 0.2s ease-in-out; */
  /* ${BottleContainer}:hover & { ... } */
`;

// New component for the hover message
const HoverMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-size: 24px;
  font-weight: bold;
  opacity: 0; /* Hidden by default */
  transition: opacity 0.2s ease-in-out;
  pointer-events: none; /* Let clicks pass through */
  z-index: 5; /* Ensure it's above the image but below container hover effect if any */

  /* Show on hover of the parent container */
  ${BottleContainer}:hover & {
    opacity: ${props => props.disabled ? 0 : 1}; /* Only show if not disabled */
  }
`;

const BottleShelf = ({ bottles, onBottleSelect, selectedBottle }) => {
  const isBottleSelected = (bottle) => {
    return selectedBottle && selectedBottle.id === bottle.id;
  };

  return (
    <ShelfContainer>
      {bottles.map(bottle => (
        <BottleContainer
          key={bottle.id}
          selected={isBottleSelected(bottle)}
          disabled={selectedBottle !== null}
          onClick={() => !selectedBottle && onBottleSelect(bottle)} // Prevent click if disabled
        >
          <BottleImage src={bottle.image} alt={bottle.name} />
          <HoverMessage disabled={selectedBottle !== null}>Pick</HoverMessage> {/* Add the message */} 
        </BottleContainer>
      ))}
    </ShelfContainer>
  );
};

export default BottleShelf; 