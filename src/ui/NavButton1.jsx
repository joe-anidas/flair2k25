import React from 'react';
import styled from 'styled-components';

const NavButton = ({ children, onClick, className = "" }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} className={className}>
        <span>{children}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* From uiverse.io by @Ali-Tahmazi99 */
  button {
   display: inline-block;
   width: 120px;
   height: 40px;
   border-radius: 10px;
   border: 1px solid #ff0000;
   position: relative;
   overflow: hidden;
   transition: all 0.5s ease-in;
   z-index: 1;
   background: transparent;
  }

  button::before,
  button::after {
   content: '';
   position: absolute;
   top: 0;
   width: 0;
   height: 100%;
   transform: skew(15deg);
   transition: all 0.5s;
   overflow: hidden;
   z-index: -1;
  }

  button::before {
   left: -10px;
   background: #ff0000;
  }

  button::after {
   right: -10px;
   background: #cc0000;
  }

  button:hover::before,
  button:hover::after {
   width: 58%;
  }

  button:hover span {
   color: #ffffff;
   transition: 0.3s;
  }

  button span {
   color: #ff0000;
   font-size: 16px;
   font-family: 'Benguiat', serif;
   font-weight: bold;
   transition: all 0.3s ease-in;
  }
`;

export default NavButton;