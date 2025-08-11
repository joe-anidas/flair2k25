import React from 'react';
import styled from 'styled-components';

const NavButton = ({ children, onClick, className = "" }) => {
  return (
    <StyledWrapper className={className}>
      <button className="button" onClick={onClick}>
        <span className="content">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* === removing default button style ===*/
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
  }

  /* button styling */
  .button {
    --border-right: 6px;
    --text-stroke-color: rgba(255, 0, 0, 0.7);
    --animation-color: #ff0000;
    --fs-size: 1rem;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: var(--animation-color);
    -webkit-text-stroke: 0;
  }

  .content,
  .blur-text span {
    transition: filter 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                text-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* hover glow applied to content (and BlurText letters) */
  .button:hover .content,
  .button:hover .blur-text span {
    filter: drop-shadow(0 0 8px var(--animation-color));
    text-shadow: 0 0 3px var(--animation-color), 0 0 6px var(--animation-color), 0 0 9px var(--animation-color);
  }
`;

export default NavButton;
