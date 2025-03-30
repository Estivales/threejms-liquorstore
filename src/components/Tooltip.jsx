import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  z-index: 10;
  white-space: nowrap;
  font-family: 'VT323', monospace;
`;

const Tooltip = ({ text, position, onMouseEnter, onMouseLeave }) => {
  return (
    <TooltipContainer 
      style={{ top: position.y, left: position.x }} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      {text}
    </TooltipContainer>
  );
};

export default Tooltip; 