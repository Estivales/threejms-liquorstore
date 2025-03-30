import React from 'react';
import styled from 'styled-components';

const ShelfContainer = styled.div`
  /* background: #2c3e50; */ /* Remove solid background */
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
    background: rgba(52, 73, 94, 0.8); /* Change #34495e to rgba with 80% opacity */
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2); /* Swap color from track */
    &:hover {
      background: rgba(0, 0, 0, 0.4); /* Make hover slightly darker/less transparent */
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
  background-color: transparent;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative;
  overflow: hidden;

  &::before { // Blurred background
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/shelf-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    z-index: 0;
    transition: filter 0.2s ease-in-out; /* Add transition for blur */
  }

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
    z-index: 2;
  }

  /* Add hover effects targeting background and image */
  &:hover {
    ${props => !props.disabled && `
      &::before {
        filter: blur(4px); /* Increase background blur on hover */
      }
    `}
  }
`;

const BottleImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease-in-out; /* Add transition for scale */

  /* Add scale effect on parent hover */
  ${BottleContainer}:hover & {
    /* Apply scale only if the parent container is not disabled */
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
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
          onClick={() => !selectedBottle && onBottleSelect(bottle)}
        >
          <BottleImage 
            src={bottle.image} 
            alt={bottle.name} 
            disabled={selectedBottle !== null} 
          />
        </BottleContainer>
      ))}
    </ShelfContainer>
  );
};

export default BottleShelf; 