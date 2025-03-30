import React, { useState } from 'react';
import styled from 'styled-components';
import { getCdnUrl } from '../utils/getCdnUrl';
import Tooltip from './Tooltip';

const BASE_URL = import.meta.env.BASE_URL;

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

  @media (max-width: 768px) {
    border-radius: 0; /* Remove radius on mobile */
    /* Adjust background or styling if needed for mobile */
    justify-content: space-around; /* Evenly space items in row */
  }
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('${getCdnUrl('images/shelf-bg.png')}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 62, 80, 0.5);
  }
`;

const BottleContainer = styled.div`
  width: 310px;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  background-color: transparent;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative;
  overflow: hidden;

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
      ${BottleImage} {
        transform: scale(1.05);
      }
    `}
  }

  @media (max-width: 768px) {
    width: 150px; /* Smaller size for mobile */
    height: 150px;
    margin: 5px; /* Add some margin for spacing */
  }

  @media (max-width: 480px) {
     width: 120px; /* Even smaller size for very small screens */
     height: 120px;
  }
`;

const BottleImage = styled.img`
  /* max-width: 100%; */ /* Remove max-width */
  width: 67%; /* Set width to 67% of container */
  max-height: 100%; /* Keep max-height limit */
  object-fit: contain;
  image-rendering: pixelated;
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease-in-out;

  ${BottleContainer}:hover & {
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
  }

  @media (max-width: 768px) {
    /* Adjust hover scale if needed for smaller items */
    ${BottleContainer}:hover & {
       transform: ${props => props.disabled ? 'none' : 'scale(1.1)'}; 
    }
    /* Mobile width setting can override or adjust base width if needed */
    /* width: 75%; */ /* Example: Slightly wider on mobile */
  }
`;

const BottleShelf = ({ bottles, onBottleSelect, selectedBottle }) => {
  const [tooltip, setTooltip] = useState({ visible: false, text: '', position: { x: 0, y: 0 } });
  const [isTooltipHovered, setIsTooltipHovered] = useState(false); // Track if tooltip is hovered

  const handleMouseEnter = (e, name) => {
    const target = e.currentTarget; // Get the bottle container
    const rect = target.getBoundingClientRect(); // Get the bounding rectangle of the container

    // Calculate the center position
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setTooltip({
      visible: true,
      text: name,
      position: { x: centerX, y: centerY } // Set tooltip position to center of the image
    });
  };

  const handleMouseLeave = () => {
    if (!isTooltipHovered) {
      setTooltip({ ...tooltip, visible: false });
    }
  };

  const handleTooltipMouseEnter = () => {
    setIsTooltipHovered(true);
  };

  const handleTooltipMouseLeave = () => {
    setIsTooltipHovered(false);
    setTooltip({ ...tooltip, visible: false });
  };

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
          onMouseEnter={(e) => handleMouseEnter(e, bottle.name)}
          onMouseLeave={handleMouseLeave}
        >
          <BackgroundWrapper />
          <BottleImage 
            src={bottle.image} 
            alt={bottle.name} 
            disabled={selectedBottle !== null} 
          />
        </BottleContainer>
      ))}
      {tooltip.visible && (
        <Tooltip 
          text={tooltip.text} 
          position={tooltip.position} 
          onMouseEnter={handleTooltipMouseEnter} 
          onMouseLeave={handleTooltipMouseLeave} 
        />
      )}
    </ShelfContainer>
  );
};

export default BottleShelf; 